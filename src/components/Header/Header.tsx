import React from 'react'
import useGUN from '@Hooks/useGUN'
import style from './Header.module.scss'

export default function Header() {
  const { username, signOut } = useGUN()

  return (
    <div className={style.container}>
      <button>
        <p>Channel:</p>
        <h3>#general</h3>
      </button>
      <div className={style.username}>
        <h1>{ username }</h1>
      </div>
      <button onClick={signOut}>
        <p>Sign Out</p>
      </button>
    </div>
  )
}