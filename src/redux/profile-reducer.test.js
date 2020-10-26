import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";

let state = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 25},],

};

test('length of post should be incremented', () => {
    // 1: test data
    let action = addPostActionCreator('Hello There!!!');

    // 2: action
    let newState = profileReducer(state, action);

    // 3: expectation
    expect(newState.postsData.length).toBe(3);
});

test('after deleting', () => {
    // 1: test data
    let action = deletePost(1);

    // 2: action
    let newState = profileReducer(state, action);

    // 3: expectation
    expect(newState.postsData.length).toBe(2);
});



