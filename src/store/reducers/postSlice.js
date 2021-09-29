import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    postCount: 0
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.postCount = action.payload.length;
        }
    },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
