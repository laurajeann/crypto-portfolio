import React, { Component } from 'react'
import closeIcon from '../assets/icons/error.svg'
import ModalChart from './ModalChart'

import '../css/modal.css'

class Modal extends Component {
  state = {
    fetching: false,
    history: []
  }

  componentDidMount = () => {
    this.fetchModalData(this.props.data.symbol, 10)
  }

  fetchModalData = (symbol, numberOfDays) => {
    console.log({ symbol, numberOfDays })
    console.log(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=${numberOfDays}&api_key=747cefbc3f84c375160d61fe2afea4b5a88897eee4c4650c5391e48a435fd4cd&limit=90&aggregate=1&e=CCCAGG`
    )
    this.setState({ fetching: true })
    fetch(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=${numberOfDays}&api_key=747cefbc3f84c375160d61fe2afea4b5a88897eee4c4650c5391e48a435fd4cd&aggregate=1&e=CCCAGG`
    )
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({
          history: result.Data.map(data => ({
            date: data.time,
            price: (data.high + data.low) / 2
          }))
        })
        // save it to component state
      })
  }

  render() {
    return (
      <div className="modal">
        <div className="inner-display">
          <ModalChart data={this.state.history} />
          <div onClick={this.props.closeModal} className="close-button">
            <img src={closeIcon} alt="close icon" />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
