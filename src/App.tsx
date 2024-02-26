import { useState } from 'react'
import './App.css'
import { ToDoList } from '@/components/ToDoList'
import { Dialog } from '@/components/Dialog'
import { Logo } from './components/Logo'
import { TzToggle } from './components/TzToggle'
import { ToDo } from './store/toDoStore'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [toDoToEdit, setToDoToEdit] = useState<ToDo | null>(null)

  const openModalWithToDo = (toDo: ToDo) => {
    console.log('openModalWithToDo: ', toDo)
    setToDoToEdit(toDo)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setToDoToEdit(null)
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-rose-100 text-black p-4 space-y-2">
          <div className="text-xl font-bold leading-6 text-gray-900 flex items-center mb-5">
            <div className="w-9 h-9 ">
              <Logo />
            </div>
            Weekly
          </div>
          {/* Sidebar content here */}
          <button
            type="button"
            className="text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => setIsOpen(true)}
          >
            + Add task
          </button>
          <Dialog open={isOpen} onClose={closeModal} toDo={toDoToEdit} />
        </aside>

        {/* Main content */}
        <section className="flex-1  bg-white p-4 ">
          <div className="flex flex-col content-center h-full flex-wrap ">
            <div className="min-w-128 mt-14 ">
              <TzToggle />
              <h1 className="font-bold mb-3">Week 8 (2.26 - 1.3)</h1>
              <ToDoList openModal={openModalWithToDo} />
              <section className="mt-8">
                <h2>Done</h2>
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
