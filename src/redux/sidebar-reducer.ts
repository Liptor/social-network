import { DialogsDataType } from "./type/type";

let initialState = {
    friend: [
        { id: 1, name: "Mark" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Masha" }
    ] as Array<DialogsDataType>
}

export type SitebarStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): SitebarStateType => {
    return state 
};

// export const sideBarActionCreator = () => {
//     return
// }

export default sidebarReducer