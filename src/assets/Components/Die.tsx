import {useEffect, useState} from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export const Dice = () => {
    const DiceArr = [1, 2, 3, 4, 5, 6, 5, 2, 1, 3];
    // mapping trough every dice so we can make dices
    const AllNewDice = () => DiceArr.map( () => GenerateDice () );
    // State
    const [NewDice, setNewDice] = useState ( AllNewDice () );
    const [Tenzies, setTenzies] = useState (false );

    // Deciding when the user has won
    useEffect (() => {
    // Check of elke dice is clicked
        const AllClicked = NewDice.every(dice => dice.IsClicked)
    //     Check de values
        const Value = NewDice[0].value
        const Allvalues = NewDice.every(dice => dice.value === Value)

       if ( AllClicked && Allvalues ) {
           setTenzies(true)
       }

    },[NewDice])

function PlayNewGame() {
        setNewDice (AllNewDice())
}

    function GenerateDice() {
        return {
            value: Math.floor(Math.random() * 6 + 1),
            IsClicked: false,
            id: nanoid()
        };
    }

    // @ts-ignore
    function HoldDice(DiceID) {
        setNewDice(prevDice =>
            prevDice.map(dice => {
                return dice.id === DiceID ? { ...dice, IsClicked: !dice.IsClicked } : dice;
            })
        );
    }

    function RolledDice() {
        setNewDice(prev =>
            prev.map(dice => {
                return !dice.IsClicked ? GenerateDice() : dice;
            })
        );
    }

    return (
        <section className="mainContainer">

            {Tenzies && <Confetti/> }
            <h1 className="GameTitle">Tenzies</h1>
            <h2 className="GameDesc">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</h2>
            <div className="DisplayGrid">
                {NewDice.map(dice => (
                    <div className={dice.IsClicked ? "Dice Clicked" : "Dice"}
                         onClick={() => HoldDice(dice.id)}
                         key={dice.id}>
                        {dice.value}
                    </div>
                ))}

            </div>
            <button onClick={ Tenzies? PlayNewGame : RolledDice }>{Tenzies ? "New Game" : "Roll"  } </button>
        </section>
    );
};