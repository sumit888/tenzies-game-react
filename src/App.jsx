import Dice from "./assets/components/Dice"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import ConfettiExplosion from "react-confetti-explosion"

function App(){

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
    
    useEffect(() => {
        const allHeld = dice.every(diceElement => diceElement.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(diceElement => diceElement.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

  function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []  //array to hold numbers
        for (let i = 0; i < 10; i++) { //loop 10 times 
            newDice.push(generateNewDie()) //Generate and add random numbers between 1 and 6
        }
        return newDice
    }
 function holdDice(id) {
        setDice(oldDice => oldDice.map(dice => {
            return dice.id === id ? 
                {...dice, isHeld: !dice.isHeld} :
                dice
        }))
    } 
    
    const diceElements = dice.map(diceElement => <Dice id={diceElement.id} value={diceElement.value} isHeld={diceElement.isHeld} holdDice={() => holdDice(diceElement.id)}  />)

  function rollDice() {
          if(!tenzies) {
              setDice(oldDice => oldDice.map(die => {
                  return die.isHeld ? 
                      die :
                      generateNewDie()
              }))
          } else {
              setTenzies(false)
              setDice(allNewDice())
          }
      }

  return(<>
    <main>
      {tenzies && <ConfettiExplosion />}
      <h1 className="title">{tenzies ? "🎉You've WON Tenzies🎉" : "Tenzies"}</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {diceElements}
     </div> 
     <button onClick={rollDice} className="button">{tenzies ? "NEW GAME" : "ROLL"}</button>
     
    </main>
  </>)
}

export default App