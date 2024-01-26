/////////////// Import dependencies ////////////////
import {
    getBulk,
    create,
    update,
    deleteUpdate
} from "../../apis/update.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    fetchBulkReducer,
    resetFetchBulkReducer,
    createReducer,
    resetCreateReducer,
    updateReducer,
    resetUpdateReducer,
    deleteReducer,
    resetDeleteReducer
} from "../slices/update.slice";
///////////////////////////////////////////////////

/////////////// Middleware ////////////////
function* fetchBulkSaga(action) {
    const bugId = action.payload;
    const res = yield getBulk(bugId);
    if (res && res.data.success) {
        const updates = res.data.updates;
        yield put(fetchBulkReducer({
            status: 1,
            updates: updates
        }));
        console.log("SUCCESS: Successfully fetched bulk updates.");
    } else {
        yield put(fetchBulkReducer({
            status: 0,
            updates: undefined
        }));
        console.error("ERROR: Failed to fetch bulk updates.");
    }
}

function* resetFetchBulkSaga() {
    yield put(resetFetchBulkReducer());
}

function* createSaga(action) {
    const update = action.payload;
    const res = yield create(update);
    if (res && res.data.success) {
        const update = res.data.update;
        yield put(createReducer({
            status: 1,
            update: update
        }));
        console.log("SUCCESS: Successfully fetched update.");
    } else {
        yield put(createReducer({
            status: 0,
            update: undefined
        }));
        console.error("ERROR: Failed to create update.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* updateSaga(action) {
    const {
        updateId,
        details,
        location
    } = action.payload;
    const res = yield update(
        updateId,
        details,
        location
    );
    if (res && res.data.success) {
        const update = res.data.update;
        yield put(updateReducer({
            status: 1,
            update: update
        }));
        console.log("SUCCESS: Successfully updated update.");
    } else {
        yield put(updateReducer({
            status: 0,
            update: undefined
        }));
        console.error("ERROR: Failed to update update.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* deleteSaga(action) {
    const updateId = action.payload;
    const res = yield deleteUpdate(updateId);
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            updateId: updateId
        }));
        console.log("SUCCESS: Successfully deleted update.");
    } else {
        yield put(deleteReducer({
            status: 0,
            updateId: undefined
        }));
        console.error("ERROR: Failed to delete update.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}
//////////////////////////////////////////

/////////////// Listeners ////////////////
export function* listenFetchBulk() {
    yield takeEvery("update/fetch_bulk", fetchBulkSaga);
}

export function* listenResetFetchBulk() {
    yield takeEvery("update/reset_fetch_bulk", resetFetchBulkSaga);
}

export function* listenCreate() {
    yield takeEvery("update/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("update/reset_create", resetCreateSaga);
}

export function* listenUpdate() {
    yield takeEvery("update/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("update/reset_update", resetUpdateSaga);
}

export function* listenDelete() {
    yield takeEvery("update/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("update/reset_delete", resetDeleteSaga);
}
/////////////////////////////////////////