import React from 'react'

function ListHeader() {
  return (
    <div className="sticky-header flex justify-center items-center black">
      <div className="sticky-header-1"> Cryptocurrency </div>
      <div className="sticky-header-2"> Price </div>
      <div className="sticky-header-3"> Market Cap </div>
      <div className="sticky-header-4"> 24H Change </div>
    </div>
  )
}

export default ListHeader
