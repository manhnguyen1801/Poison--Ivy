import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.action';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
    auth: AuthState;
}
export interface AuthState {
    username: string;
    token: string;
    currentUser;
}

const initialState: AuthState = {
    username: undefined,
    token: undefined,
    currentUser: undefined
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
      case AuthActionTypes.LoginSuccessful:
        return {
          ...state,
          username: action.payload.userName,
          token: action.payload.access_token,
        };
      case AuthActionTypes.Logout:
        return {
          ...state,
          username: null,
          token: null,
          currentUser: null
        };
      case AuthActionTypes.GetCurrentUserSuccessful:
        return {
          ...state,
          currentUser: { ...action.payload }
        };
    }
    return state;
}
