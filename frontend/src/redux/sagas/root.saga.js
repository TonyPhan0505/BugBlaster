/////////////// Import dependencies ////////////////
import { all } from 'redux-saga/effects';

import {
    listenLogin,
    listenResetLogin,
    listenSignUp,
    listenResetSignUp,
    listenLogOut,
    listenVerifyAccessToken,
    listenResetVerifyAccessToken
} from "./project.saga";

import {
    listenFetchBulk as listenFetchBulkBugs,
    listenResetFetchBulk as listenResetFetchBulkBugs,
    listenCreate as listenCreateBug,
    listenResetCreate as listenResetCreateBug,
    listenUpdate as listenUpdateBug,
    listenResetUpdate as listenResetUpdateBug,
    listenDelete as listenDeleteBug,
    listenResetDelete as listenResetDeleteBug
} from "./bug.saga";

import {
    listenFetchBulk as listenFetchBulkUpdates,
    listenResetFetchBulk as listenResetFetchBulkUpdates,
    listenCreate as listenCreateUpdate,
    listenResetCreate as listenResetCreateUpdate,
    listenUpdate as listenUpdateUpdate,
    listenResetUpdate as listenResetUpdateUpdate,
    listenDelete as listenDeleteUpdate,
    listenResetDelete as listenResetDeleteUpdate
} from "./update.saga";
//////////////////////////////////////////////////

/////////////// Middleware ////////////////
export default function* rootSaga() {
    yield all([
        listenLogin(),
        listenResetLogin(),
        listenSignUp(),
        listenResetSignUp(),
        listenLogOut(),
        listenVerifyAccessToken(),
        listenResetVerifyAccessToken(),

        listenFetchBulkBugs(),
        listenResetFetchBulkBugs(),
        listenCreateBug(),
        listenResetCreateBug(),
        listenUpdateBug(),
        listenResetUpdateBug(),
        listenDeleteBug(),
        listenResetDeleteBug(),

        listenFetchBulkUpdates(),
        listenResetFetchBulkUpdates(),
        listenCreateUpdate(),
        listenResetCreateUpdate(),
        listenUpdateUpdate(),
        listenResetUpdateUpdate(),
        listenDeleteUpdate(),
        listenResetDeleteUpdate()
    ]);
}
//////////////////////////////////////////