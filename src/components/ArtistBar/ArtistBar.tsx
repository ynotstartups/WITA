import React, { useState, useRef } from "react"
import { Typography } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import ExpandLess from "@material-ui/icons/ExpandLess"
import classNames from "classnames/bind"
import Divider from "@material-ui/core/Divider"

// @ts-ignore
import styles from "./ArtistBar.module.css"
import ArtistSaveButton from "../ArtistCard/ArtistSaveButton/ArtistSaveButton"

let cx = classNames.bind(styles)

const ArtistBar: React.FunctionComponent = () => {
  let [expanded, setExpanded] = useState(false)

  const descriptionRef = useRef(null)

  let containerClassName = cx({
    container: true,
    containerExpanded: expanded,
  })

  let descriptionClassName = cx({
    description: true,
    descriptionExpanded: expanded,
  })

  let expandIconClassName = cx({
    expandIcon: true,
    expandIconExpanded: expanded,
  })

  const node = descriptionRef.current as HTMLElement
  if (node) {
    if (expanded) {
      node.style.height = `${node.scrollHeight}px`
    } else {
      node.style.height = `0`
    }
  }

  return (
    <div className={containerClassName}>
      <div className={styles.bar}>
        <div className={styles.info}>
          <img
            className={styles.avatar}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/253px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg"
          />
          <div className={styles.details}>
            <Typography variant="h6" className={styles.name}>
              Vincent van Gogh
            </Typography>
            <Typography variant="body1">
              Influential Dutch Post-Impressionist painter (1853–1890)
            </Typography>
          </div>
        </div>

        <div>
          <ArtistSaveButton id={"andy-warhol"} />
          <IconButton
            onClick={() => {
              setExpanded(!expanded)
            }}
          >
            <ExpandLess className={expandIconClassName} />
          </IconButton>
        </div>
      </div>

      <div className={descriptionClassName} ref={descriptionRef}>
        <Divider className={styles.divider} />
        <Typography variant="body1">
          Vincent Willem van Gogh was a Dutch post-impressionist painter who is
          among the most famous and influential figures in the history of
          Western art. In just over a decade he created about 2,100 artworks,
          including around 860 oil paintings, most of them in the last two years
          of his life. They include landscapes, still lifes, portraits and
          self-portraits, and are characterised by bold colours and dramatic,
          impulsive and expressive brushwork that contributed to the foundations
          of modern art. He was not commercially successful, and his suicide at
          37 followed years of mental illness and poverty.
        </Typography>
      </div>
    </div>
  )
}

export default ArtistBar
