import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Tile } from "./Tile"
import tile_unrevealed from "../../images/tile_unrevealed.png"

describe("<Tile /> tests", () => {
	it("should render as button with image passed to it", () => {
		const { container } = render(<Tile image="tile_unrevealed"/>)
		expect(container.firstChild).toMatchSnapshot()
		expect(container.firstChild).toHaveClass("tile")
		expect(container.firstChild.firstChild).toHaveAttribute("src", tile_unrevealed)
	})

	it("should call the click callback handler", () => {
		// Arrange
		const onClick = jest.fn()
		const { container } = render(<Tile onClick={onClick} />)
		// Act
		fireEvent.click(container.firstChild)
		// Assert
		expect(onClick).toHaveBeenCalledTimes(1)
	})
})