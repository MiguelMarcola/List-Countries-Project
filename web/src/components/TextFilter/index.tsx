import { Icon } from '@iconify/react';
import { FormEvent, useState } from 'react';

interface TextFilterProps {
  onFiltered: (value: string) => void;
}

export function TextFilter({ onFiltered }: TextFilterProps) {
  const [searchText, setSearchText] = useState('')

  const handleOnSubimit = (event: FormEvent) => {
    event.preventDefault()

    onFiltered(searchText)
  }

  return (
    <form className='pb-3' onSubmit={handleOnSubimit}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Nome" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
        <div className="input-group-btn">
          <button className="btn btn-default btn-dark" type="submit">
            <Icon icon="material-symbols:search" />
          </button>
        </div>
      </div>
    </form>
  )
}