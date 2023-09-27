import React from 'react'

export default function Row({ guess, currentGuess }) {

  if (guess){
    return(
      <div className='row past'>
        {guess.map((e, i) => {
          return(
            <div key={i} className={e.color}>{e.key}</div>
          )
        })}
      </div>
    )
  }

  if (currentGuess) {
    let letters = currentGuess.split("")

    return(
      <div className='row current'>
        {letters.map((e, i) => (
            <div key={i} className="filled">{e}</div>
        ))}
        { [...Array(5-currentGuess.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    )
  }

  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
