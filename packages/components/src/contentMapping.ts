import dynamic from 'next/dynamic';

import Section from './components/Section';
// import Card from './components/Card';
import Collection from './components/Collection';
import PageBlog from './components/PageBlog';

const Card = dynamic(() => import('./components/Card'));
const CollectionAccordion = dynamic(() => import('./components/CollectionAccordion'));

const NavigationBar = dynamic(() => import('./components/NavigationBar'));

const Media = dynamic(() => import('./components/Media'));

const Link = dynamic(() => import('./components/Link'));

const NavigationItem = dynamic(() => import('./components/NavigationItem'));

const Header = dynamic(() => import('./components/Header'));

const Hero = dynamic(() => import('./components/Hero'));

const Text = dynamic(() => import('./components/Text'));

const Footer = dynamic(() => import('./components/Footer'));

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop'));

// Custom components
const CollectionFiltered = dynamic(() => import('./components/CollectionFiltered'));

// Custom components
const Quote = dynamic(() => import('./components/Quote'));
const Page = dynamic(() => import('./components/Page'));
const CollectionCarousel = dynamic(() => import('./components/CollectionCarousel'));

const contentMapping: {
  [key: string]: any;
} = {
  Page,
  Header,
  Section,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:accordion': CollectionAccordion,
  'Collection:filtered': CollectionFiltered,
  'Collection:navigation-bar': NavigationBar,
  BackToTop,
  Card,
  Text,
  Media,
  Link,
  NavigationItem,
  Hero,
  Quote,
  Footer,
  PageBlog
};

export default contentMapping;
