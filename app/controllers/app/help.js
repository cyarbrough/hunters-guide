import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class HelpController extends Controller {
  @service store;
  /**
   * Sample list of ailments
   */
  get ailmentList() {
    let store = this.store;

    return [
      store.peekRecord('ailment', 'fireBlight'),
      store.peekRecord('ailment', 'poison'),
    ];
  }
}
