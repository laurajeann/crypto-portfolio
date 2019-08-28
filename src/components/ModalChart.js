import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, Label } from 'recharts'

import '../css/modal.css'

class ModalChart extends Component {
  render() {
    return (
      <AreaChart
        width={this.props.width}
        height={this.props.height}
        data={this.props.data}
        margin={{ top: 0, right: 0, bottom: 50, left: 25 }}
      >
        <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#0099ff" />
        <XAxis dataKey="day" interval="preserveEnd">
          <Label value="Days" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis
          tickFormatter={val => '$' + val}
          label={{
            value: 'price',
            angle: -90,
            position: 'insideLeft',
            offset: -20
          }}
        />
        <Tooltip />
      </AreaChart>
    )
  }
}

export default ModalChart
