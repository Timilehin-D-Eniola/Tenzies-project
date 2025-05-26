import { useState, useEffect } from "react";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Die from "../components/Die.jsx";
import { nanoid } from "nanoid";

export default function App() {
  const rollSound = new Audio ("/dice-roll.mp3")
  const winSound  = new Audio ("/you-win.mp3")
   const { width, height } = useWindowSize();
  const [dieRoll, setDieRoll] = useState(() => generateAllNewDice());

const gameWon = 
dieRoll.every(die => die.isHeld) && 
      dieRoll.every(die => die.value === dieRoll[0].value)

       useEffect(() => {
    if (gameWon) {
      winSound.play();
    }
  }, [gameWon]);


  function generateAllNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }

    return newDice;
  }

  

  function rollDice() {
    if (!gameWon) {
      rollSound.play();
        setDieRoll((prevRoll) =>
      prevRoll.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
    } else {
      setDieRoll(generateAllNewDice())
    }
    
  }

  function hold(id) {
    setDieRoll((prevDie) =>
      prevDie.map((Rolled) => {
        if (id === Rolled.id) {
          return {
            ...Rolled,
            isHeld: !Rolled.isHeld,
          };
        } else {
          return Rolled;
        }
      })
    );
  }

  const allDice = dieRoll.map((num) => (
    <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      hold={() => hold(num.id)}
      id={num.id}
    />
  ));

  return (
    <main>
    { gameWon && <Confetti
      width={width}
      height={height}
    />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        {gameWon ? "You Won!" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
        }</p>
      <div className="buttons">{allDice}</div>
      <div className="rollDiceDiv">
        <button onClick={rollDice} className="rollDiceBtn">
          {gameWon ? "New Game" : "Roll" }
        </button>
      </div>
    </main>
  );
}
