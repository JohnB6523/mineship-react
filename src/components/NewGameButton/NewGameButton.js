import * as React from "react"

function NewGameButton(props) {
    return (
        <button onClick={props.onClick}>New Game</button>
    )
}

export { NewGameButton }