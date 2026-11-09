/**
 * Host half of the dsh-pixel-whale-pet bundle.
 *
 * The whole pet is a browser decoration: this half only has to exist so the
 * Loader can mount the row and the Client module system can publish
 * `/plugins/dsh-pixel-whale-pet/client.js`. It registers no services and no tools.
 */
export function apply() {}
