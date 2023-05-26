export const authReducers = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, role },
  } = action;
  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
        role,
      };
    case 'SET_LOADING':
      return {
        ...state,
        authLoading: true,
        isAuthenticated,
        user,
        role,
      };
    case 'SET_STOP_LOAD':
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
        role,
      };
    default:
      return state;
  }
};
