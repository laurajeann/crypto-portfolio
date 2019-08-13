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
            <div className="sticky-header-1"> Cryptocurrency </div>
            <div className="sticky-header-2"> Price </div>
            <div className="sticky-header-3"> Market Cap </div>
            <div className="sticky-header-4"> 24H Change </div>
          </div>
          <ul className="pa0">
            {this.state.fetching
              ? 'LOADING...'
              : this.state.cryptos.map((crypto, index) => {
                  const { CoinInfo, DISPLAY } = crypto
                  const { FullName, ImageUrl, Id } = CoinInfo
                  const { CHANGEPCT24HOUR } = DISPLAY.USD
                  const { PRICE, MKTCAP } = DISPLAY.USD

                  return (
                    <li
                      className="flex items-center justify-left mv2 pv3 pointer data-row br2"
                      key={Id}
                    >
                      <div
                        style={{
                          paddingLeft: index + 1 < 10 ? '0.65rem' : '0'
                        }}
                        className="w2"
                      >
                        {index + 1}
                      </div>
                      <div className="w2 flex justify-center items-center mh3">
                        <div className="coin-logo flex items-center justify-center">
                          <img
                            alt="coin logo"
                            src={`https://cryptocompare.com${ImageUrl}`}
                          />
                        </div>
                      </div>
                      <div className="w5 f3">
                        {FullName.split(' ')
                          .slice(0, 2)
                          .join(' ')}
                      </div>
                      <div className="w4"> {PRICE}</div>
                      <div className="w4">{MKTCAP}</div>
                      <div
                        style={{
                          color: CHANGEPCT24HOUR < 0 ? 'red' : 'limegreen'
                        }}
                      >
                        {CHANGEPCT24HOUR > 0
                          ? `+ ${CHANGEPCT24HOUR}`
                          : `- ${CHANGEPCT24HOUR.slice(1)}`}
                      </div>
                    </li>
                  )
                })}
          </ul>
        </div>
      </main>
    )
  }
}
export default App
