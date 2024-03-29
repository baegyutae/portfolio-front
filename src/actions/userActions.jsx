export const loginSucess = (userData) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: userData
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};