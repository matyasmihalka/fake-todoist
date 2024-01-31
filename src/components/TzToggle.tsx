import { useTimezoneStore } from '@/store'
import { TimezoneEnum } from '@/store/timezoneStore'

export const TzToggle = () => {
  const activeTimezone = useTimezoneStore((state) => state.activeTimezone)
  const setTimezone = useTimezoneStore((state) => state.setTimezone)

  const primaryBtnClasses =
    'text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2'
  const secondaryBtnClasses =
    'text-rose-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 border border-rose-300 hover:border-rose-400'

  return (
    <>
      <button
        type="button"
        className={
          activeTimezone === TimezoneEnum.Current
            ? primaryBtnClasses
            : secondaryBtnClasses
        }
        onClick={() => setTimezone(TimezoneEnum.Current)}
      >
        {TimezoneEnum.Current}
      </button>
      <button
        type="button"
        className={
          activeTimezone === TimezoneEnum.Vancouver
            ? primaryBtnClasses
            : secondaryBtnClasses
        }
        onClick={() => setTimezone(TimezoneEnum.Vancouver)}
      >
        {TimezoneEnum.Vancouver}
      </button>
    </>
  )
}
