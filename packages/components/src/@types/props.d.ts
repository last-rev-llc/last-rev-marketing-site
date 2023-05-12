import { AccordionProps } from '../components/Accordion';
import { CardProps } from '../components/Card';
import { ContentModuleProps } from '../components/ContentModule';
import { ErrorBoundaryProps } from '../components/ErrorBoundary';
import { SEOProps } from '../components/SEO';
import { ContentPreviewProps } from '../components/ContentPreview';
import { NavigationItemProps } from '../components/NavigationItem';
import { TextProps } from '../components/Text';
import { ImageProps } from '../components/Image';
import { LinkProps } from '../components/Link';
import { HeaderProps } from '../components/Header';
import { HeroProps } from '../components/Hero';
import { MediaProps } from '../components/Media';
import { SectionProps } from '../components/Section';
import { CollectionProps } from '../components/Collection';
import { CollectionCarouselProps } from '../components/CollectionCarousel';
import { CollectionFilteredProps } from '../components/CollectionFiltered';
import { CollectionAccordionProps } from '../components/CollectionAccordion';
import { NavigationBarProps } from '../components/NavigationBar';
import { QuoteProps } from '../components/Quote';
import { PageProps } from '../components/Page';
import { TableOfContentsProps } from '../components/TableOfContents';
import { FooterProps } from '../components/Footer';
import { PageBlogProps } from '../components/PageBlog';

declare module '@mui/material/styles' {
  export interface ComponentsPropsList {
    // BackToTop: BackToTopProps;
    // Custom components
    // FormMarketoEmbed: FormMarketoEmbedProps;
    // MailchimpForm: MailchimpFormProps;
    Accordion: AccordionProps;
    Card: CardProps;
    Collection: CollectionProps;
    CollectionAccordion: CollectionAccordionProps;
    CollectionCarousel1: CollectionCarouselProps;
    CollectionFiltered: CollectionFilteredProps;
    ContentModule: ContentModuleProps;
    ContentPreview: ContentPreviewProps;
    ErrorBoundary: ErrorBoundaryProps;
    Footer: FooterProps;
    Header: HeaderProps;
    Hero: HeroProps;
    Image: ImageProps;
    Link: LinkProps;
    Media: MediaProps;
    NavigationBar: NavigationBarProps;
    NavigationItem: NavigationItemProps;
    Page: PageProps;
    Quote: QuoteProps;
    Section: SectionProps;
    SEO: SEOProps;
    TableOfContents: TableOfContentsProps;
    Text: TextProps;
    PageBlog: PageBlogProps;
  }
}
