import Task from '../models/Task.js';

export const getTasks =async (req, res) => {
    try {
        const { dateRange } = req.query;
        let matchCondition = {}; 
        if (dateRange && dateRange !== 'all') {
            const now = new Date();
            let startOfDate;

            if (dateRange === 'today') {
                startOfDate = new Date(now.setHours(0, 0, 0, 0));
            } else if (dateRange === 'week') {
                const day = now.getDay();
                const diff = now.getDate() - day + (day === 0 ? -6 : 1);
                startOfDate = new Date(now.setDate(diff));
                startOfDate.setHours(0, 0, 0, 0);
            } else if (dateRange === 'month') {
                startOfDate = new Date(now.getFullYear(), now.getMonth(), 1);
            }
            if (startOfDate) {
                matchCondition.createdAt = { $gte: startOfDate };
            }
        }
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [
                        { $match: matchCondition }, 
                        { $sort: { createdAt: -1 } }
                    ],
                    activeCount: [
                        { $match: { ...matchCondition, status: "active" } },
                        { $count: "count" }
                    ],
                    completeCount: [
                        { $match: { ...matchCondition, status: "completed" } },
                        { $count: "count" }
                    ],
                }
            }
        ]);
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
        const updatedTask = await Task.findByIdAndUpdate(id, { title, status, completedAt }, { returnDocument: 'after' });
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