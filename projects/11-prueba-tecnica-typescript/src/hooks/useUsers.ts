import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { type User } from '../types.d'

/// * eslint-disable @typescript-eslint/explicit-function-return-type */
export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ users: User[], nextCursor: number }>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    initialPsageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 3
  })

  return {
    isLoading,
    isError,
    data,
    users: data?.pages?.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage
  }
}
