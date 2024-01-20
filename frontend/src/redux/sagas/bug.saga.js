/////////////// Import dependencies ////////////////
import {
    getBulk,
    get,
    create,
    update,
    deleteBug
} from "../../apis/bug.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
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
} from "../slices/bug.slice";
///////////////////////////////////////////////////

/////////////// Middleware ////////////////
function* fetchBulkSaga(action) {
    const teamId = action.payload;
    const res = yield getBulk(teamId);
    if (res && res.data.success) {
        const bugs = res.data.bugs;
        yield put(fetchBulkReducer({
            status: 1,
            bugs: bugs
        }));
        console.log("SUCCESS: Successfully fetched bulk bugs.");
    } else {
        yield put(fetchBulkReducer({
            status: 0,
            bugs: undefined
        }));
        console.error("ERROR: Failed to fetch bulk bugs.");
    }
}

function* resetFetchBulkSaga() {
    yield put(resetFetchBulkReducer());
}

function* fetchSaga(action) {
    const bugId = action.payload;
    const res = yield get(bugId);
    if (res && res.data.success) {
        const bug = res.data.bug;
        yield put(fetchReducer({
            status: 1,
            bug: bug
        }));
        console.log("SUCCESS: Successfully fetched bug.");
    } else {
        yield put(fetchReducer({
            status: 1,
            bug: undefined
        }));
        console.error("ERROR: Failed to fetch bug.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* createSaga(action) {
    const bug = action.payload;
    const res = yield create(bug);
    if (res && res.data.success) {
        const bug = res.data.bug;
        yield put(createReducer({
            status: 1,
            bug: bug
        }));
        console.log("SUCCESS: Successfully fetched bug.");
    } else {
        yield put(createReducer({
            status: 0,
            bug: undefined
        }));
        console.error("ERROR: Failed to create bug.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* updateSaga(action) {
    const bug = action.payload;
    const res = yield update(bug);
    if (res && res.data.success) {
        const bug = res.data.bug;
        yield put(updateReducer({
            status: 1,
            bug: bug
        }));
        console.log("SUCCESS: Successfully updated bug.");
    } else {
        yield put(updateReducer({
            status: 0,
            bug: undefined
        }));
        console.error("ERROR: Failed to update bug.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* deleteSaga(action) {
    const bugId = action.payload;
    const res = yield deleteBug(bugId);
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            bugId: bugId
        }));
        console.log("SUCCESS: Successfully deleted bug.");
    } else {
        yield put(deleteReducer({
            status: 0,
            bugId: undefined
        }));
        console.error("ERROR: Failed to delete bug.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}
//////////////////////////////////////////

/////////////// Listeners ////////////////
export function* listenFetchBulk() {
    yield takeEvery("bug/fetch_bulk", fetchBulkSaga);
}

export function* listenResetFetchBulk() {
    yield takeEvery("bug/reset_fetch_bulk", resetFetchBulkSaga);
}

export function* listenFetch() {
    yield takeEvery("bug/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("bug/reset_fetch", resetFetchSaga);
}

export function* listenCreate() {
    yield takeEvery("bug/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("bug/reset_create", resetCreateSaga);
}

export function* listenUpdate() {
    yield takeEvery("bug/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("bug/reset_update", resetUpdateSaga);
}

export function* listenDelete() {
    yield takeEvery("bug/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("bug/reset_delete", resetDeleteSaga);
}
/////////////////////////////////////////