import Mixin from '@ember/object/mixin';
import config from 'hunters-guide/config/environment';

const TITLE = 'Hunter\'s Field Guide';

export default Mixin.create({
  /**
   * Base Variables
   */
  headTags: null,
  title: TITLE,

  afterModel() {
    this.setHeadTags();
  },

  /**
   * Sets various head meta tags
   * @param {string} titlePre string to prepend to base title
   */
  setHeadTags(titlePre = '') {
    let bgColor = '#DDDDDD',
      description = 'Mobile Field Guide for Monster Hunter: World',
      routeUrl = this.get('router.url').replace('/', ''),
      siteName = 'Hunter\'s Field Guide',
      tags,
      title = TITLE,
      url = `${config.webUrl}${routeUrl}`,
      urlFav = url + 'assets/images/icons/app/favicon.png',
      urlImg = url + 'assets/images/icons/palico.png';

    if(titlePre) {
      title = `${titlePre} :: ${title}`;
    }

    console.log(title);

    tags = [
      // Icon Links
      {
        type: 'link',
        tagId: 'apple-touch-icon',
        attrs: {
          rel: 'apple-touch-icon',
          href: url + 'assets/images/icons/app/apple-touch-icon.png',
          sizes: '180x180'
        }
      },
      {
        type: 'link',
        tagId: 'icon32',
        attrs: {
          rel: 'icon',
          href: urlFav,
          sizes: '32x32',
          type: 'image/png'
        }
      },
      {
        type: 'link',
        tagId: 'icon16',
        attrs: {
          rel: 'icon',
          href: urlFav,
          sizes: '16x16',
          type: 'image/png'
        }
      },
      {
        type: 'link',
        tagId: 'mask-icon',
        attrs: {
          rel: 'mask-icon',
          href: url + 'assets/images/icons/app/safari-pinned-tab.svg'
        }
      },
      {
        type: 'link',
        tagId: 'manifest',
        attrs: {
          rel: 'manifest',
          href: url + 'manifest.webmanifest'
        }
      },
      // Basic Meta
      {
        type: 'title',
        tagId: 'title',
        content: title
      },
      {
        type: 'meta',
        tagId: 'meta-title',
        attrs: {
          name: 'title',
          content: title
        }
      },
      {
        type: 'meta',
        tagId: 'meta-description',
        attrs: {
          name: 'description',
          content: description
        }
      },
      {
        type: 'meta',
        tagId: 'theme-color',
        attrs: {
          name: 'theme-color',
          content: bgColor
        }
      },
      // Apple Meta
      {
        type: 'meta',
        tagId: 'apple-mobile-web-app-title',
        attrs: {
          name: 'apple-mobile-web-app-title',
          content: title
        }
      },
      {
        type: 'meta',
        tagId: 'apple-mobile-web-app-capable',
        attrs: {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        }
      },
      // MS Meta
      {
        type: 'meta',
        tagId: 'application-name',
        attrs: {
          name: 'application-name',
          content: title
        }
      },
      {
        type: 'meta',
        tagId: 'msapplication-TileColor',
        attrs: {
          name: 'msapplication-TileColor',
          content: bgColor
        }
      },
      // Facebook Meta
      {
        type: 'meta',
        tagId: 'facebook-title',
        attrs: {
          name: 'og:title',
          content: title
        }
      },
      {
        type: 'meta',
        tagId: 'facebook-site-name',
        attrs: {
          name: 'og:site_name',
          content: siteName
        }
      },
      {
        type: 'meta',
        tagId: 'facebook-url',
        attrs: {
          name: 'og:url',
          content: url
        }
      },
      {
        type: 'meta',
        tagId: 'facebook-image',
        attrs: {
          name: 'og:image',
          content: urlImg
        }
      },
      {
        type: 'meta',
        tagId: 'facebook-description',
        attrs: {
          name: 'og:description',
          content: description
        }
      },
      // Twitter Meta
      {
        type: 'meta',
        tagId: 'twitter-card',
        attrs: {
          name: 'twitter:card',
          content: 'summary'
        }
      },
      {
        type: 'meta',
        tagId: 'twitter-site',
        attrs: {
          name: 'twitter:site',
          content: url
        }
      },
      {
        type: 'meta',
        tagId: 'twitter-title',
        attrs: {
          name: 'twitter:title',
          content: title
        }
      },
      {
        type: 'meta',
        tagId: 'twitter-description',
        attrs: {
          name: 'twitter:description',
          content: description
        }
      },
      {
        type: 'meta',
        tagId: 'twitter-image',
        attrs: {
          name: 'twitter:image',
          content: urlImg
        }
      }
    ];

    this.set('headTags', tags);
    this.set('title', title);
  }
});
