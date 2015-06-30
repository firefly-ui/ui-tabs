# Ui-tabs

Basic tabbed interface.

## How to use

* Include the latest version in your `package.json`.
* Components render buttons that will control their associated content.
* Pass in a `target`, which is the id of the associated content element.
* `on-click="setCurrentTab"` is required as the action will bubble up in your application.
* `currentTab=currentTab` is required as your app will pass in the current tab information back to the component.
* Include the action, `setCurrentTab`, in your actions hash (controller) to set the current tab.
  * `setCurrentTab(tab) { this.set('currentTab', tab); }`

## Options

* You can specify the default content by passing in `default=true`.
* i.e. `{{#ui-tab on-click="setCurrentTab" currentTab=currentTab target="#id" default=true}}Button1{{/ui-tab}}`
