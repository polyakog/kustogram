import { useAppDispatch } from "common/hooks";
import { appActions } from "./app-reducer";
import { useMeQuery } from "./api/auth/authApi";


export const InitializeApp = () =>  {
const dispatch= useAppDispatch()
    const { data: user } = useMeQuery();
    if (!!user) {
        dispatch(appActions.setIsAppInitialized({isAppInitialized: true}));
    }
        
    }