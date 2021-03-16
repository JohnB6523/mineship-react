import * as React from "react"
import { Tile } from "../Tile"

class Board extends React.Component {
	static defaultProps = {
		onClick: () => {},
		tileImages: Array.from({length: 8}, () => Array.from({length: 8}, () => "Unrevealed"))
	}
	render() {
		let tiles = []
		for (let i = 0; i < 8; i ++) {
			for (let j = 0; j < 8; j++) {
				tiles.push(<Tile key={i*8+j} onClick={() => this.props.onClick(i, j)} image={this.props.tileImages[i][j]} />)
			}
		}
		return (
			<div className="board" role="grid">
				{ tiles }
			</div>
		);
	}
}

export { Board }