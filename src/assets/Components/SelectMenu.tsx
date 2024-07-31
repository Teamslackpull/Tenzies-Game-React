import {useState} from "react";
// @ts-ignore
export const SelectMenu = (props) => {
    const Options = ["Normal", "Hard", "Extreme"]
        const [ShowOptions, setShowOptions] = useState(false)

    function ToggleOptions() {
        setShowOptions(Prev => !Prev)
    }

    return (
        <div className="SelectMenu">
            <div className="SelectBtn">
                <button onClick={ToggleOptions} className="SelectBtn-Text"> Select Difficulty </button>
                <i className="fa-solid fa-caret-down"></i>
            </div>
            <ul className= "Difficulty-Options ">
                {Options.map((option, index) => (
                    <li className={ShowOptions ? "show ListItems" : "hide"} onClick={() => props.HandleClick(option)} key={index}>{option}</li>
                ))}

            </ul>
        </div>
    )

}