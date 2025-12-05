import dotenv from "dotenv";
import express from "express";
import postsRoutes from "./src/Routes/postsRoutes.js";
import { db } from "./src/db/db.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoute from "./src/Routes/uploadRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = 3000;


app.use(express.json())
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use("/api/posts", postsRoutes);
app.use('/api/upload', uploadRoute);


db.connect().then(() => app.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
}));

