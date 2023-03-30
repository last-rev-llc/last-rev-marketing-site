const createHeadingId = (text: string) => {
  const id = text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\-_\s]/g, '')
    .split(' ')
    .reduce((accum, txt) => {
      return (accum ? accum + '-' : '') + txt;
    }, '');

  return id || '';
};

export default createHeadingId;
