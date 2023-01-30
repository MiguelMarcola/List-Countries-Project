import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import './styles.scss'

interface DropdownFilterProps {
  name: string;
  values: string[];
  onFiltered: (filter: string | null) => void;
}


export function DropdownFilter({ name, values, onFiltered }: DropdownFilterProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleSelectValue = (value: string | null) => {
    setSelected(value)
    onFiltered(value)
  }

  return (
    <div className="d-flex pb-3">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'} color='dark'>
        <DropdownToggle caret color='dark'>{selected ? selected : name}</DropdownToggle>
        <DropdownMenu className='mt-2'>
          <DropdownItem className='p-2 clean' onClick={() => handleSelectValue(null)}>(Limpar)</DropdownItem>
          {values.map(value => (
            <DropdownItem key={value} className='p-2' onClick={() => handleSelectValue(value)}>{value}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}