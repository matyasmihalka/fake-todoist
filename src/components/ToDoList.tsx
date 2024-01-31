import { Checkbox } from './Checkbox'
import { useTimezoneStore, useToDoStore } from '@/store'
import dayjs from '@/dayjsConfig'
import { Dayjs } from 'dayjs'

export const ToDoList = () => {
  const toDoList = useToDoStore((state) => state.toDoList)
  const checkToDo = useToDoStore((state) => state.checkToDo)
  const activeTimezone = useTimezoneStore((state) => state.activeTimezone)

  const handleCheckboxChange = (id: string) => () => {
    checkToDo(id)
  }

  const toggleTimezone = (date: Dayjs) => {
    const timezoneMap = {
      Vancouver: 'America/Vancouver',
      Current: dayjs.tz.guess(),
    }

    const selectedTimezone = timezoneMap[activeTimezone] || ''
    const formattedDate = dayjs(date)
      .tz(selectedTimezone)
      .format('YYYY-MM-DDTHH:mm')

    return formattedDate.replace('T', ' ')
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
                {toggleTimezone(date)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
