import Model, { attr } from '@ember-data/model';

export default class AilmentModel extends Model {
  @attr('string') name;
  @attr('string') slug;

  get cssName() {
    let ailmentName = this.slug || 'unknown';
    return `is-ailment-${ailmentName}`;
  }
}
