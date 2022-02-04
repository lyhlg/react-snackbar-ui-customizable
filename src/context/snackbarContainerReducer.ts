import produce from 'immer'

export const enum ActionType {
  ADD,
  REMOVE,
}
type ID = string
export type Snackbar = any & { id: ID }
export type State = Snackbar[]
export type Action =
  | { type: ActionType.ADD; payload: { options: Snackbar } }
  | { type: ActionType.REMOVE; payload: { id: ID } }

export const initialState: Snackbar[] = []

export const snackbarContainerReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD:
      return produce(state, (draft) => {
        draft.push(action.payload.options)
      })
    case ActionType.REMOVE:
      return produce(state, (draft) =>
        draft.filter((snackbar) => snackbar.id !== action.payload.id),
      )

    default:
      return state
  }
}
