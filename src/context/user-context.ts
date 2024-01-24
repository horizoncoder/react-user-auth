import { createContext } from "react";
import { IUser } from "../service/interfaces/user";

interface UserContextValue {
    user: IUser | null;
    updateUser: (value: IUser | null) => void;
}

const defaultUserContextValue: UserContextValue = {
    user: null,
    updateUser: () => {},
};

const UserContext = createContext<UserContextValue>(defaultUserContextValue);

export default UserContext;
