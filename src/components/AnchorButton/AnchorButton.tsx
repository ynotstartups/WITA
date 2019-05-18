import React from "react"
import Button from "@material-ui/core/Button"

interface AnchorButtonProps {
  href: string
  children: string
}

const AnchorButton: React.FunctionComponent<AnchorButtonProps> = ({
  href,
  children,
}) => {
  return (
    <Button
      size="small"
      color="primary"
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      style={{ color: "black" }}
    >
      {children}
    </Button>
  )
}

export default AnchorButton
