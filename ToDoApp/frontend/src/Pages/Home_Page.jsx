import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TaskList from '../components/TaskList'
import StatsAndFilter from '../components/StatsAndFilter'
import AddTask from '../components/AddTask'
import TaskListPagination from '../components/TaskListPagination'
import DateTimeFilter from '../components/DateTimeFilter'
import Footer from '../components/Footer'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLisk } from '@/lib/data'

const Home_Page = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteCount] = useState(0);
  const [dateFilter, setDateFilter] = useState("all");
  const [page , setPage] = useState(1); 

  useEffect(() => {
    setPage(1);
  }, [dateFilter, filter]);

  useEffect(() => {
    fetchTasks();
  }, [dateFilter]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: { dateRange: dateFilter }
      });
      setTaskBuffer(res.data.tasks || []);
      setActiveTaskCount(res.data.activeCount || 0); 
      setCompleteCount(res.data.completeCount || 0);
    } catch (error) {
      console.error("Lỗi khi truy suất task", error);
      toast.error("Không thể kết nối đến máy chủ API!"); 
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  }

  const completedTasksCount = taskBuffer.filter(t => t.status === "completed").length;
  const activeTasksCount = taskBuffer.filter(t => t.status === "active").length;
  const filteredTasks = taskBuffer.filter(task => {
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "completed";
    return true;
  });
  const itemsPerPage = Number(visibleTaskLisk) || 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleTasks = filteredTasks.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const handleNext = () => {
    if (page < totalPages){
      setPage((prev) => prev + 1);
    }
  }
  const handlePrev = () => {
    if (page > 1){
      setPage((prev) => prev - 1);
    }
  }
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-background pt-8">
      <div className="container mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          
          {/* Header */}
          <Header />
          
          {/* Khu vực thêm Task */}
          <AddTask handleNewTask={handleTaskChanged} />
          
          {/* Thống kê & Bộ lọc */}
          <StatsAndFilter 
            completedTasksCount={completeTaskCount}
            activeTasksCount={activeTaskCount}
            filter={filter}
            setFilter={setFilter}
          />
          
          {/* Danh sách công việc */}
          <TaskList 
            filteredTasks={visibleTasks} 
            filter={filter} 
            handleTaskChanged={handleTaskChanged}
          />
          
          {/* Phân trang & Ngày tháng */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination 
              handleNext={handleNext} 
              handlePrev={handlePrev} 
              handlePageChange={handlePageChange} 
              page={page} 
              totalPages={totalPages}
            />
            <DateTimeFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />          
          </div>
          
          {/* Footer */}
          <Footer 
            completedTasksCount={completedTasksCount}
            activeTasksCount={activeTasksCount}
          />

        </div>
      </div>
    </div>
  )
}

export default Home_Page;