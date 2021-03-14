import * as React from "react"
import { Board } from "../Board"

function initGame() {
	// Generate unrevealed tiles
	let tileImages = Array.from({length: 8}, () => Array.from({length: 8}, () => "Unrevealed"))
	// Generate 10 mines
	let mines = []
	for (let i = 0; i < 10; i++) {
		let spaceEmpty = true
		let minePos = []
		do {
			spaceEmpty = true
			minePos = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]
			for (let mine of mines) {
				if (mine[0] === minePos[0] && mine[1] === minePos[1]) {
					spaceEmpty = false
				}
			}
		} while (spaceEmpty === false)
		mines.push(minePos)
	}
	return {tileImages: tileImages, mines: mines}
}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = initGame()
	}

	handleClick(x, y) {
		let tileImages = this.state.tileImages.slice()
		// Check if mine
		let isMine = false
		for (let mine of this.state.mines) {
			if (mine[0] === x && mine[1] === y){
				isMine = true
				break
			}
		}
		tileImages[y][x] = isMine ? "Mine" : "0"
		this.setState({tileImages: tileImages, mines: this.state.mines})
	}

	render() {
		return (
			<Board onClick={(x, y) => this.handleClick(x, y)} tileImages={this.state.tileImages} />
		);
	}
}

export { Game }