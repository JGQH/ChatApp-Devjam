import React from 'react'
import styles from './TextBox.module.scss'

export default function TextBox() {
  return (
    <div className={styles.container}>
      <input type='text' placeholder='Type your message here...' />
      <button>Send</button>
    </div>
  )
}