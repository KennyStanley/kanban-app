import { TaskComponent } from "@/components/Task"
import { Task } from "@/components/Task/types"
import { useTasks } from "@/contexts/TasksProvider"
import { useState, useEffect } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Section } from "."

const SectionComponent = (props: { title: string, tasks?: Task[] }) => {

    return (
        <div className="flex flex-col w-full">
            <h2 className="text-3xl text-gray-800 dark:text-gray-100 capitalize">{props.title}</h2>
            <Droppable droppableId={props.title}>
                {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}   
                    className="border-4 border-gray-400 dark:border-gray-700 rounded-xl p-8 w-full h-full"
                >
                    <ul role="list">
                        {props.tasks?.map((task, index) => {
                            if (task) {
                                return (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided, snapshot) => (
                                            <li 
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="py-2">
                                                <TaskComponent task={task} />
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            }
                        })}
                    {provided.placeholder}
                    </ul>
                </div>
                )}
            </Droppable>
        </div>
    )
}

export default SectionComponent