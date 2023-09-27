import React, { useState } from 'react'

const chars = [
    { key: 'a'},
    { key: 'b'},
    { key: 'c'},
    { key: 'd'},
    { key: 'e'},
    { key: 'f'},
    { key: 'g'},
    { key: 'h'},
    { key: 'i'},
    { key: 'j'},
    { key: 'k'},
    { key: 'l'},
    { key: 'm'},
    { key: 'n'},
    { key: 'o'},
    { key: 'p'},
    { key: 'q'},
    { key: 'r'},
    { key: 's'},
    { key: 't'},
    { key: 'u'},
    { key: 'v'},
    { key: 'w'},
    { key: 'x'},
    { key: 'y'},
    { key: 'z'}
]

export default function Keypad({ usedLetters }) {
    const [letters, setLetters] = useState(chars)

    return (
        <div className='keypad'>
            {letters && letters.map((v) => {
                const color = usedLetters[v.key]

                return(
                    <div key={v.key} className={color}> {v.key} </div>
                )
            })}
        </div>
    )
}
