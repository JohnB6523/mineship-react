import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Game } from "./Game"
import tile_unrevealed from "../../images/tile_unrevealed.png"

describe("<Game /> tests", () => {
	it("should render a board", () => {
		const { container } = render(<Game />)
		expect(container.firstChild).toMatchSnapshot()
	})

	it("should change image of tile when clicked", () => {
		// Arrange
		const { container } = render(<Game />)
		// Act
		let tile = screen.getByRole("grid").firstChild.firstChild
		fireEvent.click(tile)
		// Assert
		expect(tile).toHaveAttribute("src")
		expect(tile).not.toHaveAttribute("src", tile_unrevealed)
	})

	it("should contain 10 mines", () => {
		// Arrange
		const { container } = render(<Game />)
		// Act
		screen.getByRole("grid").childNodes.forEach((tile) => fireEvent.click(tile))
		// Assert
		expect(screen.getAllByAltText(/tile_mine/i).length).toBe(10)
	})

	it("should contain 9 ship pieces", () => {
		// Arrange
		const { container } = render(<Game />)
		// Act
		screen.getByRole("grid").childNodes.forEach((tile) => fireEvent.click(tile))
		// Assert
		expect(screen.getAllByAltText(/tile_ship.*/i).length).toBe(9)
	})

	it("should contain blue numbers", () => {
		// Arrange
		const { container } = render(<Game />)
		// Act
		screen.getByRole("grid").childNodes.forEach((tile) => fireEvent.click(tile))
		// Assert
		expect(screen.getAllByAltText(/tile_[1-8]b/i).length).toBeGreaterThan(0)
	})

	it("should reset after pressing New Game", () => {
		// Arrange
		const { container } = render(<Game />)
		// Act
		fireEvent.click(screen.getByRole("grid").firstChild)
		let numTilesBefore = screen.getAllByAltText(/tile_unrevealed/i).length
		fireEvent.click(screen.getByRole("button", {name: /new game/i}))
		let numTilesAfter = screen.getAllByAltText(/tile_unrevealed/i).length
		// Assert
		expect(numTilesAfter).not.toBe(numTilesBefore)
	})
})