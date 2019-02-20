import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    letter-spacing: 0.5px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    background: #f2f2f2;
    color: #3e3e3e;
  }
  a {
    text-decoration: none;
    color: #3e3e3e;
  }
`

export default GlobalStyle
