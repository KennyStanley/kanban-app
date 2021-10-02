import { useTasks } from "@/contexts/TasksProvider"
import { useEffect, useReducer, useState, useCallback } from "react"
import { Task, TaskAction } from "./types"

const initialState: Task = {
    id: '',
    title: '',
    position: 'backlog',
    status: 'doing'
}

function taskReducer(state: Task, action: TaskAction): Task {
    switch (action.type) {
        case 'setPosition': {
            if (action.position) {
                return {
                    ...state,
                    position: action.position,
                    status: 'doing'
                }
            }
            break
        }
        case 'setStatus': {
            if (action.status) {
                return {
                    ...state,
                    status: action.status
                }
            } 
            break
        }
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

const TaskComponent = (props: { task?: Task }) => {
    const [state, dispatch] = useReducer(taskReducer, props.task || initialState)
    const [isEditing, setIsEditing] = useState(false)

    const {updateTask} = useTasks()

    const { id, title, details, developer, position, status } = state

    return (
        <div className="border-2 border-blue-600 rounded-lg relative">
            <div className="flex flex-col p-2">
                {isEditing ? 
                    <>
                        <div className="mb-4 mr-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            {title && <label
                                htmlFor="title"
                                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                            >
                                Title
                            </label>}
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={title}
                                onChange={e => 
                                    dispatch({ 
                                        type: 'field', 
                                        field: 'title', 
                                        value: e.currentTarget.value
                                    })
                                }
                                className="outline-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4 mr-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            {details && <label
                                htmlFor="details"
                                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                            >
                                Details
                            </label>}
                            <input
                                type="text"
                                name="details"
                                placeholder="Details"
                                value={details}
                                onChange={e => 
                                    dispatch({ 
                                        type: 'field', 
                                        field: 'details', 
                                        value: e.currentTarget.value
                                    })
                                }
                                className="outline-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            />
                        </div>
                        <div className="mr-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            {developer && <label
                                htmlFor="developer"
                                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                            >
                                Developer
                            </label>}
                            <input
                                type="text"
                                name="developer"
                                placeholder="Developer"
                                value={developer}
                                onChange={e => 
                                    dispatch({ 
                                        type: 'field', 
                                        field: 'developer', 
                                        value: e.currentTarget.value
                                    })
                                }
                                className="outline-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            />
                        </div>
                    </>
                    :
                    <div className="text-left">
                        <div className="flex items-baselineflex justify-between mb-2 mr-10">
                            <p className="text-xl p-1">{title}</p>
                            <p className="text-xs">{status}</p>
                        </div>
                        
                        {details && <p className="p-1 mr-8 mb-2">{details}</p>}
                        {developer && <p className="text-sm text-gray-400 p-1 mr-8 mb-2">{developer}</p>}
                    </div>
                }
            </div>
            <button className="absolute top-2 right-2" onClick={() => {
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