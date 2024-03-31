import { FC, useState, useRef, useEffect, PropsWithChildren } from 'react'
import useComponentOutside from '@client/hooks/component-outside'

import {
  StyledCollapseSection,
  StyledCollapseSectionTitle,
  StyledCollapseSectionContent,
  SettingsContentDelimeter,
} from '../../styled-profile'
//import { setTimeout } from 'timers'

interface ICollapseSection extends PropsWithChildren {
  name: string
  onCollapse?: (isCollapsed: boolean) => void
}

const CollapseSection: FC<ICollapseSection> = ({
  name,
  onCollapse,
  children,
}) => {
  const { ref, isComponentOutside } = useComponentOutside(true)
  const [forseCollapse, setForseCollapse] = useState(false)
  const click = useRef(0)

  useEffect(() => {
    setForseCollapse(!isComponentOutside)

    if (ref && ref.current && onCollapse) {
      const section: HTMLElement = ref.current
      const isCollapsed = section.classList.contains('collapse-open')
      onCollapse(!isCollapsed)
    }
  }, [isComponentOutside, click])

  const clickHandle = () => {
    click.current += 1
  }

  return (
    <StyledCollapseSection
      ref={ref}
      $forceCollapse={forseCollapse}
      onClick={clickHandle}
    >
      {/* <input type="checkbox" className="w-[1px] h-[1px]" onChange={handleAnimationEnd}/>  */}
      <StyledCollapseSectionTitle>{name}</StyledCollapseSectionTitle>
      <StyledCollapseSectionContent>
        <SettingsContentDelimeter />
        {children}
      </StyledCollapseSectionContent>
    </StyledCollapseSection>
  )
}

export default CollapseSection
