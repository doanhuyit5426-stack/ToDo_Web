import React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const DateTimeFilter = ({ dateFilter, setDateFilter }) => {
  // Danh sách các tùy chọn bộ lọc thời gian
  const options = [
    { value: 'all', label: 'Tất cả thời gian' },
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' }
  ];

  return (
    <div className="flex items-center gap-2 bg-white/50 border border-border/40 p-1.5 rounded-xl shadow-sm backdrop-blur-sm">
      <div className="pl-2 text-muted-foreground shrink-0">
        <CalendarIcon className="size-4" />
      </div>
      
      {/* Thanh chọn Dropdown Select mượt mà */}
      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className={cn(
          "bg-transparent text-sm font-medium text-slate-600 outline-none pr-8 pl-1 cursor-pointer",
          "focus:ring-0 focus:border-transparent"
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-slate-700">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DateTimeFilter;