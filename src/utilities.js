export function convertMarketCap(marketCapString) {
  // format money string
  const arr = marketCapString.split(',')

  switch (arr.length) {
    case 3:
      const rest = Number(arr[1] + arr[2].split('.')[0]) / 1000000

      // converting string to number
      const restRounded = Number(rest.toFixed(2))

      // slicing first index of string
      const firstNum = Number(arr[0].slice(1))
      //template literal
      const total = `$${(firstNum + restRounded).toFixed(2)} million`

      return total
    case 4:
      const amount = Number(arr[1] + arr[2] + arr[3].split('.')[0]) / 1000000000

      const amountRounded = Number(amount.toFixed(2))

      const secondNum = Number(arr[0].slice(1))

      const theTotal = `$${(secondNum + amountRounded).toFixed(2)}  billion`

      return theTotal

    default:
      console.log('this is one I havent thought of', marketCapString)
  }
}
