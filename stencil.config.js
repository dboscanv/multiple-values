exports.config = {
  namespace: 'multiple-values',
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
