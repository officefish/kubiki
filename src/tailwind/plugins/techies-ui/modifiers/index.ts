import { alert } from './alert'
import { avatar } from './avatar'
import { badge } from './badge'
import { breadcrumbs } from './breadcrumbs'
import { bottomNavigation } from './bottomNavigation'
import { button } from './button'
import { buttonGroup } from './buttonGroup'
import { card } from './card'
import { chat } from './chat'
import { collapse } from './collapse'
import { countdown } from './countdown'
import { checkbox } from './checkbox'
import { divider } from './divider'
import { drawer } from './drawer'
import { dropdown } from './dropdown'
import { fileInput } from './file-input'
import { footer } from './footer'
import { form } from './form'
import { input } from './input'
import { join } from './join'
import { link } from './link'
import { loading } from './loading'
import { mask } from './mask'
import { menu } from './menu'
import { mockup } from './mockup'
import { modal } from './modal'
import { progress } from './progress'
import { radialProgress } from './radialProgress'
import { radio } from './radio'
import { range } from './range'
import { rating } from './rating'
import { select } from './select'
import { swap } from './swap'
import { stat } from './stat'
import { stack } from './stack'
import { tab } from './tab'
import { table } from './table'
import { textarea } from './textarea'
import { tabColors } from './colors'
import { toast } from './toast'
import { toggle } from './toggle'
import { tooltip } from './tooltip'
import { navbar } from './navbar'

export const injectModifiers = ({ addUtilities }: any): any => {
  const modifiers = {
    ...alert,
    ...avatar,
    ...badge,
    ...breadcrumbs,
    ...bottomNavigation,
    ...button,
    ...buttonGroup,
    ...card,
    ...chat,
    ...checkbox,
    ...collapse,
    ...countdown,
    ...divider,
    ...drawer,
    ...dropdown,
    ...fileInput,
    ...footer,
    ...form,
    ...input,
    ...join,
    ...link,
    ...loading,
    ...mask,
    ...menu,
    ...mockup,
    ...modal,
    ...navbar,
    ...radio,
    ...radialProgress,
    ...range,
    ...rating,
    ...progress,
    ...select,
    ...swap,
    ...stat,
    ...stack,
    ...tab,
    ...table,
    ...textarea,
    ...toast,
    ...toggle,
    ...tooltip,
  }
  addUtilities(modifiers)
}

export const styledColors = {
  ...tabColors,
}
