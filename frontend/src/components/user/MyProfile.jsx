import React, { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";

const MyProfile = ()=>{
    const {userInfo, setUserInfo} = useContext(UserContext)
    return(
        <>
            <h1>{userInfo.name}</h1>
            <h2>{userInfo.surname}</h2>
           <img src={userInfo.avatar}></img>
           <h3>{userInfo.role}</h3>
        </>
    )
}

export default MyProfile