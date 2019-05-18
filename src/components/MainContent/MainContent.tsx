import React from "react"

// this component is for providing a global padding of the main content

interface Props {
  children: React.ReactNode
}

const MainContent: React.FunctionComponent<Props> = ({ children }) => (
  <div style={{ margin: "1.5rem" }}>{children}</div>
)

export default MainContent
