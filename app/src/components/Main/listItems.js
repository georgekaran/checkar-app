import React from 'react';
import ListItemLink from './ListItemLink'

const items = [
  {
    url: '/home',
    icon: 'home',
    name: 'Home',
  },
  {
    url: '/users',
    icon: 'people',
    name: 'Usuários',
  },
  {
    url: '/companys',
    icon: 'folder',
    name: 'Empresas',
  },
  {
    url: '/typesUser',
    icon: 'folder',
    name: 'Perfis',
  },
  {
    url: '/typesVehicle',
    icon: 'folder',
    name: 'Tipos de veículos',
  },
  {
    url: '/typesItem',
    icon: 'folder',
    name: 'Tipos de items',
  },
  {
    url: '/items',
    icon: 'folder',
    name: 'Items',
  },
  {
    url: '/vehicles',
    icon: 'folder',
    name: 'Veículos',
  },
]

export const mainListItems = (
  <div>
    {items.map((item, index) => (
      <ListItemLink
        key={index}
        button
        to={item.url}
        icon={item.icon}
        primary={item.name} />
    ))}
  </div>
);
