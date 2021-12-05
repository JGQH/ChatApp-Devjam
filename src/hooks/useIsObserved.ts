import { useEffect, useRef, useState } from 'react'

export default function useIsObserved<T extends HTMLElement>(options?:IntersectionObserverInit){
  const observedRef = useRef<T>(null)
  const [ isObserved, setIsObserved ] = useState(false)

  useEffect(() => {
    const element = observedRef.current

    const observer = new IntersectionObserver(([ entry ]) => {
      setIsObserved(entry.isIntersecting)

    }, options)

    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return [ isObserved, observedRef ] as const
}