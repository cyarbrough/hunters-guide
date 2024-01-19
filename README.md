# Hunter's Guide: an Ember.js Demo

Mobile Hunter's Guide for Monster Hunter World written in Ember.js 

See in action at: https://hunters-guide.herokuapp.com/

Intended to support the video game Monster Hunter World, the Hunter's Guide provides the monster information from within the game reformatted into an easy-to-use mobile interface. This enables the user to quickly reference information while playing, without having to stop to use the in-game guides.

## Features

* Written in Ember 3.0, and upgraded to Ember 4.12 (LTS)
* Responsive mobile design that is compatible with tablets and desktops
* Imports data from local data file, using AJAX & JSON API
  * Features 80+ data groups, supported by child and parent relationships
  * Searchable by monster name or species name
    * Search queries appear in the url, enabling users to share specific information
  * Sort Alphabetically or "Guide Order"
* Components to help with code clarity & re-use, following the Data Down Actions Up (DDAU) paradigm for data preservation
  * Loads select routes within Side Panel component
  * Header component to handle search & update alert
  * Quick reference monster icons that can be toggled for advanced information
    * Supporting components to help visualize data
* Analytic tracking on page routes, user actions, & search actions to determine usage stats (disabled during upgrade)

### Routes:
* Main
  * features the main data visuals for quick reference
* Updates Route (in Side Panel)
  * Checks user's last visit to display update alert
    * User settings panel to set sort order
  * Cookies to remember or forget current user settings, last visit (for update alert)
* Help Route (in Side Panel)
  * Reference guide to help interpret data provided by the game

### Todo
* Enable analytic tracking
* Test rework
