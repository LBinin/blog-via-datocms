import React from 'react'
import styles from './index.module.scss'
import Highlighter from 'react-highlight-words'

/**
 * 用主题色高亮一些标点符号
 */
const MarkedText: React.FC<{
  text?: string;
  className?: string;
}> = props => {
  const { text, className } = props
  if (!text) {
    return null
  }

  const mark = '，。？！「」、：（）——#《》'

  return (
    <Highlighter
      className={className}
      highlightClassName={styles.keyword}
      searchWords={mark.split('')}
      textToHighlight={text}
    />
  )
}

export default MarkedText
