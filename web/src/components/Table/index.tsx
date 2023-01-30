import { Table } from 'reactstrap';
import { Icon } from '@iconify/react';

import './styles.scss'
import { OrderByButton } from '../OrderByButton';
import { OrderByProps } from '../../pages/Home';
import { Countries } from '../../service/hooks/useCountries';

interface TableCompenentProps {
  data: Countries[];
  setOrderBy: (id?: string, order?: 'ASC' | 'DESC') => void;
  orderBy: OrderByProps | null
}

interface dataProps {
  countries: Countries[];
  count: number;
}

export function TableCompenent({ data, orderBy, setOrderBy }: TableCompenentProps) {
  return (
    <Table dark responsive>
      <thead>
        <tr>
          <th>
            <div className='container-flex'>
              Id
              <OrderByButton id="id" setOrderBy={setOrderBy} order={orderBy?.id === "id" ? orderBy.order : null} />
            </div>
          </th>
          <th>
            <div className='container-flex'>
              Código
              <OrderByButton id="cod" setOrderBy={setOrderBy} order={orderBy?.id === "cod" ? orderBy.order : null} />
            </div>
          </th>
          <th>
            <div className='container-flex'>
              Nome
              <OrderByButton id="name" setOrderBy={setOrderBy} order={orderBy?.id === "name" ? orderBy.order : null} />
            </div>
          </th>
          <th>
            <div className='container-flex'>
              Região
              <OrderByButton id="region" setOrderBy={setOrderBy} order={orderBy?.id === "region" ? orderBy.order : null} />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr>
            <td>{item.id}</td>
            <td>{item.cod}</td>
            <td>{item.name}</td>
            <td>{item.region}</td>
          </tr>
        )
        )
        }

        {!data[0] && (<tr><td colSpan={4}>Nenhum dado encontrado</td></tr>)}
      </tbody>
    </Table>
  )
}