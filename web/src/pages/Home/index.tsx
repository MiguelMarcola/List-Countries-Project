import { useEffect, useState } from 'react';
import { DropdownFilter } from '../../components/DropdownFilter';
import { FechDataButton } from '../../components/FechDataButton';
import { Loading } from '../../components/Loading';
import { PaginationComponent } from '../../components/PaginationComponent';
import { TableCompenent } from '../../components/Table';
import { TextFilter } from '../../components/TextFilter';
import { api } from '../../service/api';
import { useCountries } from '../../service/hooks/useCountries';
import '../../styles/global.scss'
import './styles.scss'

const labels = ['Id', 'Código', 'Nome', 'Região']

export interface OrderByProps {
  id?: string;
  order?: 'ASC' | 'DESC'
}


export function Home() {
  const [orderBy, setOrderBy] = useState<OrderByProps | null>(null)
  const [regionValues, setRegionValues] = useState([])
  const [regionFilter, setRegionFilter] = useState<string | null>(null)
  const [codValues, setCodValues] = useState([])
  const [codFilter, setCodFilter] = useState<string | null>(null)
  const [nameFilter, setNameFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useCountries(currentPage, regionFilter, codFilter, nameFilter, orderBy);

  const handleSetOrderBy = (id?: string, order?: 'ASC' | 'DESC') => {
    if (!id && !order) {
      setOrderBy(null)
    } else {
      setOrderBy({
        id,
        order
      })
    }
  }

  const populateFilters = async () => {
    const { data } = await api.get('/countries/populate-filters')

    setRegionValues(data.regions)
    setCodValues(data.cods)
  }

  useEffect(() => {
    populateFilters()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [regionFilter, codFilter, nameFilter])

  return (
    <div className='mt-3'>
      <h1>Lista de Países</h1>

      <div className='container-flex'>
        <DropdownFilter name='Código' values={codValues} onFiltered={setCodFilter} />
        <DropdownFilter name='Região' values={regionValues} onFiltered={setRegionFilter} />
        <TextFilter onFiltered={setNameFilter} />

        <FechDataButton />
      </div>

      {isLoading ? (
        <Loading />
      ) : error || !data ? (
        <>
          <p>Tivemos um problema ao retornar os dados, tente mais tarde...</p>
        </>
      ) : (
        <TableCompenent orderBy={orderBy} setOrderBy={handleSetOrderBy} data={data.countries} />
      )
      }



      <PaginationComponent currentPage={currentPage} total={data ? data.count : 0} onPageChange={setCurrentPage} />
    </div>
  )
}

