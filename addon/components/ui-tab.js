import Ember from 'ember';

const { on, computed, observer, Component } = Ember;
const { alias } = computed;

export default Component.extend({
  classNames: ['ff-ui-tab'],

  attributeBindings: ['role', 'aria-controls', 'aria-selected', 'aria-expanded', 'tabindex', 'selected'],

  role: 'tab',

  selected: computed('active', function() {
    return this.get('active') ? 'selected' : null;
  }),

  // Makes the selected tab keyboard tabbable, also prevents tabs from getting focus when clicked with a mouse.
  tabindex: computed('active', function() {
    return this.get('active') ? 0 : null;
  }),

  // Reference to the parent TabsComponent instance.
  tabs: alias('parentView.parentView'),

  // Reference to the parent TabListComponent instance.
  tabList: alias('parentView'),

  // Tells screenreaders which content this tab controls.
  'aria-controls': alias('tabContent.elementId'),


  // Tells screenreaders whether or not this tab is selected.
  'aria-selected': computed('active', function() {
    // coerce to ensure a "true" or "false" attribute value
    return this.get('active')+'';
  }),

  // Tells screenreaders whether or not this tabs content is expanded.
  'aria-expanded': alias('aria-selected'),

  // Whether or not this tab is selected.
  active: computed('tabs.activeTab', function() {
    return this.get('tabs.activeTab') === this;
  }),

  // Selects this tab, bound to click.
  select: on('click', function(options) {
    this.get('tabs').select(this);

    if (options && options.focus) {
      Ember.run.schedule('afterRender', this, function() {
        this.$().focus();
      });
    }
  }),

  // The index of this tab in the TabListComponent instance.
  index: computed('tabList.tabs.@each', function() {
    return this.get('tabList.tabs').indexOf(this);
  }),


  // Reference to the associated TabContent instance.
  tabContent: computed('tabs.tabContents.@each', function() {
    let index = this.get('index');
    let contents = this.get('tabs.tabContents');
    return contents && contents.objectAt(index);
  }),


  // Selects this tab when the TabsComponent selected-index property matches
  // the index of this tab. Mostly useful for query-params support.
  selectFromTabsSelectedIndex: on('didInsertElement', function() {
    observer('tabs.selected-index', function() {
      let activeTab = this.get('tabs.activeTab');

      if (activeTab === this) {
        return; // this was just selected
      }

      let index = parseInt(this.get('tabs.selected-index'), 10);
      let myIndex = this.get('index');

      if (index === myIndex) {
        this.select();
      }
    });
  }),

  // Registers this tab with the TabListComponent instance.
  registerWithTabList: on('didInsertElement', function() {
    this.get('tabList').registerTab(this);
  }),

  unregisterWithTabList: on('willDestroyElement', function() {
    this.get('tabList').unregisterTab(this);
  })
});
