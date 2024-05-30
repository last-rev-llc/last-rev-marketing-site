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
const Form = dynamic(() => import('./components/Form'));

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop'));

const TableOfContents = dynamic(() => import('./components/TableOfContents'));

// Custom components
const CollectionFiltered = dynamic(() => import('./components/CollectionFiltered'));

const CalendlyInlineWidget = dynamic(() => import('./components/CalendlyInlineWidget'));
const Chat = dynamic(() => import('./components/Chat'));
const ChatFullPage = dynamic(() => import('./components/ChatFullPage'));

// Custom components
const Quote = dynamic(() => import('./components/Quote'));
const Page = dynamic(() => import('./components/Page'));
const CollectionCarousel = dynamic(() => import('./components/CollectionCarousel'));
const Topic = dynamic(() => import('./components/PageTopic'));

const contentMapping: {
  [key: string]: any;
} = {
  'Collection:accordion': CollectionAccordion,
  'Collection:carousel': CollectionCarousel,
  'Collection:filtered': CollectionFiltered,
  'Collection:navigation-bar': NavigationBar,
  'ModuleIntegration:calendly-inline-widget': CalendlyInlineWidget,
  'ModuleIntegration:chat': Chat,
  'ModuleIntegration:chatFullPage': ChatFullPage,
  BackToTop,
  Card,
  Collection,
  Footer,
  Header,
  Hero,
  Link,
  Media,
  NavigationItem,
  Page,
  PageBlog,
  Quote,
  Section,
  TableOfContents,
  Text,
  Topic,
  Form
};

export default contentMapping;
