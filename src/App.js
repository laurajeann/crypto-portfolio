import React, { Component } from 'react'

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
    return null
  }
}
export default App
