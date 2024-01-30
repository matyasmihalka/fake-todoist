import { Checkbox } from './Checkbox'
import { useToDoStore } from '@/store/store'

export const ToDoList = () => {
  const toDoList = useToDoStore((state) => state.toDoList)
  const checkToDo = useToDoStore((state) => state.checkToDo)

  const handleCheckboxChange = (id: string) => () => {
    checkToDo(id)
  }

  return (
    <section>
      <h2>To do</h2>
      <ul className="border-t">
        {toDoList.map(({ id, description, title, date, checked }, index) => (
          <li key={index} className="border-b flex py-2 gap-2 hover:bg-gray-50">
            <Checkbox checked={checked} onChange={handleCheckboxChange(id)} />
            <div className="">
              <div className="text-base pb-1">{title}</div>
              <div className="text-xs text-gray-500">{description}</div>
              <div className="text-xs text-rose-500">
                {date.split('T')[0]} {date.split('T')[1]}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
