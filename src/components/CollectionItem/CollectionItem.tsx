import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import BackgroundImage, { IFluidObject } from "gatsby-background-image"

import styles from "./CollectionItem.module.css"

interface Props {
  href: string
  title: string
  imageFluid: IFluidObject
}

const CollectionItem: React.SFC<Props> = ({ href, title, imageFluid }) => {
  return (
    <BackgroundImage fluid={imageFluid} Tag="section">
      <Link to={href} className={styles.container}>
        <div className={styles.title}>{title}</div>
      </Link>
    </BackgroundImage>
  )
}

export default CollectionItem
