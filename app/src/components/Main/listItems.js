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
    url: '/clients',
    icon: 'account_circle',
    name: 'Clientes',
  },
  {
    url: '/projects',
    icon: 'folder',
    name: 'Projetos',
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
