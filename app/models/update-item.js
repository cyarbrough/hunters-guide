import Model, { attr } from '@ember-data/model';

export default Model.extend({
  date: attr('string'),
  title: attr('string'),
});
