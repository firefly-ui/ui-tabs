import Ember from 'ember';
import UiTabs from './ui-tabs';

const { registerTabContent } = UiTabs;
const { on, computed, observer, Component } = Ember;
const { alias } = computed;

export default Component.extend({
  classNames: ['ff-ui-tab-content'],

  attributeBindings: ['role', 'aria-labeledby'],

  // TODO: remove this, toggleVisibility won't fire w/o it though (?)
  classNameBindings: ['active'],

  role: 'tabcontent',

  tabList: alias('parentView.tabList'),

  tabContents: alias('parentView.tabContents'),

  // Tells screenreaders which tab labels this content.
  'aria-labeledby': alias('tab.elementId'),

  // Reference to this content's associated tab.
  tab: computed('tabList.tabs.@each', function() {
    let index = this.get('tabContents').indexOf(this);
    let tabs = this.get('tabList.tabs');

    return tabs && tabs.objectAt(index);
  }),

  // Tells whether or not this content is active.
  active: computed('tab.active', function() {
    return this.get('tab.active');
  }),

  // Shows or hides this content depending on whether or not its active.
  toggleVisibility: observer('active', function() {
    let display = this.get('active') ? '' : 'none';

    this.$().css('display', display);
  }),

  // Registers with the TabsComponent.
  registerWithTabs: on('didInsertElement', function() {
    this.get('parentView').registerTabContent(this);
  }),

  unregisterWithTabs: on('willDestroyElement', function() {
    this.get('parentView').unregisterTabContent(this);
  })
});
