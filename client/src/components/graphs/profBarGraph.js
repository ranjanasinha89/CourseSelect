import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";

class ProfBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["CSCI-A 545", "CSCI-B 200", "CSCI-Y 700", "CSCI-P 649"],
        datasets: [
          {
            data: [10, 6, 3, 14],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)"
            ]
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Number of Students per course",
              fontSize: 10
            }
          }}
        />
      </div>
    );
  }
}
export default ProfBarGraph;
