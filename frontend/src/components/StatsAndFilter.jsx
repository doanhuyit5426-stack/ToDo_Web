import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { FilterType } from '@/lib/data'
import { Filter as FilterIcon } from "lucide-react"

const StatsAndFilter = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3 ">
        <Badge 
          variant="secondary" 
          className="bg-white/50 text-blue-600 border-blue/20"
        >
          {activeTasksCount} {FilterType['active']}
        </Badge>
        
        <Badge 
          variant="secondary" 
          className="bg-white/50 text-green-600 border-green/20"
        >
          {completedTasksCount} {FilterType['completed']}
        </Badge>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {
          Object.keys(FilterType).map((type) => {
            const isSelected = filter.toLowerCase() === type.toLowerCase();
            return (
              <Button 
                key={type}
                variant={filter === type ? "gradient" : "ghost"}
                size="sm"
                className={`capitalize rounded-md ${
                  isSelected 
                    ? "text-white shadow-md shadow-primary/20" 
                    : "text-slate-600 hover:bg-blue-200 hover:text-blue-600 hover:"
                }`}
                onClick={() => setFilter(type)}
                >
                < FilterIcon className="size-4" />
                {FilterType[type]}
              </Button>
            );
          })
        }
      </div>

    </div>
  )
}

export default StatsAndFilter