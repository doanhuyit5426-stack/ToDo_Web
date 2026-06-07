import React, { useState } from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar, Check, Circle, SquarePen, Trash2 } from 'lucide-react';
import { toast } from 'sonner'
import api from '@/lib/axios'

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isLoading, setIsLoading] = useState(false); 
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task?.title || "");
  const isCompleted = task?.status === "completed";

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Nhiệm vụ đã được xóa thành công.');
      if (handleTaskChanged) handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi xóa task", error);
      toast.error("Lỗi khi xóa task");
    }
  };
  const handleUpdateTitle = async () => {
    if (!updateTaskTitle.trim() || updateTaskTitle.trim() === task.title) {
      setIsLoading(false);
      setUpdateTaskTitle(task.title); // reset lại chữ cũ
      return;
    }

    try {
      await api.put(`/tasks/${task._id}`, { title: updateTaskTitle.trim() });
      toast.success("Cập nhật tiêu đề thành công!");
      setIsLoading(false);
      if (handleTaskChanged) handleTaskChanged(); // Load lại giao diện cha
    } catch (error) {
      console.error("Lỗi khi cập nhật tiêu đề", error);
      toast.error("Không thể cập nhật tiêu đề!");
    }
  };
  const toggelTaskCompleteButton = async () => {
    try {
      if(task.status === 'active'){
        await api.put(`/tasks/${task._id}`,{
          status:'completed',
          completedAt: new Date().toISOString(),
        });
      }
      else{
        await api.put(`/tasks/${task._id}`,{
          status:'active',
          completedAt: null,
        });
      }
      toast.success("Cập nhật trạng thái thành công");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái chô task",error);
      toast.error("Lỗi khi cập nhật trạng thái chô task");
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateTitle();
    }
    if (e.key === "Escape") {
      setIsLoading(false); // Tắt chế độ sửa
      setUpdateTaskTitle(task.title); // Hoàn tác lại chữ cũ
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        isCompleted && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        
        {/* Nút Check/Uncheck trạng thái công việc */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggelTaskCompleteButton}
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            isCompleted ? "text-success hover:text-success/80" : "text-muted-foreground hover:text-primary"
          )}
        >
          {isCompleted ? <Check className="size-5" /> : <Circle className="size-5" />}
        </Button>

        {/* Nội dung hiển thị hoặc ô sửa đổi */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <Input
              autoFocusclassName="flex-1 h-10 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-white"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)} // Sửa lỗi cú pháp e.target.value
              onKeyDown={handleKeyDown}
              onBlur={() => {setIsLoading(false);
                setUpdateTaskTitle(task.title);
              }}
            />
          ) : (
            <p className={cn(
              "text-base font-medium transition-all duration-200 break-words",
              isCompleted ? "line-through text-muted-foreground/70" : "text-slate-700"
            )}>
              {task?.title || "Nhiệm vụ không có tiêu đề"}
            </p>
          )}
          
          {/* Khu vực hiển thị ngày tháng */}
          <div className="flex flex-row items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>
                {task?.createdAt ? new Date(task.createdAt).toLocaleString('vi-VN') : "Chưa rõ ngày tạo"}
              </span>
            </div>
            {task?.completedAt && (
              <div className="flex items-center gap-1 text-green-600">
                <span> - </span>
                <Calendar className="size-3" />
                <span>{new Date(task.completedAt).toLocaleString('vi-VN')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cụm nút bấm Hành động */}
        <div className="hidden gap-1 items-center group-hover:flex animate-slide-up shrink-0">
          {/* Nút Bút Chì - Click vào mở chế độ sửa */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-8 text-muted-foreground hover:text-info hover:bg-info/10 rounded-lg transition-colors"
            onClick={() => {
              if(!isCompleted) { // Chỉ cho sửa nếu nhiệm vụ chưa hoàn thành
                setIsLoading(true);
              } else {
                toast.error("Nhiệm vụ đã hoàn thành không được chỉnh sửa!");
              }
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* Nút Thùng Rác */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
        </div>
    </Card>
  )
}

export default TaskCard;