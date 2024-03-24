export interface IVisualsAvatarProps {
  avatarSrc?: string
}

export interface IVisualsCoverProps {
  coverSrc?: string
}

export interface IVisualsSettingsProps
  extends IVisualsAvatarProps,
    IVisualsCoverProps {}
