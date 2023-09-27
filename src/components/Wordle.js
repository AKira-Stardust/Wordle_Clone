import { useEffect, useState } from "react"
import useWordle from "../hooks/useWordle"
import Footer from "./Footer"

// components
import Grid from "./Grid"
import Keypad from "./Keypad"
import Modal from "./Modal"

const Wordle = ({ solution }) => {
    const { currentGuess, turn, isCorrect, guesses, usedLetters, handleKeyup } = useWordle(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect( () => {
        window.addEventListener("keyup", handleKeyup)

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn>5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        return( () => window.removeEventListener("keyup", handleKeyup) )
    }, [handleKeyup, isCorrect, turn])

    // useEffect( () => {
    //     console.log( turn, isCorrect, guesses )
    // }, [turn, isCorrect, guesses])

    return(
        <>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedLetters={usedLetters} />
            {showModal && <Modal solution={solution} isCorrect={isCorrect} turn={turn} />}
            <Footer />
        </>
        
    )
}

export default Wordle