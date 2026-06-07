import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskControllers.js';

const route = express.Router();

route.get("/", getTasks);
route.post("/", createTask);
route.put("/:id", updateTask);
route.delete("/:id", deleteTask);

export default route;