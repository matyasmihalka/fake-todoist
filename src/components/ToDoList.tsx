import { useState } from 'react'
import { Checkbox } from './Checkbox'

export const ToDoList = () => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    console.log('chekbox changed: ', checked, event.target.checked)
  }

  return (
    <section>
      <h2>To do</h2>
      <ul className="border-t">
        <li className="border-b flex py-2 gap-2 hover:bg-gray-50">
          <Checkbox checked={checked} onChange={handleCheckboxChange} />
          <div className="">
            <div className="text-base pb-1">Task title</div>
            <div className="text-xs text-gray-500">Task description</div>
            <div className="text-xs text-rose-500">Reminder date time</div>
          </div>
        </li>
        <li>Task 2</li>
      </ul>
    </section>
  )
}
