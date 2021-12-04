import React, { HTMLAttributes } from 'react'
import style from './Button.module.scss'

interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'className'> {
  className?: string[]
}

export default function Button({ className, children, ...props }:ButtonProps) {
  const realClassname = [...(className || []), style.element].join(' ')

  return <button className={realClassname} {...props}>{children}</button>
}