exports.config = {
  namespace: 'intraway-ui',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ],
  globalStyle: 'src/global/css/main.css'
};
