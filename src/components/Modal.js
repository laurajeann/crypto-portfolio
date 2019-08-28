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
    this.fetchModalData(this.props.data.symbol, 30)
  }

  fetchModalData = symbol => {
    this.setState({ fetching: true })
    fetch(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=30&aggregate=1&e=CCCAGG`
    )
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({
          history: result.Data.map((data, index, arr) => ({
            day:
              arr.length - (index + 1) === 0
                ? 'today'
                : arr.length - (index + 1),
            price: data.close
          }))
        })
      })
  }

  render() {
    return (
      <div className="modal">
        <div className="inner-display">
          <div className="coin-image ">
            <img
              alt="coin logo"
              src={`https://cryptocompare.com${this.props.data.image}`}
            />
            <h3>{this.props.data.coinName}</h3>
          </div>

          <ModalChart
            width={window.innerWidth * 0.7}
            height={400}
            data={this.state.history}
          />
          <div onClick={this.props.closeModal} className="close-button">
            <img src={closeIcon} alt="close icon" />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
