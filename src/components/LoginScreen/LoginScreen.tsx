import React from 'react'
import Button from '@Elements/Button'
import Input from '@Elements/Input'
import useForm from '@Hooks/useForm'
import useGUN from '@Hooks/useGUN'
import style from './LoginScreen.module.scss'

export default function LoginScreen() {
  const [ { alias, pass }, setEntry ] = useForm()

  const { state:{ loading, error } , signIn, signUp } = useGUN()

  return (
    <div className={style.container}>
      <h1>Devjam Chat</h1>
      <div className={style.inputField}>
        <p>Username:</p>
        <Input type='text' placeholder='Example: Devjam' onChange={e => setEntry('alias', e.target.value)} />
      </div>
      <div className={style.inputField}>
        <p>Password:</p>
        <Input type='password' placeholder='Example: Devjam-App' onChange={e => setEntry('pass', e.target.value)} />
      </div>
      
      <div className={style.buttonField}>
        <Button onClick={() => signIn(alias, pass)} disabled={loading} >Sign In</Button>
        <Button onClick={() => signUp(alias, pass)} disabled={loading} >Sign Up</Button>
      </div>
      {error &&
      <div className={style.errorField}>
        <p>Error: { error }</p>
      </div>}
    </div>
  )
}