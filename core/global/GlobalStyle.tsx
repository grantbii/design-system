import { createGlobalStyle } from "styled-components";
import "../assets/fonts/satoshi/css/satoshi.css";
import * as Colors from "../foundations/colors";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    max-width: 100vw;
  }

  body {
    color: ${Colors.typography.blackHigh};
    background: ${Colors.base.white};
    font-family: Satoshi;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  fieldset,
  textarea {
    all: unset;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button:hover {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  li {
    list-style-position: inside;
  }

  li * {
    vertical-align: middle;
  }

  /* number textfield in Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* number textfield in Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

export default GlobalStyle;
