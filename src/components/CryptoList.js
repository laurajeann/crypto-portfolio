import React from 'react'
import ListHeader from './ListHeader'
import ListItem from './ListItem'
import { convertMarketCap } from '../utilities'

function CryptoList(props) {
  const { fetching, cryptos, logos, showModal } = props

  return (
    <div>
      <ListHeader />
      <ul className="pa0">
        {fetching
          ? 'LOADING...'
          : cryptos.map((crypto, index) => {
              const {
                name,
                id,
                symbol,
                percent_change_24h,
                price_usd,
                market_cap_usd
              } = crypto

              const logoItem = logos.find(logo => {
                if (logo.symbol === symbol) {
                  return true
                }
              })

              const logoUrl = logoItem && logoItem.imageUrl

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

              const formattedMarketCap = convertMarketCap(marketCapUsd)

              return (
                <ListItem
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
