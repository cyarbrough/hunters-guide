import Mixin from '@ember/object/mixin';
import config from 'hunters-guide/config/environment';

export default Mixin.create({
  headTags() {
    let description = 'Mobile Hunter\'s Guide for Monster Hunter: World',
      siteName = 'Hunter\'s Guide',
      title = 'Hunter\'s Guide',
      url = config.webUrl,
      urlImg = url + 'assets/images/icons/palico.png';

    return [
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
          name: 'title',
          content: title
        }
      },
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
      },
      {
        type: 'link',
        attrs: {
          rel: 'icon',
          type: 'image/png',
          content: url + 'assets/images/icons/paw.png'
        }
      }
    ];
  }
});
