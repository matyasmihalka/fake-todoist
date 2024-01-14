import { Checkbox } from './Checkbox'
import { ToDo, useToDoStore } from '@/store/store'

export const ToDoList = () => {
  const toDoList = useToDoStore((state) => state.toDoList)
  const checkToDo = useToDoStore((state) => state.checkToDo)

  const handleCheckboxChange = (toDo: ToDo) => () => {
    checkToDo(toDo)
  }

  return (
    <section>
      <h2>To do</h2>
      <ul className="border-t">
        {toDoList.map((item) => (
          <li className="border-b flex py-2 gap-2 hover:bg-gray-50">
            <Checkbox
              checked={item.checked}
              onChange={handleCheckboxChange(item)}
            />
            <div className="">
              <div className="text-base pb-1">{item.title}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
              <div className="text-xs text-rose-500">{item.date}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
