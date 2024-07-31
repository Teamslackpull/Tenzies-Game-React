import {useEffect, useState} from "react";
import { nanoid } from "nanoid";
import {PlaySettings} from "./PlaySettings.tsx";
import Confetti from "react-confetti";

export const Dice = () => {
    // const DiceArr = [1, 2, 3, 4, 5, 6, 5, 2, 1, 2];
    const [DiceArr, setDiceArr] = useState ([1,2,3,4,5,6,1,2,3,4]);

    // mapping trough every dice so we can make dices
    const AllNewDice = () => DiceArr.map( () => GenerateDice () );
    // State
    const [NewDice, setNewDice] = useState ( AllNewDice () );
    const [Tenzies, setTenzies] = useState (false );
    const [ShowPlayboard, setShowPlayboard] = useState(false);
    const [ShowPlaysettings, setShowPlaysettings] = useState(true);


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
        setTenzies(false)
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
    // @ts-ignore
    function ChooseDifficulty (option) {

        if (option === "Normal") {
            console.log("Normal Mode")
        }
        if (option === "Hard") {
          setDiceArr(prevArray => [...prevArray,1,2,3,4,5])
        }

        if (option === "Extreme") {
            setDiceArr(prevArray => [...prevArray,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2])
            console.log("Generate 5 rows of dice ")
        }

    }

    useEffect(() => {
        setNewDice(AllNewDice())
    }, [DiceArr]);

    function TogglePlayBoard () {
        setShowPlaysettings(false)
        setShowPlayboard(true);
    }

    return (
        <section>
            {ShowPlaysettings && <PlaySettings
                HandleClick={ ChooseDifficulty }
                ShowPlay={TogglePlayBoard}
            /> }


            <div className={ShowPlayboard ? " ShowPlayBoard mainContainer" : "Hide" }>
                {Tenzies && <Confetti/>}
                <h1 className="GameTitle">Tenzies</h1>
                <h2 className="GameDesc">Roll until all dice are the same. Click each die to freeze it at its current
                    value between rolls</h2>
                <div className="DisplayGrid">
                    {NewDice.map(dice => (
                        <div className={dice.IsClicked ? "Dice Clicked" : "Dice"}
                             onClick={() => HoldDice(dice.id)}
                             key={dice.id}>
                            {dice.value}
                        </div>
                    ))}

                </div>
                <button className="Button" onClick={Tenzies ? PlayNewGame : RolledDice}>{Tenzies ? "New Game" : "Roll"} </button>
            </div>


        </section>

    );
};