import {configureStore} from '@reduxjs/toolkit';
import UserSlice from './reducers/UserSlice';
import PostSlice from './reducers/postSlice';

export const store = configureStore({
    reducer: {
        users: UserSlice,
        posts: PostSlice
    },
});
