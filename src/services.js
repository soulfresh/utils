// react-dom disables the window.console functions at various points during its
// lifecycle (grrrr) which in turn breaks our ability to bind to window.console
// functions. As a work around, we make references to the individual functions
// so we can still bind to them if React has moved them from window.console.
const windowConsole = window.console;
// Functions we want to enable when the debug flag is on.
const debugFunctions = [
  'debug',
  'log',
  'info',
  'trace',
  'assert',
  'clear',
  'count',
  'dir',
  'table',
  'group',
  'groupCollapsed',
  'profile',
  'profileEnd',
  'time',
  'timeEnd',
  'timeLog'
];
// Functions we want to always enable.
const errorFunctions = ['warn', 'error'];
const localConsole = [...debugFunctions, ...errorFunctions].reduce((acc, level) => {
  acc[level] = window.console[level];
  return acc;
}, {});

const noop = () => {};

/**
 * Give an object logging functionality with correct
 * source line numbers.
 * @param {object} item - The object to recieve logging functionality.
 * @param {string} [prefix] - An optional prefix to append to
 *   log statements.
 * @param {boolean} [debug] - Turns on the debug (vebose) logging.
 *
 * @property {function} debug
 * @property {function} log
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 *
 * @mixin
 */
export function loggerMixin(item, prefix, debug = true) {
  const bind = prefix
    ? level => localConsole[level].bind(windowConsole, prefix)
    : level => localConsole[level].bind(windowConsole);

  // Configurable log levels...
  debugFunctions.forEach(level => {
    item[level] = debug ? bind(level) : noop;
  });

  // Always log the following...
  errorFunctions.forEach(level => {
    item[level] = bind(level);
  });
}

// Exported below because jsDoc doesn't document the class otherwise.
class ServiceBase {
  /**
   * A base class you can extend to make new services.
   * It provides very basic event listener registration.
   * It also provides more accurate console log line numbers
   * if you use it's log functions.
   *
   * Example Usage:
   * ```js
   *     import { ServiceBase } from '@thesoulfresh/utils';
   *
   *     class MyService extends ServiceBase {
   *       authenticate(user) {
   *         try {
   *           this.log('Authenticating user...');
   *           this.emit('authenticated', user);
   *         } catch(e) {
   *           this.error('Failed to authenticate');
   *         }
   *       }
   *     }
   *
   *     const s = new MyService(GoogleAuth, true);
   * ```
   *
   * @param {*} client - Whatever object or function you
   *   consider the client used under the hood by your service.
   *   For example, this could be an Axios instance.
   * @param {boolean} [debug] - Whether to turn on verbose logging.
   * @mixes loggerMixin
   */
  constructor(client, debug) {
    this.client = client;
    this.listeners = [];

    // Setup configurable logging.
    const prefix = `[${this.constructor.name}]`;
    loggerMixin(this, prefix, debug);
  }

  /**
   * Add a listener for a specific event.
   * @param {string} name - The name of the event to listen for.
   * @param {function} listener - The callback function called when
   *   the associated event is emitted.
   */
  addEventListener(name, listener) {
    this.listeners.push({name, listener});
  }

  /**
   * Remove a listener for a specific event.
   * @param {string} name - The name of the event to listen for.
   * @param {function} listener - The callback function that was listening.
   */
  removeEventListener(name, listener) {
    this.listeners = this.listeners.filter(l => l.name === name && l.listener === listener);
  }

  /**
   * Emit an event with optional data.
   * @param {string} name - The name of the event to listen for.
   * @param {...*} [data] - The data to pass to the event listeners.
   */
  emit(name, ...data) {
    this.listeners.forEach(l => {
      if (l.name === name) {
        l.listener(...data);
      }
    });
  }
}

export { ServiceBase };

