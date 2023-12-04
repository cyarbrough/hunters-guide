import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  order: attr('number'),
  physiology: attr(),
  weaknesses: attr(),
  breakpoints: attr(),
  slug: attr('string'),

  ailments: hasMany('ailment'),
  species: belongsTo('species')
});
