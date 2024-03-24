import { FC, MouseEvent } from 'react'

//import styles from './Logo.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Logo: FC = () => {
  const router = useRouter()
  const href = '/'

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <button onClick={handleClick}>
      <Image width={120} height={70} src={'/logo.webp'} alt={'logo'} />
    </button>
  )
}

export default Logo
