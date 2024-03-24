import { useState, useEffect, useRef } from 'react'

export default function useComponentOutside(initialOutside: boolean = false) {
  const [isComponentOutside, setIsComponentOutside] = useState(initialOutside)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentOutside(true)
    } else {
      setIsComponentOutside(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isComponentOutside, setIsComponentOutside }
}
