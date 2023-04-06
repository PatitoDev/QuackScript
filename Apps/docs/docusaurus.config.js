// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'QuackScript',
  titleDelimiter: '🦆',
  tagline: 'The new JS killer',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://dev.niv3kelpato.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    path: 'i18n',
    locales: ['en', 'es', 'quack'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      quack: {
        label: 'Duck Lang',
        path: 'quack'
      },
      es: {
        label: 'Espanol',
        path: 'es'
      },
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true
      },
      image: 'img/QuackScriptLogoHorizontal.png',
      navbar: {
        title: '',
        logo: {
          href: '/',
          alt: 'The JS killer',
          src: 'img/QuackScriptLogoHorizontal.png',
        },
        items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/niv3k-el-pato/quackscript',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/quackscript',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/quackscript',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/niv3k-el-pato/quackscript',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} QuackScript`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'typescript',
      },
    }),
};

module.exports = config;
