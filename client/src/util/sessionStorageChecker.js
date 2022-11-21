
export const checkSession = (expectedKey) => {
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    const key = sessionStorage.getItem('key');
    return !!(auth && key === expectedKey);

}