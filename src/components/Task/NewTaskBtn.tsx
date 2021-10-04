import { useTasks } from "@/contexts/TasksProvider"
import { useCallback } from "react"

/* This example requires Tailwind CSS v2.0+ */
export default function NewTaskBtn() {

    const { addTask } = useTasks()

    const handleAddTask = useCallback(async () => {
        if (addTask) addTask({
            title: 'New Task'
        })
    }, [addTask])

    return (
      <button
        type="button"
        className="relative block w-full border-2 border-gray-400 border-dashed rounded-md p-8 text-center dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-black hover:border-black dark:hover:border-white focus:outline-none"
        onClick={handleAddTask}
      >
        <div className="flex flex-col">
            <svg 
            className="mx-auto h-12 w-12" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
            </svg>
            <span className="mt-2 block text-lg font-medium">New Task</span>
        </div>
        
      </button>
    )
  }