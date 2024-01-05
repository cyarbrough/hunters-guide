import Model, { attr } from '@ember-data/model';

export default class SpeciesModel extends Model {
  @attr('string') name;
}
