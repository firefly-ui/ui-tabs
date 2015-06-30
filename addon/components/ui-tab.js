import Ember from 'ember';

const { computed, observer, Component } = Ember;
const { alias } = computed;

export default Component.extend({
  tagName: 'button',

  classNames: ['ff-tab'],

  classNameBindings: ['active'],

  role: 'tab',

  attributeBindings: ['aria-controls', 'aria-selected', 'aria-expanded'],

  // Tells screenreaders which panel this tab controls.
  'aria-controls': alias('target'),

  // Tells screenreaders whether or not this tab is selected.
  'aria-selected': computed('active', function() {
    return this.get('active') + '';
  }),

  // Tells screenreaders whether or not this tabs content is expanded.
  'aria-expanded': alias('aria-selected'),

  active: computed('currentTab', {
    get() {
      return this.get('currentTab') === this.get('target');
    }
  }).readOnly(),

  displayContent: observer('active', function() {
    const contentElement = this.get('target');

    if (this.get('active')) {
      Ember.$(contentElement).show();
    } else {
      Ember.$(contentElement).hide();
    }
  }),

  click() {
    this.sendAction('on-click', this.get('target'));
  },

  didInsertElement() {
    if (this.get('default')) {
      this.sendAction('on-click', this.get('target'));
    }
  }
});
