import { create } from 'zustand'
import { produce } from 'immer'

export type ToDo = {
  id: string
  title: string
  description: string
  date: string
  checked: boolean
}

type State = {
  toDoList: ToDo[]
}

type Action = {
  addToDo: (toDo: ToDo) => void
  checkToDo: (id: string) => void
  // removeToDo: (toDo: ToDo) => void
}

const initialState: State = {
  toDoList: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      title: 'My first todo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus augue.',
      date: 'Not ready yet',
      checked: false,
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
      title: 'My second todo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus augue.',
      date: 'Not ready yet',
      checked: false,
    },
  ],
}

export const useToDoStore = create<State & Action>((set) => ({
  ...initialState,
  addToDo: (toDo) => set((state) => ({ toDoList: [...state.toDoList, toDo] })),
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
  // removeToDo: (toDo) =>
  //   set((state) => ({
  //     toDoList: state.toDoList.filter((item) => item !== toDo),
  //   })),
}))
