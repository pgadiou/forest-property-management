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

![Lot addition gif](http://g.recordit.co/fd8tW5w5P1.gif)

* display the stages of the registration process of a new `property` through a `registration process` virtual field (handled using a custom field)

![registration process](https://github-ressources.s3.eu-west-3.amazonaws.com/Screenshot+2021-06-14+at+15.04.56.png)

* add new `repartition keys` to the `property` (handled using a custom action)
## Data model
The following explains the data model used in this example:

![data model](https://github-ressources.s3.eu-west-3.amazonaws.com/Screenshot+2020-11-09+at+20.08.57.png)
## Features implemented
* virtual relationship between a `property` and `lots` (through `buildings`) => check out the `forest/properties.js` and `routes/properties.js` file
* virtual relationship between a `property` and `owners` (through `buildings` and `lots`) => check out the `forest/properties.js` and `routes/properties.js` file
* custom action to add new `buildings` to a `property` => check out the `forest/properties.js` and `routes/properties.js` file
* custom action to add new `lots` and `owners` to a `property` => check out the `forest/properties.js` and `routes/properties.js` file
* custom action to add new `repartition keys` to a `property` => check out the `forest/properties.js` and `routes/properties.js` file
* custom field `registration process` to display the stages of the registration process => check out the `forest/properties.js` file
* custom field `property label` to display the name and city address of the property => check out the `forest/properties.js` file
