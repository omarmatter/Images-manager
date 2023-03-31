import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
    name: string;
    email: string;
    password: string;
    token: string;
}

export interface UserAuthInfo {
    errors: unknown;
    user: User;
    isAuthenticated: boolean;
}

export default class AuthService implements UserAuthInfo {
    errors = {};
    user = {} as User;
    isAuthenticated = !!JwtService.getToken();

    /**
     * Get current user object
     * @returns User
     */
    get currentUser(): User {
        return this.user;
    }

    /**
     * Verify user authentication
     * @returns boolean
     */
    get isUserAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    DataUser(user){

        window.localStorage.setItem('UserInfo', JSON.stringify(user.user));
    };

    /**
     * Get authentification errors
     * @returns array
     */
    get getErrors() {
        return this.errors;
    }


    SetAuth(user) {
        this.isAuthenticated = true;
        this.user = user.data;
        this.errors = [];
        JwtService.saveToken(this.user.token);
        this.DataUser(this.user)
        return user;
    }

    SetUser(user) {
        this.user = user;
    }

    SetPassword(password) {
        this.user.password = password;
    }

    SetPURGE_AUTH() {
        this.isAuthenticated = false;
        this.user = {} as User;
        this.errors = [];
        JwtService.destroyToken();
    }

    async login(url,params) {

        return await ApiService.post(url, params)
            .then(({data}) => {
                return this.SetAuth(data)

            })
            .catch(({response}) => {
                return response;
            });
    }

    logout() {
        this.SetPURGE_AUTH()
    }

    register(credentials) {
        return ApiService.post("register", credentials)
            .then(({data}) => {
                this.SetAuth(data)
            })
            .catch(({response}) => {
                return response
            });
    }

    // @Action
    // [Actions.FORGOT_PASSWORD](payload) {
    //     const params = {
    //         params: {
    //             ...payload,
    //         },
    //     };
    //     return ApiService.query("forgot_password", params)
    //         .then(({ data }) => {
    //             this.context.commit(Mutations.SET_AUTH, data);
    //         })
    //         .catch(({ response }) => {
    //             this.context.commit(Mutations.SET_ERROR, response.data.errors);
    //         });
    // }
    //
    // @Action
    // [Actions.VERIFY_AUTH]() {
    //     if (JwtService.getToken()) {
    //         ApiService.setHeader();
    //         const params = {
    //             params: {
    //                 api_token: JwtService.getToken(),
    //             },
    //         };
    //         ApiService.query("verify_token", params as AxiosRequestConfig)
    //             .then(({ data }) => {
    //                 this.context.commit(Mutations.SET_AUTH, data);
    //             })
    //             .catch(({ response }) => {
    //                 this.context.commit(Mutations.SET_ERROR, response.data.errors);
    //                 this.context.commit(Mutations.PURGE_AUTH);
    //             });
    //     } else {
    //         this.context.commit(Mutations.PURGE_AUTH);
    //     }
    // }

    // @Action
    // [Actions.UPDATE_USER](payload) {
    //   ApiService.setHeader();
    //   return new Promise<void>((resolve, reject) => {
    //     ApiService.post("update_user", payload)
    //       .then(({ data }) => {
    //         this.context.commit(Mutations.SET_USER, data);
    //         resolve();
    //       })
    //       .catch(({ response }) => {
    //         this.context.commit(Mutations.SET_ERROR, response.data.errors);
    //         reject();
    //       });
    //   });
    // }
}

