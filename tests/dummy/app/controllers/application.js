import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setCurrentTab(tab) {
      this.set('currentTab', tab);
    }
  }
});
