import React from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
// 🔥 Sửa lại toàn bộ import Icon chính xác từ thư viện lucide-react
import { Calendar, Check, Circle, SquarePen, Trash2 } from 'lucide-react';

const TaskCard = ({ task, index }) => {
  const isLoading = false;
  
  // Đồng bộ trạng thái kiểm tra tránh gõ nhầm complete và completed
  const isCompleted = task?.status === "completed";

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
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            isCompleted
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {/* 🔥 BẮT BUỘC logic phải nằm trong dấu ngoặc nhọn này */}
          {isCompleted ? (
            <Check className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* Nội dung hiển thị hoặc chỉnh sửa nhiệm vụ */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <Input
              placeholder='Cần làm gì?'
              className="flex-1 h-10 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
            />
          ) : (
            <p className={cn(
              "text-base font-medium transition-all duration-200 break-words",
              isCompleted 
                ? "line-through text-muted-foreground/70" 
                : "text-slate-700"
            )}>
              {task?.title || "Nhiệm vụ không có tiêu đề"}
            </p>
          )}
          
          {/* Khu vực hiển thị ngày tạo và ngày hoàn thành */}
          <div className="flex flex-row items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>
                {task?.createdAt? new Date(task.createdAt).toLocaleString('vi-VN') : "Chưa rõ ngày tạo"}
              </span>
            </div>
            
            {task?.completedAt && (
              <div className="flex items-center gap-1 text-green-600">
                <span> - </span>
                <Calendar className="size-3" />
                <span>
                  {new Date(task.completedAt).toLocaleString('vi-VN')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Cụm nút bấm Hành động (Sửa / Xóa) - Hiện lên mượt mà khi hover chuột vào Card */}
        <div className="hidden gap-1 items-center group-hover:flex animate-slide-up shrink-0">
          <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-info hover:bg-info/10 rounded-lg transition-colors">
            <SquarePen className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            <Trash2 className="size-4" />
          </Button>
        </div>

      </div>
    </Card>
  )
}

export default TaskCard