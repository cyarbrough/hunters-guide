import Model, { attr } from '@ember-data/model';

export default class UpdateItemModel extends Model {
  @attr('string') date;
  @attr('string') title;

  get formattedDate() {
    const date = new Date(this.date);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }
}
