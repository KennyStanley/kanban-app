import TaskComponent from "@/components/Task"
import { Task } from "@/components/Task/types"

const StepSection = (props: { title: string, tasks?: Task[] }) => {
    return (
        <div className="flex flex-col w-full">
            <h2 className="text-2xl uppercase">{props.title}</h2>
            <div className="border-4 border-black rounded-xl p-8 w-full h-full">
                <ul role="list" className="divide-y divide-gray-200">
                    {props.tasks && props.tasks.map((task) => {
                        return (
                            <li key={task.id} className="py-2">
                                <TaskComponent task={task} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default StepSection