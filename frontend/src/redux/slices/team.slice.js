////////////////// Import dependencies //////////////////
import { createSlice } from "@reduxjs/toolkit";
////////////////////////////////////////////////////////

////////////////// Slice //////////////////
export const teamSlice = createSlice({
    name: "team",
    initialState: {
        currentTeam: {},
        isLoggedIn: 2, // 0 = failed login, 1 = successfully logged in, 2 = waiting for credentials to be entered
        isSignedUp: 2 // 0 = failed sign up, 1 = successfully signed up, 2 = waiting for credentials to be entered
    },
    reducers: {
        loginReducer: (state, action) => {
            const { status, team } = action.payload;
            if (status === 1) { state.currentTeam = team; }
            state.isLoggedIn = status;
        },
        resetLoginReducer: (state) => {
            state.isLoggedIn = 2;
        },
        signUpReducer: (state, action) => {
            const { status, team } = action.payload;
            if (status === 1) { state.currentTeam = team; }
            state.isSignedUp = status;
        },
        resetSignUpReducer: (state) => {
            state.isSignedUp = 2;
        }
    }
});
//////////////////////////////////////////

////////////////// actions //////////////////
export const {
    loginReducer,
    resetLoginReducer,
    signUpReducer,
    resetSignUpReducer
} = teamSlice.actions;
////////////////////////////////////////////

////////////////// export //////////////////
export default teamSlice.reducer;
////////////////////////////////////////////