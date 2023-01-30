import { useState } from "react";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../service/api";
import { ErrorProps } from "../../interfaces/ErrorProps";
import { Loading } from "../Loading";

export function FechDataButton() {

  const [isLoading, setIsLoading] = useState(false)

  const mockLoadign = async () => {
    setIsLoading(true);
    await api.post("/countries")
      .then(() => {
        toast.success('Países Atualizados com sucesso!')
        setIsLoading(false);
        setInterval(() => {
          window.location.reload();
        }, 2500)
      })
      .catch((error: AxiosError) => {
        const data = error.response?.data as ErrorProps
        if (data.error.statusCode === 400 && data.error.message === "No country has been registered") {
          toast.error("Os dados ja se encontram atualizados!")
        } else {
          toast.error("Ouve um problema ao atualizar!")
        }
        setIsLoading(false);
      })
  }

  return (
    <button className="btn btn-default btn-success mb-3" disabled={isLoading} onClick={mockLoadign}>

      {isLoading
        ?
        <Loading />
        :
        'Atualizar Dados'
      }


      <Toaster />
    </button>
  )
}