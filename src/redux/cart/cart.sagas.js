import { all, call, takeLatest, put } from "redux-saga/effects";

import { persistor } from "../store";

import UserActionTypes from "../user/user.types"; // we need user types to listen for the signOut to clear the cart
import { clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  persistor.pause(); // we pause the persistor before deleting the cart because we want to preserve the user cart in the local storage for each user
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
