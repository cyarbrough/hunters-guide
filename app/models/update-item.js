import Model, { attr } from '@ember-data/model';

export default class UpdateItemModel extends Model {
  @attr('string') date;
  @attr('string') title;
}
