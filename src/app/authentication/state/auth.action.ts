import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LoginPage = '[Auth] Login Page',
    Login = '[Auth] Login',
    LoginSuccessful = '[Auth] Login Successful',
    LoginFail = '[Auth] Login Fail',
    Logout = '[Auth] Logout',
    ForgotPasswordPage = '[Auth] Forgot Password Page',
    ForgotPassword = '[Auth] Forgot Password',
    ForgotPasswordSuccessful = '[Auth] Forgot Password Successful',
    ForgotPasswordFail = '[Auth] Forgot Password Fail',
    GetCurrentUser = '[Auth] Get Current User',
    GetCurrentUserSuccessful = '[Auth] Get Current User Successful',
    GetCurrentUserFail = '[Auth] Get Current User Fail',
    SetUserList = '[Auth] Set User List',
}

export class LoginPage implements Action {
    readonly type = AuthActionTypes.LoginPage;
}
export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: any) { }
}
export class LoginSuccessful implements Action {
    readonly type = AuthActionTypes.LoginSuccessful;
    constructor(public payload: any) { }
}
export class LoginFail implements Action {
    readonly type = AuthActionTypes.LoginFail;
    constructor(public payload: any) { }
}
export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}
export class ForgotPasswordPage implements Action {
    readonly type = AuthActionTypes.ForgotPasswordPage;
}
export class ForgotPassword implements Action {
    readonly type = AuthActionTypes.ForgotPassword;
    constructor(public payload: any) { }
}
export class ForgotPasswordSuccessful implements Action {
    readonly type = AuthActionTypes.ForgotPasswordSuccessful;
    constructor(public payload: any) { }
}
export class ForgotPasswordFail implements Action {
    readonly type = AuthActionTypes.ForgotPasswordFail;
    constructor(public payload: any) { }
}
export class GetCurrentUser implements Action {
    readonly type = AuthActionTypes.GetCurrentUser;
}
export class GetCurrentUserSuccessful implements Action {
    readonly type = AuthActionTypes.GetCurrentUserSuccessful;
    constructor(public payload: any) { }
}
export class GetCurrentUserFail implements Action {
    readonly type = AuthActionTypes.GetCurrentUserFail;
    constructor(public payload: any) { }
}

export class SetUserList implements Action {
    readonly type = AuthActionTypes.SetUserList;
    constructor(public payload: any) { }
}

export type AuthActions = LoginPage
    | LoginSuccessful
    | LoginFail
    | Logout
    | ForgotPasswordPage
    | ForgotPassword
    | ForgotPasswordSuccessful
    | ForgotPasswordFail
    | GetCurrentUser
    | GetCurrentUserSuccessful
    | GetCurrentUserFail
    | SetUserList;
