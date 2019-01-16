import React, { Component } from "react";
import UsernameForm from "./UsernameForm";
import ChatScreen from "./ChatScreen";
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: "WhatIsYourUserNameScreen",
      currentUsername: ""
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: "ChatScreen"
        });
      })
      .catch(error => console.error("error", error));
  }
  render() {
    if (this.state.currentScreen === "WhatIsYourUserNameScreen") {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />;
    } else if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUsername={this.state.currentUsername} />;
    }
  }
}

export default Chat;
