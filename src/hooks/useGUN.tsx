
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { db, auth } from '@Library/GUNAuth'
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

type ChatAuthState = {
  loading: boolean
  error?: string
}

function useGUNProvider(): ChatAppInterface {
  const user = db.user().recall({ sessionStorage: true })
  const [ username, setUsername ] = useState<string | undefined>(undefined)
  const [ state, setState ] = useState<ChatAuthState>({ loading: false })

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

  function signUp(alias:string, pass:string) {
    setState({ loading: true })

    auth.create({ alias, pass })
      .then(() => {
        setState({ loading: false })
        signIn(alias, pass)
      })
      .catch(e => {
        setState({ loading: false, error: (e as Error).message })  
      })
  }

  function signOut() {
    auth.logout()
    setUsername(undefined)
  }

  useEffect(() => {
    //@ts-ignore
    db.on('auth', async () => {
      //@ts-ignore
      const alias:string = await user.get('alias') //Documentation indicates that it will return the value asked for, and 'alias' is just a string, so this actually works

      setUsername(alias)
    })

    return () => db.off()
  }, [])

  return { db, user, username, state, signUp, signIn, signOut }
}

// Handling of context

const ChatAppContext = createContext({} as ChatAppInterface)

export function GUNProvider({ children }:{ children:ReactNode }) {
  const gun = useGUNProvider()

  return (
    <ChatAppContext.Provider value={gun}>
      {children}
    </ChatAppContext.Provider>
  )
}

export default function useGUN() {
  return useContext(ChatAppContext)
}