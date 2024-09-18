import Dice from "./assets/components/Dice"
import { useState } from "react"
import { nanoid } from "nanoid"

function App(){

  const [dice, setDice] = useState(allNewDice())
    
    function allNewDice() {
        const newDice = []  //array to hold numbers
        for (let i = 0; i < 10; i++) { //loop 10 times 
            newDice.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }) //Generate and add random numbers between 1 and 6
        }
        return newDice
    }
    
    const diceElements = dice.map(diceElement => <Dice id={diceElement.id} value={diceElement.value} isHeld={diceElement.isHeld} />)

    function rollDice(){
      setDice(allNewDice())
    }

  return(<>
    <main>
      <div className="dice-container">
          {diceElements}
     </div> 
     <button onClick={rollDice} className="button">ROLL</button>
    </main>
  </>)
}

export default App