import * as React from "react"
import { Board } from "../Board"

class Game extends React.Component {
	handleClick(x, y) {
		alert(x + ", " + y)
	}

	render() {
		return (
			<Board onClick={(x, y) => this.handleClick(x, y)}/>
		);
	}
}

export { Game }