export const setAuthToken = (token) => ({
  type: 'SET_AUTH_TOKEN',
  payload: token,
});

export const setUserData = (firstName, lastName) => ({
  type: 'SET_USER_DATA',
  payload: { firstName, lastName },
});

export const setUserName = (userName) => ({
  type: 'SET_USER_NAME',
  payload: userName,
});

export const logout = () => ({
  type: 'LOGOUT',
});

const authReducer = (state = { authToken: null, userName: null }, action) => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return { ...state, authToken: action.payload };
    case 'SET_USER_DATA':
      return { ...state, firstName: action.payload.firstName, lastName: action.payload.lastName };
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'LOGOUT':
      return { authToken: null, userName: null, firstName:null, lastName:null };
    default:
      return state;
  }
};

export default authReducer;