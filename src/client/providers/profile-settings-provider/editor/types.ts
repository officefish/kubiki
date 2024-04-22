export interface IUserProfileEditorState {
  setPath: any
  path: string[]
}

export interface IUserProfileEditorActions {
  setPath: (newPath: string[]) => void
}
