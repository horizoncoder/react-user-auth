import {FC, ReactNode} from 'react';
import {Navigate} from 'react-router-dom'
interface PrivateRouteProps {
    children: ReactNode;
    hasPermission: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children, hasPermission}) => {

    if(!hasPermission) {
        return <Navigate to={'/sign-in'}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;
