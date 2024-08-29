////////////////// Import dependencies //////////////////
import { createSlice } from "@reduxjs/toolkit";
////////////////////////////////////////////////////////

////////////////// Slice //////////////////
export const projectSlice = createSlice({
    name: "project",
    initialState: {
        currentProject: {},
        isLoggedIn: 2, // 0 = failed login, 1 = successfully logged in, 2 = waiting for credentials to be entered
        isSignedUp: 2 // 0 = failed sign up, 1 = successfully signed up, 2 = waiting for credentials to be entered, 3 = invalid project name, 4 = unregistered email address
    },
    reducers: {
        loginReducer: (state, action) => {
            const { status, project } = action.payload;
            if (status === 1) { state.currentProject = project; }
            state.isLoggedIn = status;
        },
        resetLoginReducer: (state) => {
            state.isLoggedIn = 2;
        },
        signUpReducer: (state, action) => {
            const { status, project } = action.payload;
            if (status === 1) { state.currentProject = project; }
            state.isSignedUp = status;
        },
        resetSignUpReducer: (state) => {
            state.isSignedUp = 2;
        },
        logOutReducer: (state) => {
            state.currentProject = {};
        }
    }
});
//////////////////////////////////////////

////////////////// actions //////////////////
export const {
    loginReducer,
    resetLoginReducer,
    signUpReducer,
    resetSignUpReducer,
    logOutReducer
} = projectSlice.actions;
////////////////////////////////////////////

////////////////// export //////////////////
export default projectSlice.reducer;
////////////////////////////////////////////