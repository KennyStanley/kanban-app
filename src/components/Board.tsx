import { useCallback } from "react";
import { useTasks } from "@/contexts/TasksProvider";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { SectionComponent } from "./Section";
import { useSections } from "@/contexts/SectionsProvider";

export default function Board() {
    const {tasks, updateTask, getTaskById, setTasks} = useTasks()
    const {sections} = useSections()

    const handleDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {

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
                let oldTask = getTaskById(parseInt(taskId))
                if (!oldTask) return
                updateTask({...oldTask, position: newPosition.droppableId})
            }
        }
    }, [tasks, getTaskById, updateTask])

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {sections?.map(section => (
                <SectionComponent 
                    key={section.id.toString()} 
                    title={section.title} 
                    tasks={tasks?.filter(task => task.position === section.title)} 
                />
            ))}
        </DragDropContext>
    )
}