import React from 'react'

function AppHeader(props) {
  return (
    <main className="flex flex-column justify-center items-center">
      <h1>Cryptocurrencies</h1>
      <h3>View prices and data for the top 50 traded Cryptocurrencies</h3>
      {props.children}
    </main>
  )
}

export default AppHeader
