import {AppStateType} from "../../redux/redux-store";

export const getFriendsToSidebar = (state: AppStateType) => {
    return state.sidebar.friend
}