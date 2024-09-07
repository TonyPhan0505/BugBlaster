////////////////// Import dependencies //////////////////
import { createSlice } from "@reduxjs/toolkit";
////////////////////////////////////////////////////////

////////////////// Slice //////////////////
export const projectSlice = createSlice({
    name: "project",
    initialState: {
        currentProject: {},
        isLoggedIn: 2, // 0 = failed login, 1 = successfully logged in, 2 = waiting for credentials to be entered
        isSignedUp: 2, // 0 = failed sign up, 1 = successfully signed up, 2 = waiting for credentials to be entered, 3 = invalid project name, 4 = unregistered email address
        hasVerifiedAccessToken: 2, // 0 = failed to verify, 1 = successfully verified, 2 = waiting
        validAccessToken: false
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
            if (status === 1) { 
                state.currentProject = project; 
                state.isLoggedIn = 1;
            }
            state.isSignedUp = status;
        },
        resetSignUpReducer: (state) => {
            state.isSignedUp = 2;
        },
        logOutReducer: (state) => {
            state.isLoggedIn = 2;
            state.currentProject = {};
        },
        verifyAccessTokenReducer: (state, action) => {
            const { status, valid } = action.payload;
            if (status === 1) { state.validAccessToken = valid; }
            state.hasVerifiedAccessToken = status;
        },
        resetVerifyAccessTokenReducer: (state) => {
            state.hasVerifiedAccessToken = 2;
            state.validAccessToken = false;
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
    logOutReducer,
    verifyAccessTokenReducer,
    resetVerifyAccessTokenReducer
} = projectSlice.actions;
////////////////////////////////////////////

////////////////// export //////////////////
export default projectSlice.reducer;
////////////////////////////////////////////