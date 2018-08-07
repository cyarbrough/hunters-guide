import DS from 'ember-data';
const { attr, Model } = DS;

export default Model.extend({
  date: attr('string'),
  title: attr('string')
});
