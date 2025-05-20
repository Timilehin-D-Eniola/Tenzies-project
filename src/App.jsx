import { useState } from "react";
import Die from "../components/Die.jsx";
import { nanoid } from "nanoid";

export default function App() {
  const [dieRoll, setDieRoll] = useState(generateAllNewDice());

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

  const allDice = dieRoll.map((num) => (
    <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      hold={() => hold(num.id)}
      id={num.id}
    />
  ));

  function handleClick() {
    setDieRoll(generateAllNewDice);
  }

  return (
    <main>
      <div className="buttons">{allDice}</div>
      <div className="rollDiceDiv">
        <button onClick={handleClick} className="rollDiceBtn">
          Roll
        </button>
      </div>
    </main>
  );
}
