// Types
export type AuthActions = 'AUTH' | 'AUTH_SUCCESS' | 'AUTH_FAIL';

export type AuthState = {
  errorMessage: string;
  isAuthenticated: boolean;
  loading: boolean;
  userName: string;
};

export const initialState = {
  errorMessage: '',
  isAuthenticated: Boolean(window.sessionStorage.getItem('ker_authenticated')),
  loading: false,
  userName: window.sessionStorage.getItem('ker_user') || '',
};

// Reducer
export function authReducer(
  state: AuthState = initialState,
  action: any
): AuthState {
  if (action.type === 'AUTH') {
    return { ...state, loading: true, errorMessage: '' };
  }

  if (action.type === 'AUTH_SUCCESS') {
    return {
      errorMessage: '',
      isAuthenticated: true,
      loading: false,
      userName: action.payload.userName,
    };
  }

  if (action.type === 'AUTH_FAIL') {
    return {
      errorMessage: action.payload,
      isAuthenticated: true,
      loading: false,
      userName: '',
    };
  }

  return state;
}

export function authAction(payload: any) {
  return { type: 'AUTH', payload };
}
