import { User } from '../user.model';
import { AuthActions, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAIL, LOGIN_START, LOGOUT, SIGNUP_START, CLEAR_ERROR } from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state: State = initialState, action: AuthActions) {
    switch (action.type) {
        case LOGIN_START:
        case SIGNUP_START:
            return { ...state, authError: null, loading: true };

        case AUTHENTICATION_SUCCESS:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return { ...state, authError: null, user: user, loading: false };

        case AUTHENTICATION_FAIL:
            return { ...state, authError: action.payload, user: null, loading: false };

        case CLEAR_ERROR:
            return { ...state, authError: null };

        case LOGOUT:
            return { ...state, user: null };

        default:
            return state;
    }
}
