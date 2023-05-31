import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	a {
        color: inherit;
        text-decoration: inherit;
    }

    * {
        font-family: 'Lexend Deca', sans-serif;
        box-sizing: border-box;
    }
`

export default GlobalStyle