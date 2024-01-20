////////////////// Import dependencies //////////////////
import { createSlice } from "@reduxjs/toolkit";
////////////////////////////////////////////////////////

////////////////// Slice //////////////////
export const bugSlice = createSlice({
    name: "bug",
    initialState: {
        bugs: [],
        bug: {},
        hasFetchedBulk: 2, // 0 = failed to fetch bulk, 1 = successfully fetched bulk, 2 = waiting
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasDeleted: 2, // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
    },
    reducers: {
        fetchBulkReducer: (state, action) => {
            const { status, bugs } = action.payload;
            if (status === 1) { state.bugs = bugs; }
            state.hasFetchedBulk = status;
        },
        resetFetchBulkReducer: (state) => {
            state.hasFetchedBulk = 2;
        },
        fetchReducer: (state, action) => {
            const { status, bug } = action.payload;
            if (status === 1) { state.bug = bug; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        createReducer: (state, action) => {
            const { status, bug } = action.payload;
            if (status === 1) {
                let updatedBugs = [...state.bugs];
                updatedBugs.unshift(bug);
                state.bugs = updatedBugs;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        updateReducer: (state, action) => {
            const { status, bug } = action.payload;
            if (status === 1) {
                let updatedBugs = [...state.bugs];
                for (let i = 0; i < updatedBugs.length; i++) {
                    if (updatedBugs[i].id === bug.id) {
                        updatedBugs[i] = bug;
                        break;
                    }
                }
                state.bugs = updatedBugs;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, bugId } = action.payload;
            if (status === 1) {
                let updatedBugs = [...state.bugs];
                updatedBugs = updatedBugs.filter((id) => { return id !== bugId });
                state.bugs = updatedBugs;
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
    fetchReducer,
    resetFetchReducer,
    createReducer,
    resetCreateReducer,
    updateReducer,
    resetUpdateReducer,
    deleteReducer,
    resetDeleteReducer
} = bugSlice.actions;
////////////////////////////////////////////

////////////////// export //////////////////
export default bugSlice.reducer;
////////////////////////////////////////////