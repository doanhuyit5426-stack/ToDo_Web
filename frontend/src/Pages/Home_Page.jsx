import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TaskList from '../components/TaskList'
import StatsAndFilter from '../components/StatsAndFilter'
import AddTask from '../components/AddTask'
import TaskListPagination from '../components/TaskListPagination'
import DateTimeFilter from '../components/DateTimeFilter'
import Footer from '../components/Footer'
import { toast } from 'sonner'
import axios from 'axios'

const Home_Page = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeTaskCount,setActiveTaskCount] = useState([0]);
  const [completeTaskCount,setCompleteTaskCount] = useState([0]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tasks");
      setTaskBuffer(res.data.tasks || []);
      setActiveTaskCount(res.data.activeCount || 0); 
    setCompleteTaskCount(res.data.completeCount || 0);
    } catch (error) {
      console.error("Lỗi khi truy suất task", error);
      toast.error("Không thể kết nối đến máy chủ API!"); 
    }
  };
  const completedTasksCount = taskBuffer.filter(t => t.status === "completed").length;
  const activeTasksCount = taskBuffer.filter(t => t.status === "active").length;
  const filteredTasks = taskBuffer.filter(task => {
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-background pt-8">
      <div className="container mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          
          {/* Header */}
          <Header />
          
          {/* Khu vực thêm Task (Truyền thêm hàm fetchTasks để sau khi thêm xong tự động load lại danh sách) */}
          <AddTask onTaskAdded={fetchTasks} />
          
          {/* Thống kê & Bộ lọc (Truyền data thật từ API vào) */}
          <StatsAndFilter 
            completedTasksCount={completeTaskCount}
            activeTasksCount={activeTaskCount}
            filter ={filter}
            setFilter={setFilter}
          />
          
          {/* Danh sách công việc (Truyền mảng tasks đã được lọc động) */}
          <TaskList filteredTasks={filteredTasks} filter={filter}/>
          
          {/* Phân trang & Ngày tháng */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          
          {/* Footer (Truyền số lượng thật để hiển thị câu cổ vũ thông minh) */}
          <Footer 
            completedTasksCount={completedTasksCount}
            activeTasksCount={activeTasksCount}
          />

        </div>
      </div>
    </div>
  )
}

export default Home_Page