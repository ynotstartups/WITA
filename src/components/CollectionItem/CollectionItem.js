import React from "react"
import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import styles from "./CollectionItem.module.css"

function CollectionItem({ href, title, imageFluid }) {
  return (
    <BackgroundImage fluid={imageFluid}>
      <Link to={href} className={styles.container}>
        <div className={styles.title}>{title}</div>
      </Link>
    </BackgroundImage>
  )
}

export default CollectionItem
