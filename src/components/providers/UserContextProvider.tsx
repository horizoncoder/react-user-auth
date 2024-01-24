import {ReactNode, useState} from 'react';
import UserContext from "../../context/user-context";
import {IUser} from "../../service/interfaces/user";


const UserContextProvider = ({children}: {children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const updateUser = (value: IUser | null)  => {
        setUser(value);
    }
    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
