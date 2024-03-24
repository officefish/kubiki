import { useState, useEffect } from 'react'

export default function useGlobalOverflowHidden(
  needStable: boolean = false,
  hidden: boolean = false,
) {
  const [isOverflowHidden, setIsOverflowHidden] = useState<boolean>(hidden)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOverflowHidden) {
      document.body.classList.add('body-hidden')
      if (needStable) {
        document.body.classList.add('body-stable')
      }
    } else {
      document.body.classList.remove('body-hidden')
      if (needStable) {
        document.body.classList.remove('body-stable')
      }
    }
  }, [isOverflowHidden, needStable])

  return { isOverflowHidden, setIsOverflowHidden } as const
}
