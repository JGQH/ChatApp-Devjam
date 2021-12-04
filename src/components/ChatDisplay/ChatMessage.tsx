import React from 'react'
import style from './ChatDisplay.module.scss'

export interface MessageInterface {
  alias: string
  content: string
  time: number
}

interface ChatMessageProps extends MessageInterface {
  isUser: boolean
}

export default function ChatMessage({ alias, content, time, isUser }:ChatMessageProps) {
  const timestamp = new Date(time).toLocaleString()

  return (
    <div className={style.message}>
      <div className={style.identifier}>
        <h3>{alias}</h3>
        <h6>⠀{timestamp}</h6>
        {isUser && <h6>⠀(You)</h6>}
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  )
}