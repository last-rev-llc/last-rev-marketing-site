import { lorem } from 'faker';
import { LinkProps } from './Link';

export default (): LinkProps => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'gradient',
  href: '/contact',
  text: 'Contact Us',
  iconPosition: 'Right'
});
