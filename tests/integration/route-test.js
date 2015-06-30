import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test, moduleFor } from 'ember-qunit';

let App;

const indexURL  = '/';

const firstTab = 'button:nth-child(1)';
const secondtTab = 'button:nth-child(2)';
const thirdTab = 'button:nth-child(3)';
const fourthTab = 'button:nth-child(4)';

const firstContent = '#new-york';
const secondContent = '#los-angeles';
const thirdContent = '#chicago';
const fourthContent = '#san-francisco';

moduleFor('route:application', 'integration:application', {
  beforeEach() {
    App = startApp();
  },

  afterEach() {
    Ember.run(App, 'destroy');
  }
});

test('tabs function as expected', function(assert) {
  assert.expect(24);

  return visit(indexURL).then(() => {
    assert.equal(find(firstContent).text(), 'Financial');
    assert.equal(find(secondContent).text(), 'Hollywood');
    assert.equal(find(thirdContent).text(), 'Chiraq');
    assert.equal(find(fourthContent).text(), 'Tech');

    assert.ok(find(firstContent).is(':visible'), 'displays correctly by user-provided default value');
    assert.ok(find(secondContent).is(':hidden'), 'content is hidden');
    assert.ok(find(thirdContent).is(':hidden'), 'content is hidden');
    assert.ok(find(fourthContent).is(':hidden'), 'content is hidden');

    return click(fourthTab);
  }).then(() => {
    assert.ok(find(firstContent).is(':hidden'), 'content is hidden');
    assert.ok(find(secondContent).is(':hidden'), 'content is hidden');
    assert.ok(find(thirdContent).is(':hidden'), 'content is hidden');
    assert.ok(find(fourthContent).is(':visible'), 'fourth content is showing');

    return click(thirdTab);
  }).then(() => {
    assert.ok(find(firstContent).is(':hidden'), 'content is hidden');
    assert.ok(find(secondContent).is(':hidden'), 'content is hidden');
    assert.ok(find(thirdContent).is(':visible'), 'third content is showing');
    assert.ok(find(fourthContent).is(':hidden'), 'content is hidden');

    return click(secondtTab);
  }).then(() => {
    assert.ok(find(firstContent).is(':hidden'), 'content is hidden');
    assert.ok(find(secondContent).is(':visible'), 'second content is showing');
    assert.ok(find(thirdContent).is(':hidden'), 'content is hidden');
    assert.ok(find(fourthContent).is(':hidden'), 'content is hidden');

    return click(firstTab);
  }).then(() => {
    assert.ok(find(firstContent).is(':visible'), 'first content is showing');
    assert.ok(find(secondContent).is(':hidden'), 'content is hidden');
    assert.ok(find(thirdContent).is(':hidden'), 'content is hidden');
    assert.ok(find(fourthContent).is(':hidden'), 'content is hidden');
  });
});
