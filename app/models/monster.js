import DS from 'ember-data';
const { attr, belongsTo, hasMany, Model } = DS;

export default Model.extend({
  name: attr('string'),
  moreLink: attr('string'),
  physiology: attr(),
  slug: attr('string'),

  ailments: hasMany('ailment'),
  species: belongsTo('species')
});
