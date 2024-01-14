import './App.css'
import { ToDoList } from './components/ToDoList'

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-rose-100 text-black p-4 space-y-2">
          {/* Sidebar content here */}
          <SidebarLink href="#" title="Link 1" />
          <SidebarLink href="#" title="Link 2" />
          <SidebarLink href="#" title="Link 3" />
          <button
            type="button"
            className="text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            + Add task
          </button>
        </aside>

        {/* Main content */}
        <section className="flex-1  bg-white p-4 ">
          <div className="flex flex-col content-center h-full flex-wrap ">
            <div className="min-w-128 mt-14 ">
              <h1 className="font-bold mb-3">Week 3 (1.15 -1.21)</h1>
              <ToDoList />
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

function SidebarLink({ href, title }) {
  return (
    <a href={href} className="block py-2.5 px-4 rounded hover:bg-blue-700">
      {title}
    </a>
  )
}

export default App
