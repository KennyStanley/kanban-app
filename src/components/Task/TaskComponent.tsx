import { useTasks } from "@/contexts/TasksProvider"
import { useReducer, useState, useEffect, useCallback } from "react"
import Toggle from "./Toggle"
import { Task, TaskAction } from "."

function taskReducer(state: Task, action: TaskAction): Task {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.field]: action.value
            }
        }
        default: {
            break
        }
    }
    return state
}

const TaskComponent = (props: { task: Task }) => {
    const [state, dispatch] = useReducer(taskReducer, props.task)
    const [isEditing, setIsEditing] = useState(false)
    const [isDone, setIsDone] = useState(props.task.isDone || false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { title, details, developer } = state

    const {updateTask, deleteTask} = useTasks()

    const handleToggle = useCallback((input: boolean) => {
        dispatch({ type: 'setIsDone', isDone: input})
        setIsDone(input)

        if (updateTask) updateTask({...state, isDone: input})

    }, [setIsDone])

    return (
        <div className={`${isDone ? 'bg-green-800' : 'bg-indigo-800'} border-2 border-gray-700 dark:border-gray-300 text-white rounded-lg relative`}>
            <div className="flex flex-col p-2">
                {isEditing && !isDeleting && 
                    <>
                        <div className="mb-4 mr-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            {title && <label
                                htmlFor="title"
                                className={`${isDone ? 'bg-green-800' : 'bg-indigo-800'} absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium`}
                            >
                                Title
                            </label>}
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={title || ''}
                                onChange={e => 
                                    dispatch({ 
                                        type: 'field', 
                                        field: 'title', 
                                        value: e.currentTarget.value
                                    })
                                }
                                className="bg-transparent outline-none block w-full border-0 p-0 focus:ring-0 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4 mr-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            {details && <label
                                htmlFor="details"
                                className={`${isDone ? 'bg-green-800' : 'bg-indigo-800'} absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium`}
                            >
                                Details
                            </label>}
                            <textarea
                                name="details"
                                placeholder="Details"
                                value={details || ''}
                                rows={10}
                                cols={20}
                                onChange={e => 
                                    dispatch({ 
                                        type: 'field', 
                                        field: 'details', 
                                        value: e.currentTarget.value
                                    })
                                }
                                className="bg-transparent outline-none block w-full border-0 p-0 focus:ring-0 sm:text-sm"
                            />
                        </div>
                        <div className="mr-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            {developer && <label
                                htmlFor="developer"
                                className={`${isDone ? 'bg-green-800' : 'bg-indigo-800'} absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium`}
                            >
                                Developer
                            </label>}
                            <input
                                type="text"
                                name="developer"
                                placeholder="Developer"
                                value={developer || ''}
                                onChange={e => 
                                    dispatch({ 
                                        type: 'field', 
                                        field: 'developer', 
                                        value: e.currentTarget.value
                                    })
                                }
                                className="bg-transparent outline-none block w-full border-0 p-0 focus:ring-0 sm:text-sm"
                            />
                        </div>
                        <button className="absolute top-2 right-2" onClick={() => setIsDeleting(true)}>
                            <svg className="w-6 h-6" fill="red" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </>
            }
            {!isEditing && !isDeleting &&
                    <>
                        <div className="text-left">
                            <div className="flex items-baselineflex justify-between mb-2">
                                <p className="text-lg md:text-xl p-1">{title}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs">{isDone ? 'done' : 'doing'}</p>
                                    <Toggle 
                                        value={isDone} 
                                        handleToggle={handleToggle} />   
                                </div>
                                                        
                            </div>
                            
                            {details && <p className="break-words text-sm p-1 mr-8 mb-2">{details}</p>}
                            <p className="text-sm text-gray-400 p-1 mr-8 mb-2">{developer}</p>
                        </div>
                    </>
            }
            {isDeleting && 
                <>
                    <p className="text-xl p-1">Are you sure?</p>
                    <div className="flex justify-center gap-2 m-2">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setIsDeleting(false)}
                    >
                        Cancel
                    </button>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                setIsDeleting(false)
                                if (deleteTask) deleteTask(props.task.id)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </>                        
            }

            </div>
            <button className="absolute bottom-2 right-2" onClick={() => {
                    if (isEditing && updateTask) updateTask(state) 
                    setIsEditing(!isEditing)}
                }>
                {isEditing ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                }
            </button>
        </div>
    )
}

export default TaskComponent