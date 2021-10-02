import { Task } from "@/components/Task/types"
import { createContext, useContext, useState, useCallback, Dispatch, SetStateAction } from "react";

type TasksProviderOutput = {
    tasks: Task[] | undefined
    setTasks: Dispatch<SetStateAction<Task[]>>
    getTaskById(id: string): Task | undefined
    updateTask(updatedTask: Task): void
}

const TasksContext = createContext<TasksProviderOutput | undefined>(undefined)

export function useTasks() {
    return {...useContext(TasksContext)}
}

export function TasksProvider(props: {children?: any}) {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: 'Make Kanban App',
            position: 'backlog',
            isDone: true,
            developer: 'Kenny'
        },
        {
            id: '2',
            title: 'Make VR Demo app',
            details: 'Hub with links to all working VR demos',
            position: 'backlog',
            isDone: false,
            developer: 'Kenny'
        }
    ])

    const getTaskById = useCallback((id: string) => {
        return tasks.find(task => task.id === id)
    }, [tasks])

    const updateTask = useCallback((updatedTask: Task) => {
        setTasks((prevTasks: Task[]) => prevTasks.map(task => {
            if (task.id !== updatedTask.id) return task
            else return updatedTask
        }))
    }, [setTasks])

    return (
        <TasksContext.Provider value={{tasks, setTasks, getTaskById, updateTask}}>
            {props.children}
        </TasksContext.Provider>
    )
}