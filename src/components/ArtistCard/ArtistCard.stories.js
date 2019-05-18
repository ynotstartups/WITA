import React from "react"
import { storiesOf } from "@storybook/react"

storiesOf(`Dashboard/Header`, module).add(`default`, () => (
  <a href="whatever.com" style={{background: "black", height: 200, width: 200, display: "flex", alignItems: "center", justifyContent: "center"}}>
    <div style={{ color: "white", border: "solid 3px white", padding: 10}}>Impressionism</div>
  </a>
))
