import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class MonsterModel extends Model {
  @attr('string') name;
  @attr('number') order;
  @attr physiology;
  @attr weaknesses;
  @attr breakpoints;
  @attr('string') slug;

  @hasMany('ailment', { async: false, inverse: null }) ailments;
  @belongsTo('species', { async: false, inverse: null }) species;
}
