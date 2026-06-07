import React from 'react'

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  const totalTasks = completedTasksCount + activeTasksCount;
  return (
    <>
      {totalTasks > 0 && (
        <div className="text-center py-4 animate-fade-in">
          <p className="text-sm text-slate-400 font-medium">
            
            {completedTasksCount > 0 && activeTasksCount > 0 && (
              <>
                Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} công việc, 
                còn {activeTasksCount} việc nữa thôi, cố lên (complete) nhé! 💪
              </>
            )}
            {completedTasksCount > 0 && activeTasksCount === 0 && (
              <>
                Xuất sắc! Bạn đã hoàn thành toàn bộ {completedTasksCount} công việc rồi! 🎉
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                Hãy bắt đầu thực hiện {activeTasksCount} nhiệm vụ đang chờ nào! 🚀
              </>
            )}
          </p>
        </div>
      )}
    </>
  )
}

export default Footer