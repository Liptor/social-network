import profileReducer, {actions}  from "./profile-reducer"
import {ProfileType} from "./type/type"

let state = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 25},],
    profile: null as ProfileType | null,
    status: "",
    newPostText: ''
}

test('length of post should be incremented', () => {
    // 1: test data
    let action = actions.addPost('Hello There!!!');

    // 2: action
    let newState = profileReducer(state, action);

    // 3: expectation
    expect(newState.postsData.length).toBe(3);
});

// test('after deleting', () => {
//     // 1: test data
//     // let action = actions.deletePost(1);
//
//     // 2: action
//     let newState = profileReducer(state, action);
//
//     // 3: expectation
//     expect(newState.postsData.length).toBe(2);
// });



