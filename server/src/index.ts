import "dotenv/config";
import express, { Application, Request, Response } from "express";
import apolloServer from "./DB/apolloServer.js";
import {expressMiddleware} from "@apollo/server/express4"
import cors from "cors"

const PORT = process.env.PORT || 3000; 
const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello from server",
  });
});

const startServer = async() =>{
  await apolloServer.start()
  app.use("/graphql",expressMiddleware(apolloServer))
}

startServer()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
