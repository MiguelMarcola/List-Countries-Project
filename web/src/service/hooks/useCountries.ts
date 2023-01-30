import { useQuery } from "react-query";
import { OrderByProps } from "../../pages/Home";
import { api } from "../api";

export type Countries = {
  id: string;
  cod: string;
  name: string;
  region: string;
}

type GetCountriesResponse = {
  countries: Countries[];
  count: number;
}

export async function getCountries(page: number, regionFilter: string | null, codFilter: string | null, nameFilter: string | null, orderBy: OrderByProps | null): Promise<GetCountriesResponse> {
  const skip = (page - 1) * 10;

  let url = `/countries?skip=${skip}`

  if (regionFilter) {
    url += `&region=${regionFilter}`
  }

  if (codFilter) {
    url += `&cod=${codFilter}`
  }

  if (nameFilter) {
    url += `&name=${nameFilter}`
  }

  if (orderBy) {
    url += `&orderBy=${orderBy.id}&direction=${orderBy.order}`
  }

  const { data } = await api.get(url)

  const { data: countries, count } = data;

  return {
    countries,
    count,
  };
}

export function useCountries(page: number, regionFilter: string | null, codFilter: string | null, nameFilter: string | null, orderBy: OrderByProps | null) {
  return useQuery(["countries", page, regionFilter, codFilter, nameFilter, orderBy], () => getCountries(page, regionFilter, codFilter, nameFilter, orderBy), {
    staleTime: 1000 * 60 * 15,
  })
}