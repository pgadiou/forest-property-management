# forest-property-management
Example of a property management use case handled with Forest Admin

![Image of the UI](http://g.recordit.co/CMKczSl14n.gif)


## Use cases presentation
As a user, I want to handle the registration of new `properties` (including all related data like `buildings` and `lots`) through a simple interface built in Forest Admin.
The features that need to be available are:
* create a new `property` (handled using the native create form)

![Property creation gif](http://g.recordit.co/JYktiHXBLa.gif)

* add `buildings` to the `property` (handled using a custom action)

![Building addition gif](https://recordit.co/sXK4nhYwWP/gif)

* add `lots` to one of the `property`'s buildings and link it to an existing `owner`/ create a new `owner` (handled using a custom action)
* add new `repartition keys` to the `property` (handled using a custom action)
## Data model
The following explains the data model used in this example:
[to be updated]
## Features implemented
* virtual relationship between a `property` and `lots` (through `buildings`) => check out the `forest/properties.js` and `routes/properties.js` file
* virtual relationship between a `property` and `owners` (through `buildings` and `lots`) => check out the `forest/properties.js` and `routes/properties.js` file
* custom action to add new `buildings` to a `property` => check out the `forest/properties.js` and `routes/properties.js` file
* custom action to add new `lots` and `owners` to a `property` => check out the `forest/properties.js` and `routes/properties.js` file
* custom action to add new `repartition keys` to a `property` => check out the `forest/properties.js` and `routes/properties.js` file
