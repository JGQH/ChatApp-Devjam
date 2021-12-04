import React from 'react'
import Button from '@Elements/Button'
import Input from '@Elements/Input'
import style from './LoginScreen.module.scss'

export default function LoginScreen() {
  return (
    <div className={style.container}>
      <h1>Devjam Chat</h1>
      <div className={style.inputField}>
        <p>Username:</p>
        <Input type='text' placeholder='Example: Devjam' />
      </div>
      <div className={style.inputField}>
        <p>Password:</p>
        <Input type='password' placeholder='Example: Devjam' />
      </div>
      <div className={style.buttonField}>
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  )
}