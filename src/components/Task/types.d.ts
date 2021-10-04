type NewTask = {
    title: string
    details?: string
    developer?: string
}

interface Task extends NewTask {
    id: number
    position: string
    isDone: boolean
}

type TaskAction =
    | { type: 'setPosition', position: string }
    | { type: 'setIsDone', isDone: boolean }
    | { type: 'field', field: 'title' | 'details' | 'developer', value: string }

export {
    NewTask,
    Task,
    TaskAction
}