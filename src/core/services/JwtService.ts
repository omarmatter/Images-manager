const ID_TOKEN_KEY = "id_token" as string;
const USER = "user" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};
export const getUser = (): any => {
    return window.localStorage.getItem(USER)
};
/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};
export const saveUser = (user) : void => {
    window.localStorage.setItem(USER, JSON.stringify(user));
};
/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};
export const destroyUser = (): void => {
    window.localStorage.removeItem(USER);
};
export default { getToken, saveToken, destroyToken,getUser , saveUser , destroyUser };
