function isDev() {
  const env = global.process.env.NODE_ENV || ``;
  return env.toLowerCase().indexOf(`dev`) !== -1;
}
