import { useCallback } from "react";
import { useTasks } from "@/contexts/TasksProvider";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { SectionComponent } from "./Section";
import { TaskPosition } from "./Task/types";

export default function Board() {
    const {tasks, updateTask, getTaskById, setTasks} = useTasks()

    const handleDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
        console.log('drag ended')
        console.log(result)

        const taskId = result.draggableId
        const destination = result.destination
        const oldPosition = result.source
        const newPosition = result.destination

        // Null checks
        if (!tasks || !taskId || !destination || !oldPosition || !newPosition || !getTaskById || !updateTask || !setTasks) return

        if (newPosition !== oldPosition) {
            if (newPosition.droppableId === oldPosition.droppableId) {
                const items = Array.from(tasks)
                const [reorderedItem] = items.splice(oldPosition.index, 1)
                items.splice(newPosition.index, 0, reorderedItem)
                setTasks(items)
            } else {
                let oldTask = getTaskById(taskId)
                if (!oldTask) return
                updateTask({...oldTask, position: newPosition.droppableId as TaskPosition})
            }
        }
    }, [tasks, getTaskById, updateTask])

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <SectionComponent title="backlog" tasks={tasks?.filter(task => task.position === "backlog")} />
            <SectionComponent title="breakdown" tasks={tasks?.filter(task => task.position === "breakdown")} />
            <SectionComponent title="implement" tasks={tasks?.filter(task => task.position === "implement")} />
            <SectionComponent title="validate" tasks={tasks?.filter(task => task.position === "validate")} />
        </DragDropContext>
    )
}