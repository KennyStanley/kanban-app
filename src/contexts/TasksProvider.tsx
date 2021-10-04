import { NewTask, Task } from "@/components/Task/types"
import { createContext, useContext, useEffect, useState, useCallback, Dispatch, SetStateAction } from "react";
import { supabase } from '@/utils/supabase'

type TasksProviderOutput = {
    tasks: Task[] | undefined
    setTasks: Dispatch<SetStateAction<Task[]>>
    getTaskById(id: number): Task | undefined
    addTask(newTask: NewTask): void
    updateTask(updatedTask: Task): void
    deleteTask(id: number): void
}

const TasksContext = createContext<TasksProviderOutput | undefined>(undefined)

export function useTasks() {
    return {...useContext(TasksContext)}
}

export function TasksProvider(props: {children?: any}) {
    const [tasks, setTasks] = useState<Task[]>([])

    const fetchTasks = useCallback(async () => {
        let { data: tasks, error } = await supabase.from('tasks').select('*')
        if (error) console.log('error', error)
        else setTasks(tasks as Task[])
        console.log(`Fetched Tasks from supabaseDB`)
        console.log(tasks)
    }, [setTasks])

    const getTaskById = useCallback((id: number) => {
        return tasks.find(task => task.id === id)
    }, [tasks])

    const addTask = async (newTask: NewTask) => {
        // setTasks((prevTasks: Task[]) => ({...prevTasks, newTask}))

        const { data: task, error } = await supabase.from('tasks').insert([newTask])
        if (error) console.log(error)
        else console.log('Added Task', task)
        fetchTasks()
    }

    const updateTask = useCallback(async (updatedTask: Task) => {
        setTasks((prevTasks: Task[]) => prevTasks.map(task => {
            if (task.id !== updatedTask.id) return task
            else return updatedTask
        }))
        
        const { data: task, error } = await supabase.from('tasks').update(updatedTask).match({ id: updatedTask.id})
        if (error) console.log('error', error)
        else console.log('Updated Task', task)
        
    }, [setTasks])

    const deleteTask = async (id: number) => {
        const { data: task, error } = await supabase.from('tasks').delete().match({ id })
        if (error) console.log(error)
        else console.log(task)
        fetchTasks()
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <TasksContext.Provider 
            value={{
                tasks, 
                setTasks, 
                getTaskById, 
                addTask, 
                updateTask, 
                deleteTask
            }}>
            {props.children}
        </TasksContext.Provider>
    )
}