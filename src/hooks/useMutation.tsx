import { MutationFunction, useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { AxiosResponse } from "axios";
import { useAuthContext } from "./useAuthContext";


interface State {
  onSuccess?: (data: any, variables?: any, context?: any) => void;
  onError?: (error: any, variables?: any, context?: any) => void;
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  requireAuth?: boolean;
  token?: string;
}

const useMutations = <T,K>(api: (data: T,  token: string) => Promise<AxiosResponse>, { onSuccess, onError, showSuccessMessage=false, showErrorMessage=true, requireAuth, ...rest }: State) => {
    const { token } = useAuthContext()

    const Mutation = useMutation<K, K, T>({
        mutationFn: async (data: T) => {
          // const response = requireAuth ? await api(data, session?.user?.token.access) : await api(data)
          const response = requireAuth ? await api(data, token!) : await api(data, token!)
          // console.log("response from usePost", response)
          return response?.data
          // if (response?.data?.status === "success") {
          //   return response?.data?.data
          // } else {
          //   throw new Error(response?.data?.message)
          //   }
        },
        onSuccess: (data, variables, context) => {
            console.log("successful", data)
            if (showSuccessMessage) {
              // toast.success(data?.message);
              toast.success("Successful !");
            }
            if (onSuccess) {
              // console.log("onSuccess", onSuccess)
                onSuccess(data, variables, context)
            }
        },
        onError: (error: any, variables, context) => {
            console.log("error", error)
            if (showErrorMessage) {
              toast.error(error?.response?.data?.message || "An Error Occurred!");
            } else {
              // toast.error("An Error Occurred!");
            }
            if (onError) {
                onError(error, variables, context)
            }
        },
        ...rest
      })

    return Mutation
}

export default useMutations