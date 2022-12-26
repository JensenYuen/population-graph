import React from "react";

interface props {
  prefecture: string
  getPref: (prefecture: string) => void
}

const CheckBox = ({ prefecture, getPref }: props) => {

  return(
    <div className='checkbox'>
      <input type="checkbox" id={prefecture} name={prefecture}
        onClick={() => getPref(prefecture)}
      />
      <label htmlFor={prefecture}>{prefecture}</label>
    </div>
  )
}

export default CheckBox;
