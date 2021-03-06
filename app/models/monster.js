import DS from 'ember-data';
const { attr, belongsTo, hasMany, Model } = DS;

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
