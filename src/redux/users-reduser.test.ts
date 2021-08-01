import usersReducer, { actions, InitialStateType } from './users-reducer';

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            { id: 0, name: 'Ivan 1', followed: false, photos: { small: null, large: null }, status: 'status 0' },
            {
                id: 1, name: 'Ivan 1', followed: false, photos: { small: null, large: null },
                status: 'status 2'
            },
            {
                id: 2, name: 'Ivan 1', followed: true, photos: { small: null, large: null },
                status: 'status 1'
            },
            {
                id: 3, name: 'Ivan 1', followed: true, photos: { small: null, large: null },
                status: 'status 0'
            }],
        pageSize: 6,
        totalUsersCount: 20,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[0].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})