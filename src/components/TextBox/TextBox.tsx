import React, { useState } from 'react'
import Button from '@Elements/Button'
import Input from '@Elements/Input'
import useGUN from '@Hooks/useGUN'
import { SEA } from 'gun'
import styles from './TextBox.module.scss'


const key = import.meta.env.VITE_GUN_KEY as string

export default function TextBox() {
  const { db, user } = useGUN()
  const [ plainContent, setContent ] = useState('')

  async function sendMessage() {
    const content = await SEA.encrypt(plainContent, key)
    const message = user.get('all').set({ content }) //Creates node related to user and sets message as the content
    const index = Date.now().toString()

    db.get('general').get(index).put(message)
    setContent('')
  }

  return (
    <div className={styles.container}>
      <Input type='text' placeholder='Type your message here...' onChange={e => setContent(e.target.value)} value={plainContent} onEnter={sendMessage} />
      <Button onClick={sendMessage} disabled={plainContent.length === 0}>Send</Button>
    </div>
  )
}