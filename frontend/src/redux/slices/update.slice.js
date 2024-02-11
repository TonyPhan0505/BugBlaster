////////////////// Import dependencies //////////////////
import { createSlice } from "@reduxjs/toolkit";
////////////////////////////////////////////////////////

////////////////// Slice //////////////////
export const updateSlice = createSlice({
    name: "update",
    initialState: {
        updates: [],
        update: {},
        hasFetchedBulk: 2, // 0 = failed to fetch bulk, 1 = successfully fetched bulk, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasDeleted: 2, // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
    },
    reducers: {
        fetchBulkReducer: (state, action) => {
            const { status, updates } = action.payload;
            if (status === 1) { state.updates = updates; }
            state.hasFetchedBulk = status;
        },
        resetFetchBulkReducer: (state) => {
            state.hasFetchedBulk = 2;
        },
        createReducer: (state, action) => {
            const { status, update } = action.payload;
            if (status === 1) {
                let updatedUpdates = [...state.updates];
                updatedUpdates.unshift(update);
                state.updates = updatedUpdates;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        updateReducer: (state, action) => {
            const { status, update } = action.payload;
            if (status === 1) {
                let updatedUpdates = [...state.updates];
                for (let i = 0; i < updatedUpdates.length; i++) {
                    if (updatedUpdates[i].id === update.id) {
                        updatedUpdates[i] = update;
                        break;
                    }
                }
                state.updates = updatedUpdates;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, updateId } = action.payload;
            if (status === 1) {
                let updatedUpdates = [...state.updates];
                updatedUpdates = updatedUpdates.filter((e) => { return e.id !== updateId });
                state.updates = updatedUpdates;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
        }
    }
});
//////////////////////////////////////////

////////////////// actions //////////////////
export const {
    fetchBulkReducer,
    resetFetchBulkReducer,
    createReducer,
    resetCreateReducer,
    updateReducer,
    resetUpdateReducer,
    deleteReducer,
    resetDeleteReducer
} = updateSlice.actions;
////////////////////////////////////////////

////////////////// export //////////////////
export default updateSlice.reducer;
////////////////////////////////////////////