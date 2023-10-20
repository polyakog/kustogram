import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://kustogram.site/api/v1/graphql',

  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure

  documents: ['./**/*.{ts,tsx}'],

  generates: {
    './assets/apollo/__generated__/': {
      preset: 'client',

      plugins: [],

      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },

  ignoreNoDocuments: true,
}

export default config
