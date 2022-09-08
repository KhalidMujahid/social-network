import { io } from "socket.io-client";
import { host } from "../constant/baseURL";

export const socket = io(host);
