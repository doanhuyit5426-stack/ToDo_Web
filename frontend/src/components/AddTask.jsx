import React,{useState} from 'react'
import {Card} from './ui/card'
import {Input} from './ui/input'
import {Button} from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { handleEnterPress } from '../lib/Keyboard'
import api from '@/lib/axios'

const AddTask = ({ handleNewTask }) => {
  const [newTaskTitle,setNewTaskTitle] = useState();
  const addTask = async() =>{
    if(newTaskTitle.trim()){
      try{
      await api.post("/tasks",{title: newTaskTitle.trim()}); 
      toast.success(`nhiệm vụ ${newTaskTitle} đã được thêm vào`);
      handleNewTask();
      }catch(error){
        console.error("Lỗi xảy ra khi thêm nhiệm vụ",error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ");
      }
     setNewTaskTitle ("");
    }
    else{
     toast.error("bạn cần nhập nội dung nhiệm vụ");
    }
  };
  return (
    <Card className="p-6 border bg-gradient-card shadow-lg">
    <div className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="text"
        placeholder="You need to do something? "
        className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
        value={newTaskTitle}
        onChange={(event) => setNewTaskTitle(event.target.value)}
        onKeyPress={(e) => handleEnterPress(e, addTask)}      />
    <Button 
    size="xl"
    variant="gradient"
    className="px-6"
    onClick={addTask}
    disabled={!newTaskTitle || !newTaskTitle.trim()}
    >
    <Plus className="size-5" />Add
    </Button></div>
    </Card>
  )
}
export default AddTask;