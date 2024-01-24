
import api from "../axios/axios";
import {UserId} from "../../service/interfaces/user";

export const fetchUserByToken = async () => {
        const response = await api.get('/user/me');
        return{status: response.status, data: response.data}
}
export const fetchUsers = async (page: number, limit: number) => {
        const response = await api.get(`/user/all?page=${page}&limit=${limit}`);
        return {status: response.status, data: response.data}
}
export const updateUserInfo= async (data: object) => {
        const response = await api.patch('/user/update', data);
        return{status: response.status, data: response.data}
    }
export const deleteUser= async () => {
        const response = await api.delete('/user/soft');
        return {status: response.status, data: response.data}
}

export const toggleUserBanStatus = async (userId: UserId, isBanned: boolean)=> {
        const response = await api.patch('/user/ban', {
            id: userId,
            isBanned,
        });
        return{status: response.status, data: response.data}
}
