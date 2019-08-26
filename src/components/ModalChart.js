import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis } from 'recharts'

class ModalChart extends Component {
  render() {
    return (
      <AreaChart width={600} height={300} data={this.props.data}>
        <Area type="monotone" dataKey="price" stroke="#8884d8" />
        <XAxis dataKey="date" tickFormatter={time => new Date(time)} />
        <YAxis />
      </AreaChart>
    )
  }
}

export default ModalChart
