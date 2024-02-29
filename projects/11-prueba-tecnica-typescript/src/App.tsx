import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersLists'
import { SortBy, type User } from './types.d'
import { useUsers } from './hooks/useUsers'

function App (): JSX.Element {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  // const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = (): void => {
    setShowColor(!showColor)
  }

  const handleReset = async () => {
    void refetch()
    // setUsers(originalUsers.current)
  }

  const toggleSortByCountry = (): void => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string): void => {
    // setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy): void => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    }
    )
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'}</button>
        <button onClick={handleReset as () => void}>Resetear</button>
        <input
          placeholder='Filtra por pais' onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        {users.length > 0 &&
          <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColor} users={sortedUsers} />}
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Hubo un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage && <button onClick={() => void fetchNextPage()}>Cargar mas componentes</button>}
      </main>
    </>
  )
}

export default App
