import { create } from 'zustand'

export enum TimezoneEnum {
  Vancouver = 'Vancouver',
  Current = 'Current',
}

type State = {
  activeTimezone: TimezoneEnum
}

type Action = {
  setTimezone: (timezone: TimezoneEnum) => void
}

export const useTimezoneStore = create<State & Action>((set) => ({
  activeTimezone: TimezoneEnum.Current,
  setTimezone: (timezone) => set(() => ({ activeTimezone: timezone })),
}))
