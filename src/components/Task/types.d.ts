type TaskPosition = 'backlog' | 'breakdown' | 'implement' | 'validate'
type TaskStatus = 'doing' | 'done'

type Task = {
    id: string
    title: string
    details?: string
    developer?: string
    position: TaskPosition
    status: TaskStatus
}

type TaskAction =
    | { type: 'setPosition', position: TaskPosition }
    | { type: 'setStatus', status: TaskStatus }
    | { type: 'field', field: 'title' | 'details' | 'developer', value: string }

export {
    Task,
    TaskAction
}