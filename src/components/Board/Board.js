import * as React from "react"
import { Tile } from "../Tile"
import tile_unrevealed from "../../images/tile_unrevealed.png"

class Board extends React.Component {
	static defaultProps = {
		onClick: () => {},
		tileImages: Array.from({length: 8}, () => Array.from({length: 8}, () => tile_unrevealed))
	}
	render() {
		let tiles = []
		for (let y = 0; y < 8; y ++) {
			for (let x = 0; x < 8; x++) {
				tiles.push(<Tile key={y*8+x} onClick={() => this.props.onClick(x, y)} image={this.props.tileImages[y][x]} />)
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