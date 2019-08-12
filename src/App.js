import React, { Component } from 'react'
import './css/main.css'

class App extends Component {
  state = {
    cryptos: [],
    fetching: false
  }

  componentDidMount = () => {
    this.fetchCryptoData()
  }

  fetchCryptoData = () => {
    this.setState({ fetching: true })
    fetch(
      'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD&api_key=747cefbc3f84c375160d61fe2afea4b5a88897eee4c4650c5391e48a435fd4cd'
    )
      .then(res => res.json())
      .then(result => {
        // save it to component state
        this.setState({ cryptos: result.Data, fetching: false })
      })
  }
  render() {
    console.log(this.state.cryptos)
    return (
      <main className="flex flex-column justify-center items-center">
        <h1>Cryptocurrencies</h1>
        <h3>View prices and data for the top 100 traded Cryptocurrencies</h3>
        <div>
          <div className="sticky-header flex justify-left items-center black">
            <div className="sticky-header-1"> Cryptocurrencies </div>
            <div className="sticky-header-2"> Price </div>
            <div className="sticky-header-3"> Market Cap </div>
            <div className="sticky-header-4"> 24H Change </div>
          </div>
        </div>
      </main>
    )
  }
}
export default App
