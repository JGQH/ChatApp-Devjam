import React, { InputHTMLAttributes } from 'react'
import style from './Input.module.scss'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>{
  className?: string[]
}

export default function Input({ className, ...props }:InputProps) {
  const realClassname = [...(className || []), style.element].join(' ')

  return <input className={realClassname} {...props} />
}