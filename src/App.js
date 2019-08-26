import React, { Component } from 'react'
import './css/main.css'
import CryptoList from './components/CryptoList'
import AppHeader from './components/AppHeader'
import Modal from './components/Modal'

class App extends Component {
  state = {
    cryptoData: [],
    cryptoLogos: [],
    fetchingData: false,
    fetchingLogos: false,
    cryptoModal: null
  }

  componentDidMount = () => {
    this.fetchCryptoSymbols()
  }

  fetchCryptoSymbols = () => {
    this.setState({ fetchingData: true })
    fetch('https://api.coinmarketcap.com/v1/ticker/')
      .then(res => res.json())
      .then(result => {
        // save it to component state
        this.setState({ cryptoData: result, fetchingData: false })
        this.fetchImageData(result.map(crypto => crypto.symbol))
      })
  }

  fetchImageData = tickers => {
    this.setState({ fetchingLogos: true })
    fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tickers.join(
        ','
      )}&tsyms=USD&api_key=747cefbc3f84c375160d61fe2afea4b5a88897eee4c4650c5391e48a435fd4cd`
    )
      .then(res => res.json())
      .then(result => {
        const cryptoLogos = Object.entries(result.DISPLAY).map(
          ([ticker, crypto]) => {
            return {
              imageUrl: crypto.USD.IMAGEURL,
              symbol: ticker
            }
          }
        )
        // save it to component state
        this.setState({ cryptoLogos: cryptoLogos, fetchingLogos: false })
      })
  }

  render() {
    return (
      <div>
        <AppHeader>
          <CryptoList
            fetching={this.state.fetchingData || this.state.fetchingLogo}
            cryptos={this.state.cryptoData}
            logos={this.state.cryptoLogos}
            showModal={data => this.setState({ cryptoModal: data })}
          />
        </AppHeader>
        {this.state.cryptoModal && (
          <Modal
            closeModal={() => this.setState({ cryptoModal: null })}
            data={this.state.cryptoModal}
          />
        )}
      </div>
    )
  }
}
export default App
