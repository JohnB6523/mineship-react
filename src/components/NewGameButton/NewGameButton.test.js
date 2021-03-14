import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { NewGameButton } from "./NewGameButton"

describe("<NewGameButton /> tests", () => {
    it("should render as default button with text New Game", () => {
        const { container } = render(<NewGameButton />)
        expect(container.firstChild).toMatchSnapshot()
        expect(screen.getByRole("button", {name: /new game/i})).toBeInTheDocument()
    })

	it("should call the click callback handler", () => {
		// Arrange
		const onClick = jest.fn()
		const { container } = render(<NewGameButton onClick={onClick} />)
		// Act
		fireEvent.click(container.firstChild)
		// Assert
		expect(onClick).toHaveBeenCalledTimes(1)
	})
})