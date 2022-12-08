const contentfulLoader = ({ src, width, quality }: any) => {
  if (src?.includes('.svg')) return src;
  let fetchUrl = `${src}`;

  // webp supports animated gifs, png and jpeg
  const options = ['fm=webp', `q=75`];
  if (quality) options.push(`q=${quality}`);
  if (width && (fetchUrl?.includes('ctfassets') || fetchUrl?.includes('contentful'))) {
    if (width) options.push(`w=${Math.round(width)}`);
    fetchUrl = fetchUrl?.includes('?') ? `${fetchUrl}&${options.join('&')}` : `${fetchUrl}?${options.join('&')}`;
  }
  return fetchUrl;
};

export default contentfulLoader;
