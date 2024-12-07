import express, { Request, Response } from "express";
import routes from "./routes/index.ts";

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("CNS ts express backend is available.");
});

// assign url
routes.forEach((e) => {
  app.use(e.addr, e.router);
});

app.listen(port);
