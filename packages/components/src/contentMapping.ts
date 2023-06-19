import dynamic from 'next/dynamic';

import Section from './components/Section';
// import Card from './components/Card';
// import Collection from './components/Collection';
import PageBlog from './components/PageBlog';

const Card = dynamic(() => import('./components/Card'));
const CardMedia = dynamic(() => import('./components/CardMedia'));
const Collection = dynamic(() => import('./components/Collection'));
const CollectionAccordion = dynamic(() => import('./components/CollectionAccordion'));

const NavigationBar = dynamic(() => import('./components/NavigationBar'));

const Media = dynamic(() => import('./components/Media'));

const Link = dynamic(() => import('./components/Link'));

const NavigationItem = dynamic(() => import('./components/NavigationItem'));

const Header = dynamic(() => import('./components/Header'));
import HeaderNavLink from './components/Header/HeaderNavLink';
import HeaderNavGroup from './components/Header/HeaderNavGroup';
import HeaderNavLinkNested from './components/Header/HeaderNavLinkNested';

const Hero = dynamic(() => import('./components/Hero'));
const Block = dynamic(() => import('./components/Block'));

const Text = dynamic(() => import('./components/Text'));

const GlobalFooter = dynamic(() => import('./components/GlobalFooter'));

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop'));

const TableOfContents = dynamic(() => import('./components/TableOfContents'));

// Custom components
const CollectionFiltered = dynamic(() => import('./components/CollectionFiltered'));

const CalendlyInlineWidget = dynamic(() => import('./components/CalendlyInlineWidget'));
const Person = dynamic(() => import('./components/Person'));

// Custom components
const Quote = dynamic(() => import('./components/Quote'));
const Page = dynamic(() => import('./components/Page'));
const CollectionCarousel = dynamic(() => import('./components/CollectionCarousel'));
const Topic = dynamic(() => import('./components/PageTopic'));

const contentMapping: {
  [key: string]: any;
} = {
  Page,
  Header,
  Section,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:carouselOnePerRow': CollectionCarousel,
  'Collection:carouselTwoPerRow': CollectionCarousel,
  'Collection:carouselThreePerRow': CollectionCarousel,
  'Collection:carouselFourPerRow': CollectionCarousel,
  'Collection:accordion': CollectionAccordion,
  'Collection:filtered': CollectionFiltered,
  'Collection:navigation-bar': NavigationBar,
  BackToTop,
  Card,
  'Card:mediaFill': CardMedia,
  'Card:mediaContained': CardMedia,
  'Card:mediaSquare': CardMedia,
  Text,
  Media,
  Link,
  'ModuleIntegration:calendly-inline-widget': CalendlyInlineWidget,
  'ModuleIntegration:hub-inline-widget': CalendlyInlineWidget,
  NavigationItem,
  'NavigationItem:headerLink': HeaderNavLink,
  'NavigationItem:headerLinkNested': HeaderNavLinkNested,
  'NavigationItem:headerGroup': HeaderNavGroup,
  Hero,
  Quote,
  'Footer': GlobalFooter,
  Block,
  Person,
  PageBlog,
  Topic,
  TableOfContents
};

export default contentMapping;
