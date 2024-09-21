/** @type {import('@hey-api/openapi-ts').UserConfig} */
export default {
  client: '@hey-api/client-axios',
  input: 'https://axiom-api.punitarani.com/openapi.json',
  output: {
    format: 'biome',
    path: 'lib/api',
  },
}
