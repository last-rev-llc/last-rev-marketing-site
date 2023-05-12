import { AccordionClassKey } from '../components/Accordion';
import { CardClassKey } from '../components/Card';
import { CollectionAccordionClassKey } from '../components/CollectionAccordion';
import { CollectionCarouselClassKey } from '../components/CollectionCarousel';
import { CollectionClassKey } from '../components/Collection';
import { CollectionFilteredClassKey } from '../components/CollectionFiltered';
import { ContentModuleClassKey } from '../components/ContentModule';
import { ContentPreviewClassKey } from '../components/ContentPreview';
import { ErrorBoundaryClassKey } from '../components/ErrorBoundary';
import { FooterClassKey } from '../components/Footer';
import { HeaderClassKey } from '../components/Header';
import { HeroClassKey } from '../components/Hero';
import { ImageClassKey } from '../components/Image';
import { LinkClassKey } from '../components/Link';
import { MediaClassKey } from '../components/Media';
import { NavigationBarClassKey } from '../components/NavigationBar';
import { NavigationItemClassKey } from '../components/NavigationItem';
import { PageClassKey } from '../components/Page';
import { QuoteClassKey } from '../components/Quote';
import { SectionClassKey } from '../components/Section';
import { SEOClassKey } from '../components/SEO';
import { TableOfContentsClassKey } from '../components/TableOfContents';
import { TextClassKey } from '../components/Text';
import { PageBlogClassKey } from '../components/PageBlog';
// import { MailchimpFormClassKey } from '../components/MailchimpForm';
// import { BackToTopClassKey } from '../components/BackToTop';
// import { FormMarketoEmbedClassKey } from '../components/FormMarketoEmbed';

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    // BackToTop: BackToTopClassKey;
    // FormMarketoEmbed: FormMarketoEmbedClassKey;
    // MailchimpForm: MailchimpFormClassKey;
    Accordion: AccordionClassKey;
    Card: CardClassKey;
    Collection: CollectionClassKey;
    CollectionAccordion: CollectionAccordionClassKey;
    CollectionCarousel1: CollectionCarouselClassKey;
    CollectionFiltered: CollectionFilteredClassKey;
    ContentModule: ContentModuleClassKey;
    ContentPreview: ContentPreviewClassKey;
    ErrorBoundary: ErrorBoundaryClassKey;
    Footer: FooterClassKey;
    Header: HeaderClassKey;
    Hero: HeroClassKey;
    Image: ImageClassKey;
    Link: LinkClassKey;
    Media: MediaClassKey;
    NavigationBar: NavigationBarClassKey;
    NavigationItem: NavigationItemClassKey;
    Page: PageClassKey;
    PageBlog: PageBlogClassKey;
    Quote: QuoteClassKey;
    Section: SectionClassKey;
    SEO: SEOClassKey;
    TableOfContents: TableOfContentsClassKey;
    Text: TextClassKey;
  }
}
