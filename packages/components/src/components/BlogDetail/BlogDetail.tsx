import React from 'react';
import Head from 'next/head';
import xss from 'xss';
import { Box, Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import styled from '@mui/system/styled';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import Media, { MediaProps } from '@last-rev/component-library/dist/components/Media';
import Text from '@last-rev/component-library/dist/components/Text';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link';
import sidekick from '@last-rev/contentful-sidekick-util';
import { ContentModule } from '@last-rev/component-library';

export interface BlogProps {
  __typename?: string;
  sidekickLookup?: any;
  title?: string;
  creationDate?: string;
  slug?: string;
  featuredMedia?: Array<MediaProps>;
  author?: any;
  body?: any;
  quote?: string;
  tags?: any;
  relatedLinks?: LinkProps[];
  contents?: any;
}

export const BlogDetail = ({
  title,
  creationDate,
  slug,
  featuredMedia,
  author,
  body,
  quote,
  tags,
  relatedLinks,
  sidekickLookup,
  contents
}: BlogProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': `${title}`,
    'image': featuredMedia ? `${featuredMedia[0]?.file?.url}` : null,
    'keywords': `${tags}`,
    'url': `https://www.lastrev.com/blogs/${slug}`,
    'author': {
      '@type': 'Person',
      'name': `${author}`
    }
  };

  return (
    <ErrorBoundary>
      <Head>
        <meta name="content_type" content="blog" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${xss(JSON.stringify(schemaData))}` }} />
      </Head>
      <Root {...sidekick(sidekickLookup)} itemScope itemType="https://schema.org/Blog">
        <ContentContainer maxWidth={'xl'}>
          <Grid container spacing={5} sx={{ py: { lg: 4 } }}>
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
                  variant="h5"
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
                  <Media {...featuredMedia[0]} {...sidekick(sidekickLookup?.featuredMedia)} />
                </MediaWrap>
              ) : null}
              {body ? <Text variant="blog" sidekickLookup={sidekickLookup?.body} body={body} /> : null}
              <ContentsWrapper sx={{ py: 3 }}>
                {contents?.map((content: any) => (
                  <ContentModule key={content?.id} {...content} />
                ))}
              </ContentsWrapper>
            </Grid>

            <Grid component="aside" item xs={12} sm={3} sx={{}}>
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
                  {relatedLinks ? (
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
                            <Link {...(link as any)} />
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}
                  {tags ? (
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
                            <Link text={tag} href={`/blogs?tags=${tag}`} />
                            {i !== tags.length - 1 ? ', ' : ''}
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}
                </List>
              </Box>
            </Grid>
          </Grid>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Blog',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({
  display: 'block'
}));

const BlogHeader = styled(Box, {
  name: 'Section',
  slot: 'BlogHeader'
})<{ variant?: string }>(({ theme }) => ({
  'display': 'flex',
  'flexDirection': 'column-reverse',
  'justifyContent': 'center',
  'padding': theme.spacing(3, 1),
  'background': 'black',
  'textAlign': 'center',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 2)
  },
  [theme.breakpoints.up('xl')]: {
    flexDirection: 'row-reverse'
  },
  '& .MuiTypography-root': {
    color: 'white',
    // TODO: adjust h3 font size
    fontSize: '1.6rem'
  }
}));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    padding: theme.spacing(0, 4)
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2)
  }
}));

const MediaWrap = styled(Box, {
  name: 'Wrap',
  slot: 'MediaWrap'
})<{ variant?: string }>(({ theme }) => ({
  'paddingTop': theme.spacing(4),
  'paddingBottom': theme.spacing(4),
  '& img': {
    'width': '100%',
    'min-height': '50vh'
  },
  '& iframe': {
    'width': '100%',
    'min-height': '50vh'
  },
  [theme.breakpoints.down('md')]: {
    'paddingTop': theme.spacing(2),
    'paddingBottom': theme.spacing(2),
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
  name: 'Blog',
  slot: 'ContentsWrapper',
  overridesResolver: (_, styles) => [styles.contentsWrapper]
})<{ variant?: string }>(() => ({}));

export default BlogDetail;