import { FC, MouseEvent } from 'react'
import { UserMin } from '@client/models/user.model'

//import Image from 'next/image'

import { NavigationButton, StyledUserName } from './styled-header'
//import { CoverImage } from './styled-header'

import { useRouter } from 'next/router'

const UserItem: FC<UserMin> = ({ name, avatar }) => {
  const router = useRouter()
  const href = '/me'

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(href)
  }

  const handleImageError = (event) => {
    event.target.onerror = null // Reset the event handler to prevent infinite loop
    event.target.src = `/public/${avatar}` // Try loading the image from the fallback source
  }

  return (
    <NavigationButton onClick={handleClick}>
      <div className="avatar">
        <div className="w-6 mask mask-squircle">
          {avatar && (
            // <Image
            //   alt="avatar"
            //   src={avatar}
            //   width={24}
            //   height={24}
            //   className="w-6 mask mask-squircle"
            // />
            <div className="w-6 h-6 relative">
              <img src={avatar} onError={handleImageError} />
            </div>
          )}
        </div>
      </div>
      <StyledUserName>{name}</StyledUserName>
    </NavigationButton>
  )
}

//<Link className='ml-5 mr-2 hover:text-cyan-500 cursor-pointer text-lg whitespace-nowrap' href='/me'>{name}.</Link>

export default UserItem
