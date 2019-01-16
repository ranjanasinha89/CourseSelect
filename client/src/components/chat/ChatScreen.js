import React, { Component } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import TypingIndicator from "./TypingIndicator";
import WhosOnlineList from "./WhosOnlineList";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }
  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:19a57672-026f-4e1c-8f66-e46338bc283c",
      userId: this.props.currentUsername,
      tokenProvider: new TokenProvider({
        url: "/authenticate"
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: "19377257",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error("error", error));
  }
  render() {
    const styles = {
      container: {
        height: "85vh",
        display: "flex",
        flexDirection: "column"
      },
      chatContainer: {
        display: "flex",
        flex: 1,
        backgroundColor: "#f4ecf6",
        marginTop: "-25px",
        border: "2px solid",
        padding: "10px"
      },
      whosOnlineListContainer: {
        width: "300px",
        flex: "none",
        padding: 20,
        backgroundColor: "#c2e0ee",
        color: "black",
        border: "2px solid",
        padding: "10px",
        boxshadow: "5px 10px #888888"
      },
      chatListContainer: {
        padding: 20,
        width: "75%",
        display: "flex",
        flexDirection: "column"
      }
    };
    return (
      <div style={styles.container}>
        <header style={styles.header} />
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <h2>Online Users</h2>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />

            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    );
  }
}
