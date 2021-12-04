import { useRef, useState } from 'react'

type Dictionary = {
  [key: string] : string
}

export default function useForm() {
  const [data, setData] = useState<Dictionary>({})

  function setEntry(key:string, value:string) {
    const newData = {...data, [key]: value}

    setData(newData)
  }

  return [ data, setEntry ] as const
}