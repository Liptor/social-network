import { DialogsDataType, MessagesType } from "./type/type"
import { InferActionsType } from "./redux-store"

let initialState = {
    messages: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How is your day?' },
        { id: 3, message: "We're cool" },
        { id: 4, message: 'This is fine :)' },
        { id: 5, message: 'Cool' }] as Array<MessagesType>,
    dialogsData: [
        { id: 1, name: 'Mark' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Masha' },
        { id: 4, name: 'Nastya' },
        { id: 5, name: 'Gennagiy' }] as Array<DialogsDataType>,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD-MESS': {
            let message = action.message
            return {
                ...state,
                messages: [...state.messages, { id: 6, message }]
            }
        }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (message: string) => ({ type: 'SN/DIALOGS/ADD-MESS', message } as const)
}

export default dialogsReducer