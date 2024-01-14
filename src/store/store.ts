import { create } from 'zustand'

export type ToDo = {
  // id: number
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
  checkToDo: (toDo: ToDo) => void
  // removeToDo: (toDo: ToDo) => void
}

const initialState: State = {
  toDoList: [
    {
      title: 'My first todo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus augue.',
      date: 'Not ready yet',
      checked: false,
    },
    {
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
  checkToDo: (toDo) =>
    set((state) => {
      const index = state.toDoList.findIndex((item) => item === toDo)
      const newToDoList = [...state.toDoList]
      newToDoList[index].checked = !newToDoList[index].checked
      return { toDoList: newToDoList }
    }),
  // removeToDo: (toDo) =>
  //   set((state) => ({
  //     toDoList: state.toDoList.filter((item) => item !== toDo),
  //   })),
}))
