import * as React from "react"
import { Board } from "../Board"
import tile_unrevealed from "../../images/tile_unrevealed.png"
import tile_0 from "../../images/tile_0.png"

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tileImages: Array.from({length: 8}, () => Array.from({length: 8}, () => tile_unrevealed))
		}
	}
	handleClick(x, y) {
		let tileImages = this.state.tileImages.slice()
		tileImages[y][x] = tile_0
		this.setState({tileImages: tileImages})
	}

	render() {
		return (
			<Board onClick={(x, y) => this.handleClick(x, y)} tileImages={this.state.tileImages} />
		);
	}
}

export { Game }