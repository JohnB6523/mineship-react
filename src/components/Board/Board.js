import * as React from "react"
import { Tile } from "../Tile"

class Board extends React.Component {
	render() {
		let tiles = []
		for (let i = 0; i < 8; i ++) {
			for (let j = 0; j < 8; j++) {
				tiles.push(<Tile key={i*8+j} onClick={() => this.props.onClick(j, i)}/>)
			}
		}
		return (
			<div className="board">
				{ tiles }
			</div>
		);
	}
}

export { Board }