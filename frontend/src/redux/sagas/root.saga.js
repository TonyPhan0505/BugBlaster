/////////////// Import dependencies ////////////////
import { all } from 'redux-saga/effects';

import {
    listenLogin,
    listenResetLogin,
    listenSignUp,
    listenResetSignUp
} from "./team.saga";

import {
    listenFetchBulk as listenFetchBulkBugs,
    listenResetFetchBulk as listenResetFetchBulkBugs,
    listenFetch as listenFetchBug,
    listenResetFetch as listenResetFetchBug,
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
    listenFetch as listenFetchUpdate,
    listenResetFetch as listenResetFetchUpdate,
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

        listenFetchBulkBugs(),
        listenResetFetchBulkBugs(),
        listenFetchBug(),
        listenResetFetchBug(),
        listenCreateBug(),
        listenResetCreateBug(),
        listenUpdateBug(),
        listenResetUpdateBug(),
        listenDeleteBug(),
        listenResetDeleteBug(),

        listenFetchBulkUpdates(),
        listenResetFetchBulkUpdates(),
        listenFetchUpdate(),
        listenResetFetchUpdate(),
        listenCreateUpdate(),
        listenResetCreateUpdate(),
        listenUpdateUpdate(),
        listenResetUpdateUpdate(),
        listenDeleteUpdate(),
        listenResetDeleteUpdate()
    ]);
}
//////////////////////////////////////////