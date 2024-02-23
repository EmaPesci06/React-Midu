import { type Middleware, Tuple, configureStore } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser } from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWidhDabaBase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const previusState = store.getState()

  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previusState.users.find((user) => user.id === userIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          toast.success(`Usuario con el id ${userIdToRemove} eliminado`)
          throw new Error('Error al eliminar el usuario')
        }
      })
      .catch(() => {
        toast.error(`Error deleting user ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        toast.error('Error al eliminar el usuario')
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: () => new Tuple(persistanceLocalStorageMiddleware).concat(syncWidhDabaBase)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
