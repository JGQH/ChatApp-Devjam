
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { db, user, auth } from '@Library/GUNAuth'
import type { IGunChainReference } from 'gun/types/chain'

interface ChatAppInterface {
  db: IGunChainReference<any, any, 'pre_root'>
  user: IGunChainReference<Record<string, any>, any, false>
  username: string | undefined
  state: ChatAuthState
  signUp: (alias:string, pass:string) => void
  signIn: (alias:string, pass:string) => void
  signOut:() => void
}

const ChatAppContext = createContext({} as ChatAppInterface)

export default function useGUN() {
  return useContext(ChatAppContext)
}

type ChatAuthState = {
  loading: boolean
  error?: string
}

export function GUNProvider({ children }:{ children:ReactNode }) {
  const [ username, setUsername ] = useState<string | undefined>(undefined)
  const [ state, setState ] = useState<ChatAuthState>({ loading: false })

  function signUp(alias:string, pass:string) {
    setState({ loading: true })

    auth.create({ alias, pass })
      .then(() => {
        setState({ loading: false })  
      })
      .catch(e => {
        setState({ loading: false, error: (e as Error).message })  
      })
  }

  function signIn(alias:string, pass:string) {
    setState({ loading: true })

    auth.login({ alias, pass })
      .then(() => {
        setState({ loading: false })  
      })
      .catch(e => {
        setState({ loading: false, error: (e as Error).message })  
      })
  }

  function signOut() {
    auth.logout()
  }

  useEffect(() => {
    auth.on(() => {
      const newUser = auth.user() as IGunChainReference
      
      //@ts-ignore
      newUser.get('alias').once(d => setUsername(d)) //Documentation indicates that it will return the value asked for, and 'alias' is just a string, so this actually works
    })

    return () => {
      //@ts-ignore
      auth.off() //Property actually exists and prevents previous 'on' from running more than once (Think of it as an event listener)
    }
  }, [])

  return (
    <ChatAppContext.Provider value={{ db, user, username, state, signUp, signIn, signOut }}>
      {children}
    </ChatAppContext.Provider>
  )
}