import React, { useState, useEffect } from "react";
import _ from 'lodash';

const UserContext = React.createContext({ name: '', auth: false });

const UserProvider  = ({ children }) => {


    const userDefault = {
        account: {},
        isAuthenticated: false,
        permission: "guest"
    }

    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(userDefault);

    // moi lan refresh lai trang => user bi mat => lay len tu localstorage
    // UserContext được tiêm vào App ==> luôn được gọi đầu tiên mỗi khi refresh
    // => useEffect gọi 1 lần ==> setUser, tránh vòng lặp vô hạn
    useEffect(() => {
        let local = localStorage.getItem('user');
        if(local) {
            setUser(JSON.parse(local));
        }
      }, [])

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser(userData);
        console.log("check in context: " , user)
    };

    // Logout updates the user data to default
    const logoutContext = (userData) => {
        setUser({...userDefault});
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext,}}>
            {children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };