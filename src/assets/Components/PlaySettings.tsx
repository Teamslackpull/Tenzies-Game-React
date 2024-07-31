
import {SelectMenu} from "./SelectMenu.tsx";
// @ts-ignore
export const PlaySettings = (props) => {


    return (
        <div className="PlaySettings mainContainer">
            <h1>Tenzie Settings </h1>
            <p className="SettingDesc">
                For now just click the difficulty you want i will add later that it stays selected
            </p>
            <h2>Choose your difficulty</h2>
             <SelectMenu HandleClick= {props.HandleClick}/>
            <button onClick={props.HandleClick && props.ShowPlay} className="Button PlayBtn">Play</button>
        </div>
    )

}