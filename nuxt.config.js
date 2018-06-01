module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'Enecuum | %s | Blockchain of tomorrow',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'Enecuum is a decentralized environment that aims to integrate blockchain technologies into both business and state structures. The technologies used in the project allow for solving various tasks: fintech, banking, document processing, insurance, logistics, IoT, DApps, ICO and more.'
      },
      {"http-equiv": 'X-UA-Compatible', content: 'ie=edge'},
      {name: 'msapplication-TileColor', content: '#00add9'},
      {name: 'theme-color', content: '#ffffff'},
      //OG
      {property: "og:type", content: "business.business"},
      {property: "og:title", content: "Enecuum | ENQ | Blockchain of Tomorrow"},
      {property: "og:url", content: "https://enecuum.com/"},
      {property: "og:image", content: "head/favicon-32x32.png"},
      //twitter card
      {name: "twitter:card", content: "summary_large_image"},
      {name: "twitter:site", content: "@"},
      {
        name: "twitter:description",
        content: "Enecuum is a decentralized environment that aims to integrate blockchain technologies into both business and state structures. The technologies used in the project allow for solving various tasks: fintech, banking, document processing, insurance, logistics, IoT, DApps, ICO and more."
      },
      {name: "twitter:image", content: "head/favicon-32x32.png"}
    ],
    link: [
      {rel: 'icon', type: "image/x-icon", href: 'head/favicon.ico'},
      {rel: 'apple-touch-icon', sizes: "180x180", href: 'head/apple-touch-icon.png'},
      {rel: 'icon', type: 'image/png', sizes: "16x16", href: 'head/favicon-16x16.png'},
      {rel: 'icon', type: 'image/png', sizes: "32x32", href: 'head/favicon-32x32.png'},
      {rel: 'icon', type: 'image/png', sizes: "192x192", href: 'head//android-chrome-192x192.png'},
      {rel: 'icon', type: 'image/png', sizes: "194x194", href: 'head/favicon-194x194.png'},
      {rel: 'manifest', href: 'head/site.webmanifest'},
      {rel: 'mask-icon', color: '00add9', href: 'head/safari-pinned-tab.svg'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#00add3'},
  /*
  ** Build configuration
  */
  build: {
    analyze: false,
    vendor: ['element-ui', 'axios'],
  },
  plugins: [
    '~plugins/element-ui',

    {
      src: '~plugins/a.js',
      ssr: false
    }
  ],
  css: [
    '~/assets/style.scss',
    '~/assets/opensans.css',
    'font-awesome/css/font-awesome.css'
  ],
  /*
  ** Run ESLint on save
  */
  extend(config, {isDev, isClient}) {
    if (isDev && isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
