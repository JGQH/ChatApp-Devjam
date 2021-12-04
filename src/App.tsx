import React from 'react'
import TextBox from '@Components/TextBox'
import LoginScreen from '@Components/LoginScreen'
import useGUN, { GUNProvider } from '@Hooks/useGUN'
import styles from './App.module.scss'
import Header from '@Components/Header'
import ChatDisplay from 'components/ChatDisplay/ChatDisplay'

function RealApp() {
  const { username } = useGUN()

  return (
    <div className={styles.container}>
      {username ?
      <>
        <Header />
        <ChatDisplay />
        <TextBox />
      </>
      :
        <LoginScreen />
      }
    </div>
  )
}

export default function App() {
  return (
    <GUNProvider>
      <RealApp />
    </GUNProvider>
  )
}