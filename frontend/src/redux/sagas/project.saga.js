/////////////// Import dependencies ////////////////
import {
    login,
    signUp
} from "../../apis/project.api";

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
} from "../slices/project.slice";
///////////////////////////////////////////////////

/////////////// Middleware ////////////////
function* loginSaga(action) {
    const { 
        projectName, 
        password 
    } = action.payload;
    const res = yield login(
        projectName, 
        password
    );
    if (res && res.data.success) {
        const project = res.data.project;
        yield put(loginReducer({
            status: 1,
            project: project
        }));
        console.log("SUCCESS: Successfully logged in.");
    } else {
        yield put(loginReducer({
            status: 0,
            project: undefined
        }));
        console.error("ERROR: Failed to log in.");
    }
}

function* resetLoginSaga() {
    yield put(resetLoginReducer());
}

function* signUpSaga(action) {
    const {
        projectName,
        emailAddress,
        password
    } = action.payload;
    const res = yield signUp(
        projectName,
        emailAddress,
        password
    );
    if (res && res.data.success) {
        if (res.data.valid) {
            const project = res.data.project;
            yield put(signUpReducer({
                status: 1,
                project: project
            }));
            console.log("SUCCESS: Successfully signed up.");
        } else {
            yield put(signUpReducer({
                status: 3,
                project: undefined
            }));
            console.log("Project name was already taken.");
        }
    } else {
        yield put(signUpReducer({
            status: 0,
            project: undefined
        }));
        console.error("ERROR: Failed to sign up.");
    }
}

function* resetSignUpSaga() {
    yield put(resetSignUpReducer());
}

function* logOutSaga() {
    localStorage.removeItem("accessToken");
    yield put(logOutReducer());
}
//////////////////////////////////////////

/////////////// Listeners ////////////////
export function* listenLogin() {
    yield takeEvery("project/login", loginSaga);
}

export function* listenResetLogin() {
    yield takeEvery("project/reset_login", resetLoginSaga);
}

export function* listenSignUp() {
    yield takeEvery("project/sign_up", signUpSaga);
}

export function* listenResetSignUp() {
    yield takeEvery("project/reset_sign_up", resetSignUpSaga);
}

export function* listenLogOut() {
    yield takeEvery("project/logout", logOutSaga);
}
/////////////////////////////////////////