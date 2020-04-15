# Basics

  1. Vue Instance
  2. Attribute Binding
  3. Conditional Rendering
  4. List Rendering (iterate over object)
  5. Event Handling
  6. Class & Style Binding
  7. Computed Properties
  8. Components
  9. Communicating Events
  10. Forms

## Vue Instance

  1. How to begin writing a Vue application with a Vue instance, and how to load basic data onto the webpage.
  2. The Vue instance is the root of every Vue application
  3. The Vue instance plugs into an element in the DOM
  4. The Vue instance’s data can be displayed using the mustache-like syntax {{ }} called an expression.
  5. Vue is reactive

## Attribute binding
  
  1. Data can be bound to HTML attributes.
  2. Syntax is v-bind: or : for short.
  3. The attribute name that comes after the : specifies the attribute we’re binding data to.
  4. Inside the attribute’s quotes, we reference the data we’re binding to.

## Conditional Rendering

  1. There are Vue directives to conditionally render elements:
    * v-if
    * v-else-if
    * v-else
    * v-show
  2. If whatever is inside the directive’s quotes is truthy, the element will display.
  3. You can use expressions inside the directive’s quotes.
  4. V-show only toggles visibility, it does not insert or remove the element from the DOM.

## List Rendering

  1. The v-for directive allows us to iterate over an array to display data.
  2. We use an alias for the element in the array being iterated on, and specify the name of the array we are looping through. Ex: v-for="item in items"
  3. We can loop over an array of objects and use dot notation to display values from the objects.
  4. When using v-for it is recommended to give each rendered element its own unique key.

## Event Handling

  1. The v-on directive is used to allow elements to listen for events
  2. The shorthand for v-on is @
  3. You can specify the type of event to listen for:
    * click
    * mouseover
    * any other DOM event
  4. The v-on directive can trigger a method
  5. Triggered methods can take in arguments
  6. this refers to the current Vue instance’s data as well as other methods declared inside the instance

## Class and Style Binding

  1. Data can be bound to an element’s style attribute
  2. Data can be bound to an element’s class
  3. We can use expressions inside an element’s class binding to evaluate whether a class should appear or not

## Computed Properties

  1. Computed properties calculate a value rather than store a value.
  2. Computed properties can use data from your app to calculate its values.
  3. Computed properties are cached, meaning the result is saved until its dependencies change.

## Components

  1. Components are blocks of code, grouped together within a custom element
  2. Components make applications more manageable by breaking up the whole into reusuable parts that have their own structure and behavior
  3. Data on a component must be a function
  4. Props are used to pass data from parent to child
  5. We can specify requirements for the props a component is receiving
  6. Props are fed into a component through a custom attribute
  7. Props can be dynamically bound to the parent’s data
  8. Vue dev tools provide helpful insight about your components
  9. https://medium.com/js-dojo/7-ways-to-define-a-component-template-in-vuejs-c04e0c72900d

## Communicating Events

  1. A component can let its parent know that an event has happened with $emit
  2. A component can use an event handler with the v-on directive ( @ for short) to listen for an event emission, which can trigger a method on the parent
  3. A component can $emit data along with the announcement that an event has occurred
  4. A parent can use data emitted from its child

## Forms

  1. https://vuejs.org/v2/guide/events.html#Event-Modifiers
  2. We can use the v-model directive to create two-way binding on form elements
  3. We can use the .number modifier to tell Vue to cast that value as a number, but there is a bug with it
  4. We can use the .prevent event modifier to stop the page from reloading when the form is submitted
  5. We can use Vue to do fairly simple custom form validation
  6. https://vuejs.org/v2/cookbook/form-validation.html#Another-Example-of-Custom-Validation
  7. https://vuejs.org/v2/guide/forms.html#Modifiers
  8. https://vuejs.org/v2/guide/events.html#Event-Modifiers
  9. https://vuejs.org/v2/cookbook/form-validation.html#Another-Example-of-Custom-Validation
