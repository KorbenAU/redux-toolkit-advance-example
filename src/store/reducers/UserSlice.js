import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {getAllUsers} from '../../api/api';

const initialState = {
    users: [],
    loading: 'idle',
    error: null,
    currentRequestId: null
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (thunkAPI) => {
        const usersData = await getAllUsers();
        return usersData;
    }
);

export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                const {requestId} = action.meta;
                if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = 'idle';
                    state.users = action.payload;
                    state.currentRequestId = undefined;
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
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

export const {} = UserSlice.actions;

export default UserSlice.reducer;
