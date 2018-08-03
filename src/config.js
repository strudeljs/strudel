export default {
  /**
   * Class added on components when initialised
   */
  initializedClassName: 'strudel-init',
  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',
  /**
   * Whether to show production mode tip message on boot
   */
  productionTip: process.env.NODE_ENV !== 'production'
};
