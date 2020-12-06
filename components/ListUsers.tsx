import * as React from 'react'
import ListUser from './ListUser'
import { User } from '../interfaces'

type Props = {
  items: User[]
}

const ListUsers = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListUser data={item} />
      </li>
    ))}
  </ul>
)

export default ListUsers