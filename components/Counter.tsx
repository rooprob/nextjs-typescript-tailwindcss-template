import { useEffect, useRef, useState } from 'react'

type Callback = () => void
function Counter() {
  const [count, setCount] = useState(0)
  const savedCallback = useRef<Callback>()

  function callback() {
    setCount(count + 1)
  }

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      const callback = savedCallback?.current
      if (callback !== undefined) {
        callback()
      }
    }

    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <h1>{count}</h1>
}

export const Counter2 = () => {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <h1>{count} from Counter2</h1>
}

export const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = useRef<Callback>()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      const callback = savedCallback?.current
      if (callback !== undefined) {
        callback()
      }
    }

    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default Counter
