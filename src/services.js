import { env } from './env';

/**
 * Give an object logging functionality with correct
 * source line numbers.
 * @param {object} item - The object to recieve logging functionality.
 * @param {string} [prefix] - An optional prefix to append to
 *   log statements.
 * @param {boolean} [debug] - Turns on the debug (vebose) logging.
 */
export function loggerMixin(item, prefix, debug = true) {

  const bind = prefix
    ? level => console[level].bind(window.console, prefix)
    : level => console[level].bind(window.console);

  const noop = () => {};

  // Configurable log levels...
  ['debug', 'log', 'info'].forEach(level => {
    item[level] = debug ? bind(level) : noop;
  });

  // Always log the following...
  item.error = bind('error');
  item.warn = bind('warn');
}

/**
 * A base class you can extend to make new services.
 * It provides very basic event listener registration.
 * It also provides more accurate console log line numbers
 * if you use it's log functions.
 *
 * Example Usage:
 * ```js
 * import { ServiceBase } from '@thesoulfresh/utils';
 *
 * class MyService extends ServiceBase {
 *   authenticate(user) {
 *     try {
 *       this.log('Authenticating user...');
 *       this.emit('authenticated', user);
 *     } catch(e) {
 *       this.error('Failed to authenticate');
 *     }
 *   }
 * }
 *
 * const s = new MyService(GoogleAuth, true);
 * ```
 */
export class ServiceBase {
  /**
   * @param {*} client - Whatever object or function you
   *   consider the client used under the hood by your service.
   *   For example, this could be an Axios instance.
   * @param {boolean} [debug] - Whether to turn on verbose logging.
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

