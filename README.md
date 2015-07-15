# Ui-tabs

Basic tabbed interface.

## Usage
This Ember addon provides a `ui-tab` component.

Pass in a target which is the ID of the associated element. Current tab is required as your app will pass in the current tab information back to the component.

**Example:**
Template:
```
<div class="container">
  {{#ui-tab on-click="setCurrentTab" currentTab=currentTab target="#tab-one" default=true}}Tab One{{/ui-tab}}
  {{#ui-tab on-click="setCurrentTab" currentTab=currentTab target="#tab-two"}}Tab Two{{/ui-tab}}
  {{#ui-tab on-click="setCurrentTab" currentTab=currentTab target="#tab-three"}}Tab Three{{/ui-tab}}
  {{#ui-tab on-click="setCurrentTab" currentTab=currentTab target="#tab-four"}}Tab Four{{/ui-tab}}
</div>

<p id="tab-one">Tab One</p>
<p id="tab-two">Tab Two</p>
<p id="tab-three">Tab Three</p>
<p id="tab-four">Tab Four</p>
```


Include the action 'setCurrentTab' in your controller to set the current tab.
Controller:
```
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setCurrentTab(tab) {
      this.set('currentTab', tab);
    }
  }
});
```

## Styles
The component `ui-tab` component is easily customizable for your application.  
