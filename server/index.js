import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generateId } from "./utils/generate_Ids.js";
import path from "path";
import { getPath } from "./utils/getPath.js";

const app = express();
app.use(cors())
app.use(express.json());

// POSTMAN
app.post("/deploy", async (req, res) => {
    
    //receive url
    const repoUrl = req.body.repoUrl;
    console.log("Received repo URL:", repoUrl);
    
    //clone repo
    const git = simpleGit();
    const id = generateId();
    await git.clone(repoUrl, `./repos/${id}`);
    
    

    //get all paths of folder and files inside a directory repos/${id}   recursively
    const dirPath = path.join(process.cwd(), `repos/${id}`);
    console.log(dirPath)
    const allPaths = getPath(dirPath);
    console.log("All paths in the cloned repository:", allPaths);

    //send all paths as response
    res.json({ paths: allPaths, id});

});

app.listen(3000);