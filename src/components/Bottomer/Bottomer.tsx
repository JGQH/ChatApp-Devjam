import React from 'react'
import useIsObserved from '@Hooks/useIsObserved'
import style from './Bottomer.module.scss'

export default function Bottomer() {
  const [ isObserved, observedRef ] = useIsObserved<HTMLDivElement>({ root: null, threshold: 1 })
  const className = [style.sender, isObserved ? style.hidden : ''].join(' ')

  function doScroll() {
    const element = observedRef.current

    if(element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className={className}>
        <button onClick={doScroll}>⬇</button>
      </div>
      <div ref={observedRef} />
    </>
  )
}