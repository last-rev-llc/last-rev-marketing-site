import { HeaderProps } from './Header';
import collectionMock from '../Collection/Collection.mock';
import navigationItemMock from '../NavigationItem/NavigationItem.mock';

const collection = collectionMock();
collection.items = [navigationItemMock(), navigationItemMock(), navigationItemMock()];

export default (): HeaderProps => ({
  __typename: 'Header',
  variant: 'standard',
  logo: {
    __typename: 'Media',
    file: {
      url: './Logo.svg'
    },
    title: 'LastRev logo'
  },
  logoLink: '/',
  navigationItems: [
    {
      id: 'collection',
      __typename: 'Collection',
      items: [
        {
          __typename: 'NavigationItem',
          id: 'home',
          text: 'Home',
          href: '/'
        },
        {
          __typename: 'NavigationItem',
          id: 'about',
          text: 'About',
          href: '/about'
        },
        {
          __typename: 'NavigationItem',
          id: 'solutions',
          text: 'Solutions',
          href: '/solutions'
        },
        {
          __typename: 'NavigationItem',
          id: 'blog',
          text: 'Blog',
          href: '/blog'
        },
        {
          __typename: 'Link',
          id: 'contact',
          variant: 'button-contained',
          href: '/contact',
          text: 'Contact Us'
        }
      ]
    }
  ],
  actions: undefined
});
