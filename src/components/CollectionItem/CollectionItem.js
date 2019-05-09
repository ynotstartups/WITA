import React from "react"
import { Link } from "gatsby"

import styles from "./CollectionItem.module.css"

function CollectionItem({ href, title, backgroundImageUrl }) {
  return (
    <Link
      to={href}
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className={styles.title}>{title}</div>
    </Link>
  )
}

export default CollectionItem
