import {
    createEntityAdapter,
    createSlice,
    configureStore, createAsyncThunk,
} from '@reduxjs/toolkit';
import {getAllPosts, getAllUsers} from '../../api/api';
import {fetchUsers} from './UserSlice';

const postsAdapter = createEntityAdapter({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (post) => post.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.id >= b.id,
});

const initialState = postsAdapter.getInitialState({
    loading: 'idle',
    error: null,
    currentRequestId: null
});

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (thunkAPI) => {
        const postsData = await getAllPosts();
        return postsData;
    }
);

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                const {requestId} = action.meta;
                if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = 'idle';
                    postsAdapter.setAll(state, action.payload);
                    state.currentRequestId = undefined;
                }
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                const {requestId} = action.meta;
                if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            });
    }
});

export const postsSelectors = postsAdapter.getSelectors((state) => state.posts);

export const postActions = postSlice.actions;

export default postSlice.reducer;
