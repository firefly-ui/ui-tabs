import Ember from 'ember';

const { on, computed, Component } = Ember;
const { alias } = computed;

export default Component.extend({
  classNamews: ['ff-ui-tab-list'],

  attributeBindings: ['role', 'aria-multiselectable'],

  role: 'tablist',

   //Tells screenreaders that only one tab can be selected at a time
  'aria-multiselectable': false,

  activeTab: alias('parentView.activeTab'),

  registerWithTabs: on('didInsertElement', function() {
    this.get('parentView').registerTabList(this);
  }),

  tabs: null,

  createTabs: on('init', function() {
    this.set('tabs', Ember.A([]));
  }),

  // Add a tab to tabs array
  registerTab(tab) {
    this.get('tabs').addObject(tab);
  },

  unregisterTab(tab) {
    let tabs = this.get('tabs');
    let index = tab.get('index');
    let parent = this.get('parentView');
    tabs.removeObject(tab);

    if (parent.get('activeTab') == tab) {
      if (tabs.get('length') === 0) {
        return;
      }

      index = (index === 0) ? index : index - 1;
      tab = tabs.objectAt(index);
      parent.select(tab);
    }
  },

  // Keyboard navigation
  navigateOnKeyDown: on('keyDown', function(event) {
    let key = event.keyCode;

    if (key == 37 /*<*/ || key == 38 /*^*/) {
      this.selectPrevious();
    } else if (key == 39 /*>*/ || key == 40 /*v*/) {
      this.selectNext();
    } else {
      return;
    }
    event.preventDefault();
  }),

  activeTabIndex: computed('activeTab', function() {
    return this.get('tabs').indexOf(this.get('activeTab'));
  }),

  selectNext() {
    let index = this.get('activeTabIndex') + 1;

    if (index == this.get('tabs.length')) {
      index = 0;
    }
    this.selectTabAtIndex(index);
  },

  selectPrevious() {
    let index = this.get('activeTabIndex') - 1;

    if (index == -1) {
      index = this.get('tabs.length') - 1;
    }
    this.selectTabAtIndex(index);
  },

  selectTabAtIndex(index) {
    let tab = this.get('tabs').objectAt(index);
    tab.select({ focus: true });
  }
});
