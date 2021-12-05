
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { db, user, auth } from '@Library/GUNAuth'
import type { IGunChainReference } from 'gun/types/chain'

interface ChatAppInterface {
  db: IGunChainReference<any, any, 'pre_root'>
  user: IGunChainReference<Record<string, any>, any, false>
  username: string | undefined
  state: ChatAuthState
  signUp: (alias:string, pass:string) => void
  signIn: (alias:string, pass:string) => Promise<void>
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

  async function signIn(alias:string, pass:string) {
    setState({ loading: true })

    // This is just a silly way to fix auth error, where it only works after the third attempt
    // But t is absolutely beyond my power, so this is the only thing I could think of
    // If it actually takes more than those 3 tries, then just throw an error

    let attempts = 0

    while (attempts < 3) {
      try {
        await auth.login({ alias, pass })
        setState({ loading: false }) 
        break
      } catch (e) {
        attempts += 1

        if(attempts === 3) {
          setState({ loading: false, error: (e as Error).message })
        }
      }
    }
  }

  function signOut() {
    auth.logout()
    setUsername(undefined)
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