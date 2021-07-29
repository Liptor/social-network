import { ResultCodesEnum, userAPI } from "../api/api";
import { AppStateType, InferActionsType } from "./redux-store";
import { UsersType } from "./type/type";
import { ThunkAction } from 'redux-thunk'


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 6,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        }
        case "UNFOLLOW": {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        }
        case "SET_USERS": {
            return { ...state, users: action.users }
        }
        case "SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }
        case "SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.count }
        }
        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) =>
        ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}


// type GetStateType = () => AppStateType
// type CurrentDispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => async dispatch => { // THUNKCREATOR
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    await userAPI.getUsers(page, pageSize).then(response => {
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(response.data.items))
        dispatch(actions.setTotalUsersCount(response.data.totalCount))
    })
}

export const follow = (userId: number): ThunkType => async dispatch => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    await userAPI.follow(userId).then(response => {
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.unfollowSuccess(userId))
        }
    })
}

export const unfollow = (userId: number): ThunkType => async dispatch => { // THUNKCREATOR
    dispatch(actions.toggleFollowingProgress(true, userId));
    await userAPI.unfollow(userId).then(response => {
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.unfollowSuccess(userId));
        }
    })
}

export default usersReducer;