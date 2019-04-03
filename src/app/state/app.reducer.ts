import { createFeatureSelector, createSelector, Action } from '@ngrx/store';
import { AuthActionTypes } from '../authentication/state/auth.action';

export interface PayLoadAction extends Action {
    payload: any;
}

export interface AppState {
    currentState: string;
    loginErrorMessage: string;
    showSpinner: boolean;
    showForgotPasswordSpinner: boolean;
    forgotPasswordErrorMessage: string;
}
const initialState: AppState = {
    currentState: 'Login',
    loginErrorMessage: undefined,
    showSpinner: false,
    showForgotPasswordSpinner: false,
    forgotPasswordErrorMessage: undefined
};

export function AppReducer(state = initialState, action: PayLoadAction) {
    switch (action.type) {
        case AuthActionTypes.ForgotPassword:
            return {
                ...state,
                showForgotPasswordSpinner: true,
                forgotPasswordErrorMessage: undefined,
            };
    }
    return state;
}
