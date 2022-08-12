import { join, resolve } from 'path'

import dotenv from 'dotenv'
import type { GatsbyConfig } from 'gatsby'

import config from './store.config'

dotenv.config({ path: 'vtex.env' })

// async function getVtexIdclientAutCookie(store: string, key: string, token: string) {
//   const vtexIdResponse: any = await fetch('http://api.vtexcommercestable.com.br/api/vtexid/apptoken/login?an=' + store, {
//     method: 'POST',
//     body: JSON.stringify({
//       'appkey': key,
//       'apptoken': token
//     }),
//   })
//   const vtedIdResponseJSON: any = await vtexIdResponse.json()
//   return vtedIdResponseJSON.token
// }

const gatsbyConfig: GatsbyConfig = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: 'GatsbyStore',
    description: 'Fast Demo Store',
    titleTemplate: '%s | FastStore',
    author: 'Store Framework',
    siteUrl: config.storeUrl,
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          esModule: true,
          modules: {
            namedExport: false,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Fast Demo Store',
        short_name: 'GatsbyStore',
        start_url: '/',
        icon: 'src/images/icon.png',
        background_color: '#E31C58',
        theme_color: '#ffffff',
        display: 'standalone',
        cache_busting_mode: 'none',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.NODE_ENV || 'development',
        env: {
          production: {
            policy: [
              {
                userAgent: '*',
                allow: '/',
                disallow: ['/checkout/*'],
              },
            ],
          },
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        defer: true,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#E31C58',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: resolve('./src'),
        '@generated': resolve('./@generated'),
      },
    },
    {
      resolve: 'gatsby-plugin-bundle-stats',
      options: {
        compare: true,
        baseline: true,
        html: true,
        json: true,
        outDir: `.`,
        stats: {
          context: join(__dirname, 'src'),
        },
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analyser.html',
      },
    },
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
    },
    {
      resolve: 'gatsby-plugin-netlify',
    },
    {
      resolve: 'gatsby-plugin-postcss',
    },
    // {
    //   resolve: '@vtex/gatsby-plugin-cms',
    //   options: {
    //     tenant: 'tmehdimarketplace',
    //     workspace:'master',
    //     environment: 'vtexcommercestable',
    //   },
    // }
    // Simple config, passing URL
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // Arbitrary name for the remote schema Query type
    //     typeName: "SWAPI",
    //     // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
    //     fieldName: "swapi",
    //     // Url to query from
    //     url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    //   },
    // },
    // VTEX GraphQL
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // Arbitrary name for the remote schema Query type
    //     typeName: "VTEX",
    //     // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
    //     fieldName: "vtex",
    //     // Url to query from
    //     url: "https://app.io.vtex.com/vtex.billing/v0/tmehdimarketplace/tmehdi2/_v/graphql",
    //     //headers: {
    //       //'X-VTEX-API-AppKey': 'vtexappkey-tmehdimarketplace-FMCJNP',
    //       //'X-VTEX-API-AppToken': 'UVYYNRZZKARXMIEVRBYURLJDOQILOTHVQMNTUNXLEBEXMXRQEATOJBULHLHVGOFDCBJZANKALLQZRMBPGJJQQPBFSZKIEUNSCUFJUNDYYQTBCFVMSLXXAJSNAMJINOOX',
    //       //'X-VTEX-API-AppKey': 'vtexappkey-vtex-SAOFUH',
    //       //'X-VTEX-API-AppToken': 'XQQJFBKCVBBVXDLLUVXMVDTEDXYWKRNOTMHKSHBOQUCCWZAFMQCRENRXDMJGQUCYCUARBIURCUQDCDBFYLGDUDORMLXXIEAOCBZMKGUQTQHHFAOFBCDZVLJNXDQGQJJZ',
    //     //},
    //     headers: async () => {
    //       return {
    //         'Authorization': await getVtexIdclientAutCookie('tmehdimarketplace', 'vtexappkey-tmehdimarketplace-FMCJNP', 'UVYYNRZZKARXMIEVRBYURLJDOQILOTHVQMNTUNXLEBEXMXRQEATOJBULHLHVGOFDCBJZANKALLQZRMBPGJJQQPBFSZKIEUNSCUFJUNDYYQTBCFVMSLXXAJSNAMJINOOX'),
    //       }
    //     },
    //   },
    // },
  ],
}

export default gatsbyConfig
