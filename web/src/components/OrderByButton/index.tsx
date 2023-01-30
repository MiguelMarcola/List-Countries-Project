import { Icon } from "@iconify/react";

interface OrderByButtonProps {
  id: string;
  order?: 'ASC' | 'DESC' | null
  setOrderBy: (id?: string, order?: 'ASC' | 'DESC') => void
}

export function OrderByButton({ id, order, setOrderBy }: OrderByButtonProps) {
  if (order === 'ASC') {
    return (
      <button onClick={() => setOrderBy(id, 'DESC')}>
        <Icon icon="mdi:caret" />
      </button>
    )
  } else if (order === 'DESC') {
    return (
      <button onClick={() => setOrderBy()}>
        <Icon icon="mdi:caret" rotate={2} />
      </button>
    )
  } else {
    return (
      <button onClick={() => setOrderBy(id, 'ASC')}>
        <Icon icon="material-symbols:code" rotate={1} />
      </button>
    )
  }
}