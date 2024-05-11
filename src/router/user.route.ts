import express from "express";

import { getLightStatus,updateLightStatus } from "../controller/light.controller";
import { getTemp,createTemp } from "../controller/temp.controller";
import { getUsers,createUser,login,logout } from "../controller/users.controller";
import { extractToken } from "../middleware/isAuthenticated";


export default (router: express.Router) => {
    router.get("/users", extractToken,getUsers); 
    router.post("/create",createUser);
    router.post("/login",login);
    router.post("/logout",logout);
    router.get("/temp",getTemp);
    router.post("/temp/set",createTemp);
    router.get("/light",getLightStatus);
    router.post("/light/set",updateLightStatus);

    return router;
}
