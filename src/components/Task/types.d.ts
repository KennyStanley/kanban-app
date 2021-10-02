type TaskPosition = 'backlog' | 'breakdown' | 'implement' | 'validate'

type Task = {
    id: string
    title: string
    details?: string
    developer?: string
    position: TaskPosition
    isDone: boolean
}

type TaskAction =
    | { type: 'setPosition', position: TaskPosition }
    | { type: 'setIsDone', isDone: boolean }
    | { type: 'field', field: 'title' | 'details' | 'developer', value: string }

export {
    Task,
    TaskAction,
    TaskPosition
}