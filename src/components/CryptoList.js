import React from 'react'
import ListHeader from './ListHeader'
import ListItem from './ListItem'

function CryptoList(props) {
  const { fetching, cryptos } = props
  return (
    <div>
      <ListHeader />
      <ul className="pa0">
        {fetching
          ? 'LOADING...'
          : cryptos.map((crypto, index) => {
              const { CoinInfo, DISPLAY } = crypto
              const { FullName, ImageUrl, Id } = CoinInfo
              const { CHANGEPCT24HOUR } = DISPLAY.USD
              const { PRICE, MKTCAP } = DISPLAY.USD

              return (
                <ListItem
                  key={Id}
                  id={Id}
                  index={index}
                  image={ImageUrl}
                  coinName={FullName}
                  price={PRICE}
                  marketCap={MKTCAP}
                  changePercentage24Hr={CHANGEPCT24HOUR}
                />
              )
            })}
      </ul>
    </div>
  )
}

export default CryptoList
