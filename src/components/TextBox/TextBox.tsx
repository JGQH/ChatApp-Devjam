import React from 'react'
import Button from '@Elements/Button'
import Input from '@Elements/Input'
import styles from './TextBox.module.scss'

export default function TextBox() {
  return (
    <div className={styles.container}>
      <Input type='text' placeholder='Type your message here...' />
      <Button>Send</Button>
    </div>
  )
}