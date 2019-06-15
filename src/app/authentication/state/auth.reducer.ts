import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.action';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
    auth: AuthState;
}
export interface AuthState {
    userId: string;
    token: string;
    currentUser;
    userList: Array<any>;
}

const initialState: AuthState = {
    userId: undefined,
    token: undefined,
    currentUser: undefined,
    userList: null
};
const getMessengerFeatureState = createFeatureSelector<AuthState>('auth');
export const getUserId = createSelector(
  getMessengerFeatureState,
  state => state.userId
);

export function authReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
      case AuthActionTypes.LoginSuccessful:
        return {
          ...state,
          userId: action.payload.userId,
          token: action.payload.access_token,
          currentUser: action.payload.user
        };
      case AuthActionTypes.Logout:
        return {
          ...state,
          userId: null,
          token: null,
          currentUser: null
        };
      case AuthActionTypes.GetCurrentUserSuccessful:
        return {
          ...state,
          currentUser: { ...action.payload }
        };
      case AuthActionTypes.SetUserList:
        return {
          ...state,
          userList: action.payload.userList
        };
    }
    return state;
}
