import React from 'react'
import ListHeader from './ListHeader'
import ListItem from './ListItem'
import { convertMarketCap } from '../utilities'

function CryptoList(props) {
  // destructuring values needed from props
  const { fetching, cryptos, logos, showModal } = props

  return (
    <div>
      <ListHeader />
      <ul className="pa0">
        {fetching
          ? 'LOADING...' // @TODO - Change to loading spinner
          : // if not still waiting on data, then display list otherwise show loading
            cryptos.map((crypto, index) => {
              //  mapping through cryptos, then destructure values needed
              const {
                name,
                id,
                symbol,
                percent_change_24h,
                price_usd,
                market_cap_usd
              } = crypto
              // using find method to match crypto logo with correct data
              const logoItem = logos.find(logo => {
                if (logo.symbol === symbol) {
                  return true
                }
              })

              // if there is a logoItem then assign the imageUrl property to logoUrl
              const logoUrl = logoItem && logoItem.imageUrl

              // converting string to number then coverting the number to a currency formatted string
              const formattedPrice = Number(price_usd).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })

              const marketCapUsd = Number(market_cap_usd).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD'
                }
              )
              // format MarketCap to millions or billions
              const formattedMarketCap = convertMarketCap(marketCapUsd)

              return (
                <ListItem
                  // pass in props to listItem component with better prop names
                  showModal={showModal}
                  key={id}
                  id={id}
                  index={index}
                  image={logoUrl}
                  coinName={name}
                  price={formattedPrice}
                  marketCap={formattedMarketCap}
                  changePercentage24Hr={percent_change_24h}
                  symbol={symbol}
                />
              )
            })}
      </ul>
    </div>
  )
}

export default CryptoList
