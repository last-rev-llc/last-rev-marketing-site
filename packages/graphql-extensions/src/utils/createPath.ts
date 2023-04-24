const createPath = (...slug: string[]) => {
  let path = slug.join('/').replace(/\/\//g, '/');
  if (path[0] !== '/') path = '/' + path;
  if (path != '/' && path[path.length - 1] === '/') path = path.slice(0, -1);
  console.log('returning path', path);

  return path;
};

export default createPath;
