import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Label } from 'recharts'

import '../css/modal.css'
// recharts.org/en-US/api/LineChart - documentation for the chart component
class ModalChart extends Component {
  render() {
    return (
      <LineChart
        width={this.props.width}
        height={this.props.height}
        data={this.props.data}
        margin={{ top: 0, right: 25, bottom: 50, left: 25 }}
      >
        <Line type="monotone" dataKey="price" stroke="#8884d8" fill="#057DCD" />
        <XAxis dataKey="day" interval="preserveEnd">
          <Label value="Days" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis
          // callback function to format string displayed on y axis
          tickFormatter={val => '$' + val}
          label={{
            value: 'price',
            angle: -90,
            position: 'insideLeft',
            offset: -20
          }}
        />
        <Tooltip />
      </LineChart>
    )
  }
}

export default ModalChart
