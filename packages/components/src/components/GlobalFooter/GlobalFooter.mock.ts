export default {
  logo: {
    file: {
      url: './Logo.svg'
    },
    title: 'LastRev logo'
  },
  logoUrl: 'https://lastrev.com',
  navigationItems: [
    {
      __typename: 'NavigationItem',
      id: 'home',
      text: 'Home',
      href: '/'
    },
    {
      __typename: 'NavigationItem',
      id: 'privacy',
      text: 'Privacy',
      href: '/privacy'
    },
    {
      __typename: 'NavigationItem',
      id: 'terms',
      text: 'Terms',
      href: '/terms'
    }
  ],
  sidekickLookup: {}
};
