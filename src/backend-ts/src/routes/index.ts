import { Router } from "express";
import { default as authRouter } from "./auth/controller";
import {default as chatRoomRouter} from "./chatroom/controller"
import {default as splitRouter} from "./split/controller"


type RouteProps = {
  addr: string;
  router: Router;
};

// Integration of routers
const routes: RouteProps[] = [
  { addr: "/auth", router: authRouter }, 
  { addr: "/split", router:splitRouter},
  { addr: "/chatroom", router:chatRoomRouter}
];

export default routes;
