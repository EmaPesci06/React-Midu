import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Lionel Messi',
    email: 'lapulguitamessi@gmail.com',
    github: 'lgq895767507'
  },
  {
    id: '2',
    name: 'Emanuel Pesci',
    email: 'emapesci@gmail.com',
    github: 'emapesci06'
  },
  {
    id: '3',
    name: 'Miguel Angel Duran',
    email: 'midudev@gmail.com',
    github: 'midudev'
  }
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWidthId extends User {
  id: string
}

const initialState: UserWidthId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      return [...state, { id, ...action.payload }]
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWidthId>) => {
      const isUserAlreadyDefined = state.some((user) => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        return [...state, action.payload]
      }
    }
  }
})

export default usersSlice.reducer
export const { deleteUserById, addNewUser, rollbackUser} = usersSlice.actions
