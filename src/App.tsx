import React from 'react'
import TextBox from '@Components/TextBox'
import LoginScreen from '@Components/LoginScreen'
import styles from './App.module.scss'

export default function App() {

  return (
    <div className={styles.container}>
      <LoginScreen />
    </div>
  )
}