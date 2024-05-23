import { Elysia } from "elysia";
import { Logestic } from "logestic";

import swagger from "@elysiajs/swagger";

import { app as health } from "./routes/health";
import { app as user } from "./routes/user";
//

const app = new Elysia()
  .onError(({ error }) => {
    console.error({ error });
    return {
      message: error.message,
      time: new Date().toISOString(),
    };
  })
  .get("/favicon.ico", () => {
    return "No Icon Found!";
  })
  .get("/", () => {
    return {
      message: "API is ok!",
      time: new Date().toISOString(),
      version: Bun.version,
    };
  })
  .use(swagger())
  .use(Logestic.preset("fancy"))
  .use(health)
  .use(user)
  .listen(3500);

console.log(`🦊 Elysia is ON! ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
