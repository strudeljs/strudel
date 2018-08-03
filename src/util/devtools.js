import config from '../config';
import * as Strudel from '../index';

const devtools = window.__STRUDEL_DEVTOOLS_GLOBAL_HOOK__;

const mount = () => {
  setTimeout(() => {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Strudel);
      } else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.info(
          'Download the Strudel Devtools extension for a better development experience:\n' +
          'https://github.com/strudeljs/strudel-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && config.productionTip !== false) {
      console.info(
        'You are running Strudel in development mode.\n' +
        'Make sure to turn on production mode when deploying for production.'
      );
    }
  }, 0);
};

export default mount;

