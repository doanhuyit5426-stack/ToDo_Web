import Task from '../models/Task.js';

export const getTasks =async (req, res) => {
    try{
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks : [{$sort: {createdAt:-1}}],
                    activeCount: [{$match:{status:"active"}},{$count:"count"}],
                    completeCount: [{$match:{status:"complete"}},{$count:"count"}],
                }
            }
        ])
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count||0;
        const completeCount = result[0].completeCount[0]?.count||0;
        res.status(200).json({
            tasks,
            activeCount,
            completeCount
        });
    }
    catch(error){
        res.status(500).json({ message: "Error retrieving tasks" });
    }
    
};

export const createTask =async (req, res) => {
    try {
        const title = req.body.title;
        const newTask = new Task({ title });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { title, status, completedAt }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
};

export const deleteTask =async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Không tìm thấy task để xóa" });
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }

};