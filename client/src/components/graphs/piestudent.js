import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

class PieStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["A+", "A", "A-", "B+", "B", "B-", "C", "incomplete"],
        datasets: [
          {
            data: [2, 5, 2, 6, 3, 4, 2, 1],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(175, 206, 86, 0.6)",
              "rgba(200, 6, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(60, 102, 25, 0.6)",
              "rgba(5, 159, 64, 0.6)",
              "rgba(25, 99, 32, 0.6)"
            ]
          }
        ]
      }
    };
  }

  //   static defaultProps = {
  //     displayTitle:true,
  //     displayLegend: true,
  //     legendPosition:'right',
  //     location:'City'
  //   }
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Grades of students for a course",
              fontSize: 15
            }
          }}
        />
      </div>
    );
  }
}
export default PieStudent;
