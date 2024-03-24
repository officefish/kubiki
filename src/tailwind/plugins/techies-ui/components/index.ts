import { alert } from './alert'
import { avatar } from './avatar'
import { artboard } from './artboard'
import { badge } from './badge'
import { bottomNavigation } from './bottom-navigation'
import { breadcrumbs } from './breadcrumbs'
import { button } from './button'
import { buttonGroup } from './button-group'
import { card } from './card'
import { chat } from './chat'
import { checkbox } from './checkbox'
import { collapse } from './collapse'
import { countdown } from './countdown'
import { divider } from './divider'
import { dropdown } from './dropdown'
import { drawer } from './drawer'
import { fileInput } from './file-input'
import { form } from './form'
import { footer } from './footer'
import { indicator } from './indicator'
import { input } from './input'
import { inputGroup } from './input-group'
import { join } from './join'
import { link } from './link'
import { loading } from './loading'
import { mask } from './mask'
import { menu } from './menu'
import { mockup } from './mockup'
import { modal } from './modal'
import { navbar } from './navbar'
import { progress } from './progress'
import { radialProgress } from './radial-progress'
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
import { toast } from './toast'
import { toggle } from './toggle'
import { tooltip } from './tooltip'

export const injectComponents = ({ addComponents }: any): any => {
  const components = {
    ...alert,
    ...avatar,
    ...artboard,
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
    ...form,
    ...footer,
    ...indicator,
    ...input,
    ...inputGroup,
    ...join,
    ...link,
    ...loading,
    ...mask,
    ...menu,
    ...mockup,
    ...modal,
    ...navbar,
    ...progress,
    ...radialProgress,
    ...radio,
    ...rating,
    ...range,
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
  addComponents(components)
}
