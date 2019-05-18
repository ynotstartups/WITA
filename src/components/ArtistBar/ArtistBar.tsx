import React, { useState, useRef, useEffect } from "react"
import { Typography } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import ExpandLess from "@material-ui/icons/ExpandLess"
import classNames from "classnames/bind"
import Divider from "@material-ui/core/Divider"
import fetch from "isomorphic-fetch"
import icon from "../../images/icon.png" // Tell Webpack this JS file uses this image

// @ts-ignore
import styles from "./ArtistBar.module.css"
import ArtistSaveButton from "../ArtistCard/ArtistSaveButton/ArtistSaveButton"

let cx = classNames.bind(styles)

interface Props {
  displayLabel: String
  id: String
}

const ArtistBar: React.FunctionComponent<Props> = ({ displayLabel, id }) => {
  let [expanded, setExpanded] = useState(false)
  let [description, setDescription] = useState("")
  let [extract, setExtract] = useState("")
  let [thumbnail, setThumbnail] = useState("")
  let [fetched, setFetched] = useState(false)

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

  useEffect(() => {
    const fetchURL =
      displayLabel !== ""
        ? `https://en.wikipedia.org/api/rest_v1/page/summary/${displayLabel.replace(
            / /g,
            "_"
          )}`
        : ""

    if (fetchURL === "" || fetched) {
      return
    }

    fetch(fetchURL)
      .then(response => {
        setFetched(true)
        return response.json()
      })
      .then(responseJson => {
        try {
          setDescription(responseJson.description)
          setExtract(responseJson.extract)
          setThumbnail(responseJson.thumbnail.source)
        } catch (e) {
          console.error(e)
        }
      })
  })

  return (
    <div className={containerClassName}>
      <div className={styles.bar}>
        <div className={styles.info}>
          <img className={styles.avatar} src={thumbnail || icon} />
          <div className={styles.details}>
            <Typography variant="h6" className={styles.name}>
              {displayLabel}
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <ArtistSaveButton id={id} />
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
        <Typography variant="body1" className={styles.extract}>
          {extract}{" "}
          {
            <a
              href={`https://en.wikipedia.org/wiki/${displayLabel.replace(
                / /g,
                "_"
              )}`}
              aria-label={`Open ${displayLabel} In Wikipedia`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Wikipedia
            </a>
          }
        </Typography>
      </div>
    </div>
  )
}

export default ArtistBar
