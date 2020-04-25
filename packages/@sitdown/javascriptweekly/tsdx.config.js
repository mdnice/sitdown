// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const plugin = {
    name: 'replace',
    renderChunk(code) {
        return code
            .replace(/sitdown\/dist\/src.esm/g, 'sitdown/dist/src.cjs.development');
    },
}
module.exports = {
    // This function will run for each entry/format/env combination
    rollup(config, options) {
        if (options.format === 'cjs') {
            config.plugins.push(plugin);
        }
        return config; // always return a config.
    },
};