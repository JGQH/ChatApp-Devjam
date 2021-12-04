import React, { useEffect, useState } from 'react'
import useGUN from '@Hooks/useGUN'
import GUN, { SEA } from 'gun'
import ChatMessage, { MessageInterface } from './ChatMessage'
import style from './ChatDisplay.module.scss'

const key = import.meta.env.VITE_GUN_KEY as string

export default function ChatDisplay() {
  const { db, username } = useGUN()
  const [ messages, setMessages ] = useState<MessageInterface[]>([])

  useEffect(() => {
    db.get('general').map().once(async (data) => {
      if (data) {
        const message:MessageInterface = {
          //@ts-ignore
          alias: await db.user(data).get('alias'), //Gets the user asociated with the node, then reads its alias
          content: await SEA.decrypt(data.content, key) as string, //Forced string conversion
          //@ts-ignore
          time: +GUN.state.is(data, 'content') //Gets the name of the node, which is set to the time of sending
        }
        
        if(message.content) {
          setMessages(newMessages => [...newMessages.slice(-100), message]) //Only get the last 100 messages
        }
      }
      
    } )

    return () => db.off()
  }, [])

  return (
    <div className={style.container}>
      {messages.sort((a, b) => a.time - b.time).map((message, key) => {
        const isUser = message.alias === username

        return <ChatMessage {...{...message, isUser, key}}/>
      })}
    </div>
  )
}