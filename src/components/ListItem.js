import React from 'react'

function ListItem(props) {
  //object destructuring from props
  const {
    id,
    index,
    image,
    coinName,
    price,
    marketCap,
    changePercentage24Hr,
    showModal,
    symbol
  } = props
  return (
    <li
      className="flex items-center justify-left mv2 pv3 pointer data-row br2"
      key={id}
      // when list item is clicked, call showModal function with data
      onClick={() =>
        showModal({
          id: id,
          image: image,
          coinName: coinName,
          price: price,
          marketCap: marketCap,
          changePercentage24Hr: changePercentage24Hr,
          symbol: symbol
        })
      }
    >
      <div
        // adding additional padding to numbers below 10 so that they line up correctly
        style={{
          paddingLeft: index + 1 < 10 ? '0.65rem' : '0'
        }}
        className="w2"
      >
        {index + 1}
      </div>
      <div className="w2 flex justify-center items-center mh3">
        <div className="coin-logo flex items-center justify-center">
          <img alt="coin logo" src={`https://cryptocompare.com${image}`} />
        </div>
      </div>
      <div className="w5 f4">
        {coinName
          // split string into array of words
          .split(' ')
          // slice array to contain only two words
          .slice(0, 2)
          // join words back together as a string with a space between each word
          .join(' ')}
      </div>
      <div className="w4"> {price}</div>
      <div className="w4">{marketCap}</div>
      <div
        // ternary operator to display different colour for percentage amount
        style={{
          color: changePercentage24Hr < 0 ? 'red' : 'limegreen'
        }}
        // ternary operator to add + or - sign and percentage sign to end of 24h change
      >
        {changePercentage24Hr > 0
          ? `+ ${changePercentage24Hr} % `
          : `- ${changePercentage24Hr.slice(1)} %`}
      </div>
    </li>
  )
}

export default ListItem
