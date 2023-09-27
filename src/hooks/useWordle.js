import { useState } from "react"

const useWordle = (solution) => {
    const [isCorrect, setIsCorrect] = useState(false)
    const [turn, setTurn] = useState(0)

    const [currentGuess, setCurrentGuess] = useState('')

    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess in a string

    
    const [usedLetters, setUsedLetters] = useState({}) // { 'a':'green', 'b':'yello' }

    // 1. format a guess into an array of letter objects
    const formatGuess = () => {
        let solutionArray = [...solution]
        let fomattedGuess = [...currentGuess].map((l) => {
            return {
                key: l,
                color: 'grey'
            }
        })

        // paint them green
        fomattedGuess.forEach( (element, index) => {
            if (element.key === solutionArray[index]) {
                element.color = 'green'
                solutionArray[index] = ''
            }
        })

        // paint them yellow
        fomattedGuess.forEach( (element, index) => {
            if (element.color !== 'green' && solutionArray.includes(element.key)) {
                element.color = 'yellow'
                solutionArray[solutionArray.indexOf(element.key)] = ''
            }
        })

        return fomattedGuess
    }

    // 1. add a new guess to the guesses state
    // 2. update isCorrect if correct
    // 3. add one to the turn state
    const addNewGuess = (formattedWord) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses( (prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedWord
            return newGuesses
        })

        setHistory( (prevHistory) => {
            return ([...prevHistory, currentGuess])
        })

        setTurn( prev => prev + 1)

        setUsedLetters( (prevUsedLetters) => {
            let newLetters = { ...prevUsedLetters }

            formattedWord.forEach((l) => {
                const currentColor = newLetters[l.key]

                if (l.color === 'green') {
                    newLetters[l.key] = 'green'
                    return
                }

                if (l.color === 'yellow' && currentColor !== 'green') {
                    newLetters[l.key] = 'yellow'
                    return
                }

                if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newLetters[l.key] = 'grey'
                    return
                }
            })

            return newLetters
        })


        setCurrentGuess('')
    }

    // 1. handle key up and track current guess
    // 2. if user enters, then add as new guess
    const handleKeyup = ({ key }) => {
        // handle for 'Enter'
        if (key === 'Enter') {
            // if turns is greater than 5
            if (turn > 5) {
                console.log("You have used up all your turns")
                return
            }

            // if duplicate guess
            if (history.includes(currentGuess)) {
                console.log("You have already tried that word")
                return
            }
            
            // if guess is not 5 chars long
            if(currentGuess.length !== 5){
                console.log("Your guess is not 5 chars long")
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        // handle for 'Backspace'
        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0,-1))
            return
        }

        // regex check for single character
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }
    }

    return({ isCorrect, turn, guesses, currentGuess, usedLetters, handleKeyup})
}

export default useWordle