import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import closeIcon from '../assets/icons/error.svg'
import ModalChart from './ModalChart'

import '../css/modal.css'

class Modal extends Component {
  // initialise state
  state = {
    fetching: false,
    history: [],
    modalWidth: null
  }

  modalRef = React.createRef()

  componentDidMount = () => {
    // after component is rendered, this call is invoked to fetch API data
    // access props to display crypto symbol and last 30 days of data
    this.fetchModalData(this.props.data.symbol, 30)
    this.setModalWidth()

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    debounce(this.setModalWidth, 200)()
  }

  setModalWidth = () => {
    this.setState({
      modalWidth:
        this.modalRef.current &&
        this.modalRef.current.getBoundingClientRect().width
    })
  }

  fetchModalData = symbol => {
    // set fetching flag to true
    this.setState({ fetching: true })
    fetch(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=30&aggregate=1&e=CCCAGG`
    )
      // converting to javascript
      .then(res => res.json())
      // getting data in usable format
      .then(result => {
        console.log(result)

        // formatting the data to work with modal chart
        const formattedHistory = result.Data.map((data, index, arr) => ({
          day:
            arr.length - (index + 1) === 0 ? 'today' : arr.length - (index + 1),
          price: data.close
        }))

        this.setState({
          history: formattedHistory
        })
      })
  }

  render() {
    return (
      <div className="modal">
        <div ref={this.modalRef} className="inner-display">
          <h2 className="modal-coin-name">{this.props.data.coinName}</h2>
          <div className="coin-image flex items-center justify-center pb1">
            <img
              alt="coin logo"
              src={`https://cryptocompare.com${this.props.data.image}`}
            />
          </div>
          {this.state.modalWidth && (
            <ModalChart
              // The modal chart does not take percentage values so set using window.innerWidth
              width={this.state.modalWidth * 0.9}
              height={400}
              data={this.state.history}
            />
          )}

          <div onClick={this.props.closeModal} className="close-button">
            <img src={closeIcon} alt="close icon" />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
