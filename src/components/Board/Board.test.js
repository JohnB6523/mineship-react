import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Board } from "./Board"

describe("<Board /> tests", () => {
	it("should render as 8x8 grid of tiles with background", () => {
		const { container } = render(<Board />)
		expect(container.firstChild).toMatchSnapshot()
	})
})