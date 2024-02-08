import { Dialog as HDialog, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToDoStore } from '@/store'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

type Inputs = {
  title: string
  description: string
  date: string
}

type Props = {
  open: boolean
  onClose: () => void
}

const schema = z.object({
  title: z
    .string()
    .min(3, 'Title is required and must be at least 3 characters long'),
  description: z.string(),
  date: z.string(),
})

export const Dialog = ({ open, onClose }: Props) => {
  const addTodo = useToDoStore((state) => state.addToDo)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (open) {
      reset()
    }
  }, [open, reset])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('data: ', data)
    addTodo({
      id: uuidv4(),
      title: data.title,
      description: data.description,
      date: dayjs(data.date, dayjs.tz.guess()),
      checked: false,
    })
    onClose()
  }

  const closeDialog = () => {
    onClose()
  }

  const getFormattedToday = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1 // getMonth() returns month from 0-11
    const day = today.getDate()
    const hours = today.getHours()
    const minutes = today.getMinutes()

    // Ensuring month and day are in two digits format
    const strMonth = month < 10 ? `0${month}` : String(month)
    const strDay = day < 10 ? `0${day}` : String(day)
    const strHours = hours < 10 ? `0${hours}` : hours
    const strMinutes = minutes < 10 ? `0${minutes}` : minutes

    console.log('min date', `${year}-${strMonth}-${strDay}`)

    return `${year}-${strMonth}-${strDay}T${strHours}:${strMinutes}`
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <HDialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mb-60">
                <HDialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 hidden"
                >
                  Add your new task
                </HDialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Task"
                    className="text-lg font-medium leading-6 text-gray-900 appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    {...register('title')}
                  />
                  {errors.title && (
                    <ErrorMessage message={errors.title.message} />
                  )}

                  <div className="mt-2">
                    <textarea
                      placeholder="Description"
                      className="text-sm text-gray-500 appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                      rows={2}
                      {...register('description')}
                    />
                    {errors.description && (
                      <ErrorMessage message={errors.description.message} />
                    )}
                  </div>

                  <div className="mt-2">
                    <input
                      className="text-sm text-gray-500 appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                      type="datetime-local"
                      min={getFormattedToday()}
                      {...register('date')}
                    />
                    {errors.description && (
                      <ErrorMessage message={errors.description.message} />
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button" // Change to "button" since this is not a submit action
                      className="inline-flex justify-center rounded-md border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 mr-2"
                      onClick={closeDialog}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                    >
                      Add task
                    </button>
                  </div>
                </form>
              </HDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HDialog>
    </Transition>
  )
}

const ErrorMessage = ({ message }: { message: string | undefined }) => {
  return <div className="text-sm text-red-600">{message}</div>
}
