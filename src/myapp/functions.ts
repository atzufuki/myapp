import express from "express";

import { onRequest } from "@alexi/firebase/functions";
import { authentication } from "@alexi/firebase/middlewares";

const app = express();

app.use(authentication);

app.get("/users/current", async (req, res) => {
  res.send(req.user.serialize());
});

export const api = onRequest(
  {
    region: "europe-west3",
    cors: true,
  },
  app,
);
