import Mixin from '@ember/object/mixin';
import config from 'hunters-guide/config/environment';

export default Mixin.create({
  headTags() {
    let bgColor = '#DDDDDD',
      description = 'Mobile Hunter\'s Guide for Monster Hunter: World',
      siteName = 'Hunter\'s Guide',
      title = 'Hunter\'s Guide',
      url = config.webUrl,
      urlFav = url + 'assets/images/icons/app/favicon.png',
      urlImg = url + 'assets/images/icons/palico.png';

    return [
      // Icon Links
      {
        type: 'link',
        attrs: {
          rel: 'apple-touch-icon',
          href: url + 'assets/images/icons/app/apple-touch-icon.png',
          sizes: '180x180'
        }
      },
      {
        type: 'link',
        attrs: {
          rel: 'icon',
          href: urlFav,
          sizes: '32x32',
          type: 'image/png'
        }
      },
      {
        type: 'link',
        attrs: {
          rel: 'icon',
          href: urlFav,
          sizes: '16x16',
          type: 'image/png'
        }
      },
      {
        type: 'link',
        attrs: {
          rel: 'mask-icon',
          href: url + 'assets/images/icons/app/safari-pinned-tab.svg'
        }
      },
      {
        type: 'link',
        attrs: {
          rel: 'manifest',
          href: url + 'manifest.webmanifest'
        }
      },
      // Basic Meta
      {
        type: 'meta',
        attrs: {
          name: 'title',
          content: title
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'description',
          content: description
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'theme-color',
          content: bgColor
        }
      },
      // Apple Meta
      {
        type: 'meta',
        attrs: {
          name: 'apple-mobile-web-app-title',
          content: title
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        }
      },
      // MS Meta
      {
        type: 'meta',
        attrs: {
          name: 'application-name',
          content: title
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'msapplication-TileColor',
          content: bgColor
        }
      },
      // Facebook Meta
      {
        type: 'meta',
        attrs: {
          name: 'og:title',
          content: title
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'og:site_name',
          content: siteName
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'og:url',
          content: url
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'og:image',
          content: urlImg
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'og:description',
          content: description
        }
      },
      // Twitter Meta
      {
        type: 'meta',
        attrs: {
          name: 'twitter:card',
          content: 'summary'
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'twitter:site',
          content: url
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'twitter:title',
          content: title
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'twitter:description',
          content: description
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'twitter:image',
          content: urlImg
        }
      }
    ];
  }
});
