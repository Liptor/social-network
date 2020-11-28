const ADD_MESS = 'ADD-MESS'

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    messages: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How is your day?' },
        { id: 3, message: "We're cool" },
        { id: 4, message: 'This is fine :)' },
        { id: 5, message: 'Cool' }] as Array<MessageType>,
    dialogsData: [
        { id: 1, name: 'Mark' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Masha' },
        { id: 4, name: 'Nastya' },
        { id: 5, name: 'Gennagiy' }] as Array<DialogType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_MESS: {
            let message = action.message;
            return {
                ...state,
                messages: [...state.messages, { message }]
            }
        };
        default:
            return state
    }
}

type SendMessageCreatorActionType = {
    type: typeof ADD_MESS,
    message: string
} 

export const sendMessage = (message: string): SendMessageCreatorActionType => ({ type: ADD_MESS, message })

export default dialogsReducer