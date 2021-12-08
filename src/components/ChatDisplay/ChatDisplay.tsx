import React, { useEffect, useState } from 'react'
import GUN, { SEA } from 'gun'
import Bottomer from '@Components/Bottomer'
import useGUN from '@Hooks/useGUN'
import ChatMessage, { MessageInterface } from './ChatMessage'
import style from './ChatDisplay.module.scss'

const key = import.meta.env.VITE_GUN_KEY as string

export default function ChatDisplay() {
  const { db, username } = useGUN()
  const [ messages, setMessages ] = useState<MessageInterface[]>([])
  const [ namesNotLoaded, setNamesNotLoaded ] = useState(false)

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
        
        if(!message.alias) setNamesNotLoaded(true)

        if(message.content) setMessages(newMessages => [...newMessages.slice(-100), message]) //Only get the last 100 messages
      }
      
    } )

    return () => db.get('general').map().off()
  }, [])

  return (
    <>
      <div className={style.container}>
        {messages.sort((a, b) => a.time - b.time).map((message, key) => {
          const isUser = message.alias === username

          return <ChatMessage {...{...message, isUser, key}}/>
        })}
        <Bottomer />
      </div>
      {namesNotLoaded &&
      <div className={style.error}>
        <p>Some names weren't loaded properly, try refreshing the page.</p>
        <button onClick={() => setNamesNotLoaded(false)}>✖</button>
      </div>}
    </>
  )
}