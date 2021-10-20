import axios from "axios";
import { Photo } from "../types/photo";
import { User } from "../types/users";

export const getUsers = async (): Promise<User[]> => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const resp = await axios.get(url);
        if (resp.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data: User[] = await resp.data as User[];
        return data;
    } catch (err) {
        throw err;
    }
};

export const getPhotos = async (): Promise<Photo[]> => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/photos';
        const resp = await axios.get(url);
        if (resp.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data: Photo[] = await resp.data as Photo[];
        return data;
    } catch (err) {
        throw err;
    }
};