import React, { InputHTMLAttributes, KeyboardEvent } from 'react'
import style from './Input.module.scss'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>{
  className?: string[]
  onEnter?: () => void
}

export default function Input({ className, onEnter, onKeyDown, ...props }:InputProps) {
  const realClassname = [...(className || []), style.element].join(' ')

  function handleKeyDown(e:KeyboardEvent<HTMLInputElement>) {
    if(e.code === 'Enter' && !(e.shiftKey || e.ctrlKey || e.altKey)) { //When only Enter is pressed, and just Enter
      onEnter && onEnter()
      return
    }

    onKeyDown && onKeyDown(e)
  }

  return <input className={realClassname} onKeyDown={handleKeyDown} {...props} />
}