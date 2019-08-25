import React from 'react'

function ListItem(props) {
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
          .split(' ')
          .slice(0, 2)
          .join(' ')}
      </div>
      <div className="w4"> {price}</div>
      <div className="w4">{marketCap}</div>
      <div
        style={{
          color: changePercentage24Hr < 0 ? 'red' : 'limegreen'
        }}
      >
        {changePercentage24Hr > 0
          ? `+ ${changePercentage24Hr} % `
          : `- ${changePercentage24Hr.slice(1)} %`}
      </div>
    </li>
  )
}

export default ListItem
