"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const light_controller_1 = require("../controller/light.controller");
const temp_controller_1 = require("../controller/temp.controller");
const users_controller_1 = require("../controller/users.controller");
const isAuthenticated_1 = require("../middleware/isAuthenticated");
exports.default = (router) => {
    router.get("/users", isAuthenticated_1.extractToken, users_controller_1.getUsers);
    router.post("/create", users_controller_1.createUser);
    router.post("/login", users_controller_1.login);
    router.post("/logout", users_controller_1.logout);
    router.get("/temp", temp_controller_1.getTemp);
    router.post("/temp/set", temp_controller_1.createTemp);
    router.get("/light", light_controller_1.getLightStatus);
    router.post("/light/set", light_controller_1.updateLightStatus);
    return router;
};
//# sourceMappingURL=user.route.js.map