/* This example requires Tailwind CSS v2.0+ */
import { Switch } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Toggle(
    props: {
        value: boolean, 
        handleToggle(isDone: boolean): void
    }) {

    return (
        <Switch
        checked={props.value}
        onChange={props.handleToggle}
        className={classNames(
            props.value ? 'bg-green-300' : 'bg-indigo-300',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
        )}
        >
        <span className="sr-only">Toggle task done</span>
        <span
            aria-hidden="true"
            className={classNames(
            props.value ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
        />
        </Switch>
    )
}