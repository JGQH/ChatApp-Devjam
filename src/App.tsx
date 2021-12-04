import React from 'react'
import TextBox from '@Components/TextBox'
import LoginScreen from '@Components/LoginScreen'
import useGUN, { GUNProvider } from '@Hooks/useGUN'
import styles from './App.module.scss'
import Header from '@Components/Header'

function RealApp() {
  const { username } = useGUN()

  return (
    <div className={styles.container}>
      {username ?
      <>
        <Header />
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