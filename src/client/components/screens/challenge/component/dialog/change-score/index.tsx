import {
  FC,
  useRef,
  MouseEvent,
  useEffect,
  SyntheticEvent,
  useState,
} from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledReadyInput,
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
  StyledFormBody,
  StyledFormWrapper,
  StyledFormHeader,
} from '../../../challenge.styled'
import { ICategoryScore } from '@/client/models/challenge.types'
import RatingFormField from '@/client/components/form/dev/rating/rating.field'

// import FormField from '@client/components/form/dev/field'
// import NumberFormField from '@/client/components/form/dev/number.field'
// import ImageUploadField from '@/client/components/form/dev/image-upload.field'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  title: string
  scores: ICategoryScore[]
  onScoreChange: (data) => void
}

const ChangeScoreDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { title, setIsOpen, isOpen, scores, onScoreChange } = props

  const [scoresMap] = useState(new Map())

  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelWorkspaceCration(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Array.from(scoresMap, ([id, value]) => ({ id, value }))
    onScoreChange(data)
  }

  const onRatingChange = (id: string, value: number) => {
    scoresMap.set(id, value)
  }

  useEffect(() => {
    scoresMap.clear()
    scores?.forEach((score) => {
      scoresMap.set(score.id, score.value)
    })
  }, [scores, scoresMap])

  return (
    <StyledDialog ref={modalRef} onClose={onDialogClose}>
      <StyledModalBox>
        <StyledFormWrapper>
          <StyledFormHeader>{title}</StyledFormHeader>
          <form onSubmit={onSubmit}>
            <StyledFormBody>
              {scores?.map((item) => (
                <RatingFormField
                  key={item.id}
                  id={item.id}
                  tag={item.title}
                  title={item.title}
                  value={item.value}
                  onChange={onRatingChange}
                />
              ))}
            </StyledFormBody>
            <div className="h-[30%] m-8 flex">
              <StyledReadyInput type="submit" value="Vote" />
              <StyledCancelButton onClick={cancelWorkspaceCration}>
                Cancel
              </StyledCancelButton>
            </div>
          </form>
        </StyledFormWrapper>
      </StyledModalBox>
    </StyledDialog>
  )
}
export default ChangeScoreDialog
