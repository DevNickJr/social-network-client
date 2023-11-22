import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useAuthContext } from './useAuthContext'

interface IProps<T> {
    api: (a?: any, b?: any) =>  Promise<AxiosResponse<T, any>>
    param?: any
    key: string[]
    onSuccess?: (a: any) => void
    requireAuth?: boolean
    select?: (a: any) => T,
    enabled?: boolean
}

const useFetch = <T,>({ api, param, key, onSuccess, requireAuth, select, enabled=true, ...rest }: IProps<T>) => {
  const { token } = useAuthContext()

    const { data, error, isLoading, isSuccess, isFetching, refetch, fetchStatus } = useQuery({
        queryKey: [...key],
        queryFn: () => requireAuth ? api(token, param) : api(param),
        select: select || ((d: any): T => d?.data),
        enabled,
        ...rest,
    })

    // useEffect(() => {
    //     return () => {
    //       if (clear) remove()
    //     }
    // }, [clear])

    useEffect(() => {
        if (onSuccess && isSuccess && data) {
            // console.log("data", data, "onSuccess", onSuccess, "isSuccess", isSuccess)
            onSuccess(data)
        }
    }, [data, isSuccess, onSuccess])

    return { data, error, isLoading, isFetching, refetch, fetchStatus }
}

export default useFetch