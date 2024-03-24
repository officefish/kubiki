import {
  FC,
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  MouseEvent,
  useRef,
} from 'react'
import Cropper, { Area, Size } from 'react-easy-crop'

import getCroppedImg from '@client/services/crop-image.service'

interface IImageCropper {
  image: string
  aspect: number | undefined
  onCrop: (value: string) => void
}

const ImageCropper: FC<IImageCropper> = ({ image, aspect, onCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1.0)

  //const [initialCroppedArea, setInitialCroppedArea] = useState(undefined)
  //const [croppedArea, setCroppedArea] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const [cropContainerSize, setCropContainerSize] = useState<Size>()

  const cropContainerRef = useRef(null)

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [],
  )

  const onZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setZoom(+e.target.value)
  }

  const onCropHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (croppedAreaPixels === undefined) return
    const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels)
    onCrop(croppedImageUrl)
  }

  useEffect(() => {
    const cropContainer = cropContainerRef.current
    if (cropContainer) {
      setCropContainerSize({
        width: cropContainer.clientHeight,
        height: cropContainer.clientHeight,
      })
    }
  }, [crop, zoom])

  return (
    <>
      <div
        ref={cropContainerRef}
        className="absolute top-12 left-0 bottom-[15%] right-0"
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropSize={cropContainerSize}
          minZoom={0.5}
          maxZoom={3.0}
          zoomSpeed={0.075}
          objectFit="cover" // | 'horizontal-cover' | 'vertical-cover';
        />
      </div>
      <div className="absolute right-0 bottom-0 flex items-center gap-4 w-full">
        <input
          type="range"
          min={0.5}
          max={3.0}
          step={0.05}
          value={zoom}
          className="range range-accent"
          onChange={onZoomChange}
        />
        <button
          className="btn btn-accent btn-outline btn-wide"
          onClick={onCropHandle}
        >
          Crop
        </button>
      </div>
    </>
  )
}

export default ImageCropper
