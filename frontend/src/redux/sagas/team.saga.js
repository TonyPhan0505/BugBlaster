/////////////// Import dependencies ////////////////
import {
    login,
    signUp
} from "../../apis/team.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    loginReducer,
    resetLoginReducer,
    signUpReducer,
    resetSignUpReducer,
    logOutReducer
} from "../slices/team.slice";
///////////////////////////////////////////////////

/////////////// Middleware ////////////////
function* loginSaga(action) {
    const { 
        emailAddress, 
        password 
    } = action.payload;
    const res = yield login(
        emailAddress, 
        password
    );
    if (res && res.data.success) {
        const team = res.data.team;
        yield put(loginReducer({
            status: 1,
            team: team
        }));
        console.log("SUCCESS: Successfully logged in.");
    } else {
        yield put(loginReducer({
            status: 0,
            team: undefined
        }));
        console.error("ERROR: Failed to log in.");
    }
}

function* resetLoginSaga() {
    yield put(resetLoginReducer());
}

function* signUpSaga(action) {
    const {
        teamId,
        emailAddress,
        name,
        password
    } = action.payload;
    const res = yield signUp(
        teamId,
        emailAddress,
        name,
        password
    );
    if (res && res.data.success) {
        const team = res.data.team;
        yield put(signUpReducer({
            status: 1,
            team: team
        }));
        console.log("SUCCESS: Successfully signed up.");
    } else {
        yield put(signUpReducer({
            status: 0,
            team: undefined
        }));
        console.error("ERROR: Failed to sign up.");
    }
}

function* resetSignUpSaga() {
    yield put(resetSignUpReducer());
}

function* logOutSaga() {
    yield put(logOutReducer());
}
//////////////////////////////////////////

/////////////// Listeners ////////////////
export function* listenLogin() {
    yield takeEvery("team/login", loginSaga);
}

export function* listenResetLogin() {
    yield takeEvery("team/reset_login", resetLoginSaga);
}

export function* listenSignUp() {
    yield takeEvery("team/sign_up", signUpSaga);
}

export function* listenResetSignUp() {
    yield takeEvery("team/reset_sign_up", resetSignUpSaga);
}

export function* listenLogOut() {
    yield takeEvery("team/logout", logOutSaga);
}
/////////////////////////////////////////