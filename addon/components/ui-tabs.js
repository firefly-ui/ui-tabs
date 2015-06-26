import Ember from 'ember';

const { on, Component } = Ember;

export default Component.extend({
  classNames: ['ff-ui-tabs'],

  activeTab: null,

  tabContents: null,

  // Set this to the tab you'd like to be active. Usually it is bound to a
  // controller property that is used as a query parameter, but can be bound to
  // anything.
  'selected-index': 0,

  createTabContents: on('init', function() {
    this.set('tabContents', Ember.A([]));
  }),

  select(tab) {
    this.set('activeTab', tab);
    this.set('selected-index', tab.get('index'));
  },

  // Registers the TabListComponent instance
  registerTabList(tabList) {
    this.set('tabList', tabList);
  },

   // Registers TabContentComponent instances so related components can access them
  registerTabContents(tabContent) {
    this.get('tabContents').addObject(tabContent);
  },

  unregisterTabContents(tabContent) {
    this.get('tabContents').removeObject(tabContent);
  }
});
