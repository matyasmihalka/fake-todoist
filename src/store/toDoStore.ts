import { create } from 'zustand'
import { produce } from 'immer'
import dayjs from '@/dayjsConfig'
import { Dayjs } from 'dayjs'

export type ToDo = {
  id: string
  title: string
  description: string
  date: Dayjs
  checked: boolean
}

type State = {
  toDoList: ToDo[]
}

type Action = {
  addToDo: (toDo: ToDo) => void
  checkToDo: (id: string) => void
  updateToDo: (toDo: ToDo) => void
  // removeToDo: (toDo: ToDo) => void
}

const initialState: State = {
  toDoList: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      title: 'My first todo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus augue.',
      date: dayjs(),
      checked: false,
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
      title: 'My second todo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus augue.',
      date: dayjs(),
      checked: false,
    },
  ],
}

export const useToDoStore = create<State & Action>((set) => ({
  ...initialState,
  addToDo: (toDo) =>
    set(
      produce<State>((state) => {
        state.toDoList.push(toDo)
      }),
    ),
  checkToDo: (id: string) =>
    set(
      produce<State>((state) => {
        const toDo = state.toDoList.find((item) => item.id === id)
        if (toDo) {
          toDo.checked = !toDo.checked
        } else {
          throw new Error('ToDo not found')
        }
      }),
    ),
  updateToDo: (itemToUpdate: ToDo) =>
    set(
      produce<State>((state) => {
        const toDo = state.toDoList.find((item) => item.id === itemToUpdate.id)
        if (toDo) {
          toDo.title = itemToUpdate.title
          toDo.description = itemToUpdate.description
          toDo.date = itemToUpdate.date
        } else {
          throw new Error('ToDo not found')
        }
      }),
    ),
  // removeToDo: (toDo) =>
  //   set((state) => ({
  //     toDoList: state.toDoList.filter((item) => item !== toDo),
  //   })),
}))
