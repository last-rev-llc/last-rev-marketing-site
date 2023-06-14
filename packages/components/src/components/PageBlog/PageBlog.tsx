import React from 'react';
import Head from 'next/head';
import styled from '@mui/system/styled';
import { kebabCase } from 'lodash';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import Text from '../Text';
import { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';
import sidekick from '@last-rev/contentful-sidekick-util';

import Link from '../Link';

export interface PageBlogProps {
  __typename?: string;
  sidekickLookup?: any;
  title?: string;
  creationDate?: string;
  slug?: string;
  featuredMedia?: Array<MediaProps>;
  author?: any;
  body?: any;
  quote?: string;
  tags?: Array<string>;
  relatedLinks?: LinkProps[];
  contents?: any;
  header: any;
  footer: any;
  topics?: any;
  landingPageSummary?: string;
  seo: any;
}

export const PageBlog = ({
  header,
  footer,
  slug,
  title,
  creationDate,
  featuredMedia,
  author,
  body,
  quote,
  tags,
  topics,
  relatedLinks,
  sidekickLookup,
  contents,
  seo
}: PageBlogProps) => {
  // Transforms date to expected format for schema
  // -> Ex. from 02/12/2023 to 2023-12-02
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const dateCreated = creationDate && regex.test(creationDate) ? creationDate.replace(regex, '$3-$2-$1') : creationDate;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'image': featuredMedia
      ? featuredMedia[0]?.file?.url
      : 'https://images.ctfassets.net/imglmb3xms7o/1VUPTATYD3ZMlFk4KQDJxl/12006d2bc2c51df42430a4765aff7042/Lastrev_logotype_trimmed.svg',
    'keywords': `${seo?.keywords.value ?? tags ?? 'Technology'}`,
    'url': `https://www.lastrev.com/blog/${slug}`,
    'author': {
      '@type': 'Person',
      'name': author ?? 'LastRev'
    },
    'dateCreated': dateCreated
  };

  return (
    <ErrorBoundary>
      <Head>
        <meta name="content_type" content="blog" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>
      {header ? <ContentModule {...(header as any)} /> : null}
      <Root {...sidekick(sidekickLookup)} itemScope itemType="https://schema.org/Blog">
        <ContentContainer maxWidth={'xl'}>
          <Grid container spacing={5} sx={{ py: { lg: 4 } }} justifyContent="center">
            <Grid component="article" item xs={12} sm={9}>
              {title ? (
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{ color: 'primary.main' }}
                  {...sidekick(sidekickLookup?.title)}>
                  {title}
                </Typography>
              ) : null}

              {creationDate ? (
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: 'black', paddingTop: 1 }}
                  {...sidekick(sidekickLookup?.creationDate)}>
                  {creationDate}
                </Typography>
              ) : null}

              {author ? (
                <Typography variant="body1" component="p" {...sidekick(sidekickLookup?.author)}>
                  {author}
                </Typography>
              ) : null}

              {featuredMedia ? (
                <MediaWrap>
                  <ContentModule {...featuredMedia[0]} {...sidekick(sidekickLookup?.featuredMedia)} />
                </MediaWrap>
              ) : null}

              {body ? <Text variant="blog" sidekickLookup={sidekickLookup?.body} body={body} /> : null}

              {contents ? (
                <ContentsWrapper sx={{ py: 3 }}>
                  {contents?.map((content: any) => (
                    <ContentModule key={content?.id} {...content} />
                  ))}
                </ContentsWrapper>
              ) : null}
            </Grid>

            <Grid
              component="aside"
              item
              xs={12}
              sm={3}
              sx={{}}
              // NOTE: Hidden for now per request
              display="none">
              {quote ? (
                <Box
                  component="blockquote"
                  sx={{
                    margin: 0,
                    padding: { xs: 2, xl: 4 },
                    backgroundColor: 'quartiary.main'
                  }}>
                  <Typography
                    variant="h1"
                    component="p"
                    sx={{
                      paddingTop: 3,
                      paddingBottom: 0,
                      color: 'secondary.main',
                      fontSize: { xs: '2rem', lg: '3rem' },
                      fontStyle: 'normal',
                      lineHeight: 0
                    }}>
                    “
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      padding: { xs: '0 8px', xl: '0 24px' },
                      fontSize: { xs: '1rem', sm: '0.9rem', lg: '1.1rem' }
                    }}
                    {...sidekick(sidekickLookup?.quote)}>
                    {quote}
                  </Typography>
                </Box>
              ) : null}

              <Box
                sx={{
                  padding: { xs: 2, md: 2, xl: 4 },
                  position: 'sticky',
                  top: 132, // Header height + 32px
                  backgroundColor: 'tertiary.main'
                }}>
                <List
                  sx={{
                    '& .MuiListItem-root': {
                      'flexDirection': 'column',
                      'alignItems': 'flex-start',
                      'padding': '0 8px',
                      'color': 'white',
                      '&:not(:last-child)': {
                        paddingBottom: { xs: 3, xl: 5 },
                        borderBottom: '2px solid',
                        borderColor: 'primary.main'
                      },
                      '&:not(:first-of-type)': {
                        paddingTop: { xs: 4, sm: 3, xl: 4 }
                      },
                      // <ArrowForwardIosIcon/> hover
                      '& li:hover > svg': {
                        backgroundColor: 'primary.main'
                      }
                    },
                    '& .MuiListItemText-root': {
                      width: '100%',
                      paddingBottom: 0
                    },
                    'a': {
                      'color': 'white',
                      'textDecoration': 'none',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline'
                      }
                    }
                  }}>
                  <ListItem>
                    <ListItemText
                      primary="Share"
                      primaryTypographyProps={{
                        variant: 'h3',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                    <ul
                      style={{
                        listStyle: 'none',
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '0'
                      }}>
                      <li>
                        <Link
                          href={`mailto:?subject=Check out this article&body=Check out this article:+${title}+${schemaData.url}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <EmailIcon sx={{ marginRight: 2, fontSize: '2.5rem' }} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`https://twitter.com/share?url=${schemaData.url}&text=Check this article:+${title}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <TwitterIcon sx={{ fontSize: '2.5rem' }} />
                        </Link>
                      </li>
                    </ul>
                  </ListItem>

                  {!!relatedLinks?.length ? (
                    <ListItem>
                      <ListItemText
                        primary="Learn more"
                        primaryTypographyProps={{
                          variant: 'h3',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0
                        }}
                        {...sidekick(sidekickLookup?.relatedLinks)}>
                        {relatedLinks?.map((link, i) => (
                          <li
                            key={link?.id}
                            style={{
                              display: 'flex',
                              marginBottom: i !== relatedLinks.length - 1 ? 16 : undefined
                            }}>
                            <Link {...(link as any)} variant="text" />
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}

                  {!!topics?.length ? (
                    <ListItem>
                      <ListItemText
                        primary="Topics"
                        primaryTypographyProps={{
                          fontWeight: 'bold',
                          variant: 'h3',
                          color: 'white'
                        }}
                      />
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexWrap: 'wrap',
                          padding: '0'
                        }}
                        {...sidekick(sidekickLookup?.topics)}>
                        {topics.map((topic: any, i: React.Key | null | undefined) => (
                          <li
                            key={i}
                            style={{ whiteSpace: 'nowrap', marginRight: i !== topics.length - 1 ? 5 : undefined }}>
                            <Link href={`/blog/${topic?.slug}`}>{topic?.title}</Link>
                            {i !== topics.length - 1 ? ', ' : ''}
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}

                  {!!topics?.length ? (
                    <ListItem>
                      <ListItemText
                        primary="Topics"
                        primaryTypographyProps={{
                          fontWeight: 'bold',
                          variant: 'h3',
                          color: 'white'
                        }}
                      />
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexWrap: 'wrap',
                          padding: '0'
                        }}
                        {...sidekick(sidekickLookup?.topics)}>
                        {topics.map((topic: any, i: React.Key | null | undefined) => (
                          <li
                            key={i}
                            style={{ whiteSpace: 'nowrap', marginRight: i !== topics.length - 1 ? 5 : undefined }}>
                            <Link href={`/blog/${topic?.slug}`}>{topic?.title}</Link>
                            {i !== topics.length - 1 ? ', ' : ''}
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}

                  {!!tags?.length ? (
                    <ListItem>
                      <ListItemText
                        primary="Tags"
                        primaryTypographyProps={{
                          fontWeight: 'bold',
                          variant: 'h3',
                          color: 'white'
                        }}
                      />
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexWrap: 'wrap',
                          padding: '0'
                        }}
                        {...sidekick(sidekickLookup?.tags)}>
                        {tags.map((tag: string, i: React.Key | null | undefined) => (
                          <li
                            key={tag}
                            style={{ whiteSpace: 'nowrap', marginRight: i !== tags.length - 1 ? 5 : undefined }}>
                            <Link text={tag} href={`/blog?tags=${kebabCase(tag.toLowerCase())}`} />
                            {i !== tags.length - 1 ? ', ' : ''}
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}

                  <Box my={4}>
                    <form name="email-subscribe" method="POST" data-netlify="true">
                      <InputLabel htmlFor="email-input" sx={{ py: 1 }}>
                        <TextField
                          id="email-input"
                          label="Email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          sx={{
                            '&::placeholder': {
                              color: 'red'
                            }
                          }}
                        />
                      </InputLabel>
                      <Button type="submit" variant="contained" disableElevation size="small">
                        Send
                      </Button>
                    </form>
                  </Box>
                </List>
              </Box>
            </Grid>
          </Grid>
        </ContentContainer>
      </Root>
      {footer ? <ContentModule {...(footer as any)} /> : null}
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'PageBlog',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(({ theme }) => ({
  display: 'block',

  [theme.breakpoints.down('lg')]: {
    paddingTop: theme.spacing(4)
  }
}));

const ContentContainer = styled(Container, {
  name: 'PageBlog',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  padding: theme.spacing(0, 2),

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 4)
  }
}));

const MediaWrap = styled(Box, {
  name: 'PageBlog',
  slot: 'MediaWrap'
})<{ variant?: string }>(({ theme }) => ({
  'marginTop': theme.spacing(4),
  'marginBottom': theme.spacing(4),

  '& img': {
    'width': '100%',
    'min-height': '50vh'
  },

  '& iframe': {
    'width': '100%',
    'min-height': '50vh'
  },

  [theme.breakpoints.down('md')]: {
    'marginTop': theme.spacing(2),
    'marginBottom': theme.spacing(2),

    '& img': {
      'min-height': 'auto'
    },

    '& iframe': {
      'width': '100%',
      'min-height': '50vh'
    }
  }
}));

const ContentsWrapper = styled(Box, {
  name: 'PageBlog',
  slot: 'ContentsWrapper',
  overridesResolver: (_, styles) => [styles.contentsWrapper]
})<{ variant?: string }>(() => ({}));

export default PageBlog;
