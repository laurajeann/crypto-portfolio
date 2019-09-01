import React from 'react'

function AppHeader(props) {
  return (
    <main className="flex flex-column justify-center items-center">
      <h1>
        Coin Party
        <span style={{ paddingLeft: '.5rem' }} role="img" aria-label="party">
          🎉
        </span>
      </h1>
      <h3>View prices and data for the top 100 traded Cryptocurrencies</h3>
      {props.children}
    </main>
  )
}

export default AppHeader
