import React from 'react'
import TaskCard from './TaskCard';
import { Card } from './ui/card';
import { Circle } from 'lucide-react';

const TaskEmptyState = ({ filter }) => {
    return(
        <Card className="p-8 text-center boder-0 bg-gradient-card shadow-custom-md">
            <div className="flex flex-col items-center justify-center space-y-3">
                <Circle ClassName="mx-auto size-12 text-muted-foreground"/>
                <div>
                <h3 className="font-medium text-foreground">
                    {
                        filter === "active" 
                        ? "Chưa có nhiệm vụ nào đang hoạt động!" 
                        :filter === "completed" 
                        ? "Chưa có nhiệm vụ hoàn thành nào!" 
                        :"Chưa có nhiệm vụ"
                    }
                </h3>

                <p className="text-sm text-muted-">
                    {
                        filter === "all" 
                        ? "Hãy tạo một nhiệm vụ mới để bắt đầu!" 
                        :`"Chuyển sang tất cả để thấy nhiệm vụ${
                            filter === "active" ? " đang hoạt động" : "đã hoàn thành"}`
                    }
                </p>
                </div>
            </div>
        </Card>
    )
}
export default TaskEmptyState