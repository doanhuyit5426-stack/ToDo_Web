import React from 'react'
import {Card} from './ui/card'
import {Input} from './ui/input'
import {Button} from './ui/button'
import { Plus } from 'lucide-react'
const AddTask = () => {
  return (
    <Card className="p-6 border bg-gradient-card shadow-lg">
    <div className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="text"
        placeholder="You need to do something? "
        className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
      />
    <Button size="xl" variant="gradient" className="px-6">
    <Plus className="size-5" />Add
    </Button></div>
    </Card>
  )
}
export default AddTask