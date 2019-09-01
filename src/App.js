import React, { Component } from 'react'
import './css/main.css'
import CryptoList from './components/CryptoList'
import AppHeader from './components/AppHeader'
import Modal from './components/Modal'

class App extends Component {
  // initial state for component
  state = {
    cryptoData: [],
    cryptoLogos: [],
    fetchingData: false,
    fetchingLogos: false,
    cryptoModal: null
  }

  componentDidMount = () => {
    // after component is rendered, this call is invoked to fetch API data
    this.fetchCryptoSymbols()
  }

  // fetching cryptocurrency data from API
  fetchCryptoSymbols = () => {
    // set fetching data state to true for loading spinners
    this.setState({ fetchingData: true })

    fetch('https://api.coinmarketcap.com/v1/ticker/')
      // coverting data into javascript
      .then(res => res.json())
      // getting data in usable format
      .then(result => {
        // save it to component state to display data
        this.setState({ cryptoData: result, fetchingData: false })

        // grab symbols from result data
        const cryptoSymbols = result.map(crypto => crypto.symbol)

        // fetch image data for all symbols
        this.fetchImageData(cryptoSymbols)
      })
  }
  // fetching cryptocurrency image data from API
  fetchImageData = tickers => {
    this.setState({ fetchingLogos: true })
    fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tickers.join(
        ','
      )}&tsyms=USD&api_key=747cefbc3f84c375160d61fe2afea4b5a88897eee4c4650c5391e48a435fd4cd`
    )
      //coverting data into javascript
      .then(res => res.json())
      // getting data in usable format
      .then(result => {
        // result.DISPLAY is an object instead of array
        // use object.entries to get an array that can be mapped over
        const keyValuesPairs = Object.entries(result.DISPLAY)
        // map over the array to transform the variable names to the object shape we want
        const cryptoLogos = keyValuesPairs.map(pairArr => {
          const [ticker, crypto] = pairArr

          return {
            imageUrl: crypto.USD.IMAGEURL,
            symbol: ticker
          }
        })
        // update component state with new data
        this.setState({ cryptoLogos: cryptoLogos, fetchingLogos: false })
      })
  }

  render() {
    return (
      <div>
        <AppHeader>
          <CryptoList
            // passing in prop to tell component if data is still loading
            fetching={this.state.fetchingData || this.state.fetchingLogos}
            // passing in data to render
            cryptos={this.state.cryptoData}
            // passing in logos to render
            logos={this.state.cryptoLogos}
            // pass in function to change modal render state
            showModal={data => this.setState({ cryptoModal: data })}
          />
        </AppHeader>

        {this.state.cryptoModal && (
          // only render modal if we have data to render
          <Modal
            // call back to setstate to null so modal will no longer render
            closeModal={() => this.setState({ cryptoModal: null })}
            data={this.state.cryptoModal}
          />
        )}
      </div>
    )
  }
}
export default App
