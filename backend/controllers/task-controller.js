import { Task } from "../models/task-model.js";
import { User } from "../models/user-model.js";

const addTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const { title, description, status, due, priority } = req.body;
    await Task.create({
      userId,
      title,
      description,
      status,
      due,
      priority,
    });
    res.status(200).json({ message: "Task add successfully" });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, due, priority } = req.body;
    await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          title: title,
          description: description,
          status: status,
          due: due,
          priority: priority,
        },
      }
    );
    res.status(200).json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
const getTasks = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json("User not found");
    }
    const tasks = await Task.find({ userId: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
export { getTasks, addTask, deleteTask, editTask };
