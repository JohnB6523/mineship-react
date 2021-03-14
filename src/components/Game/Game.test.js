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
		let tile = container.firstChild.firstChild.firstChild
		fireEvent.click(tile)
		// Assert
		expect(tile).not.toHaveAttribute("src", tile_unrevealed)
	})

	it("should contain 10 mines", () => {
		// Arrange
		const { container } = render(<Game />)
		// Act
		container.firstChild.childNodes.forEach((tile) => fireEvent.click(tile))
		// Assert
		expect(screen.getAllByAltText("Mine").length).toBe(10)
	})
})