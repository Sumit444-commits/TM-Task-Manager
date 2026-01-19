import express from "express";
import {
  addTask,
  getTasks,
  deleteTask,
  editTask,
} from "../controllers/task-controller.js";

const router = express.Router();

router.route("/:id").get(getTasks);

router.route("/add/:id").post(addTask);
router.route("/delete/:id").delete(deleteTask);
router.route("/edit/:id").patch(editTask);

export default router;
