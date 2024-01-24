import api from "../axios/axios";


export const fetchSignIn = async (email: string, password: string) => {
        const response = await api.post('/auth/sign-in', {
            email,
            password
        }, {
            validateStatus: status => status >= 200 && status < 300
        });
        return {status: response.status, data: response.data};

}


export interface fetchSignUpArgs {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export const fetchSignUp = async (data: fetchSignUpArgs) => {
        const response = await api.post('/auth/sign-up', data);
        return {status: response.status, data: response.data};
}
export const logOut = async () => {
    try {
        const response = await api.post('/auth/logOut');
        return {status: response.status, data: response.data};
    } catch (error: any) {
        return {status: error.response.status, message: error.response.data.message};
    }
}
