require.config({
  //baseUrl: "../..",
  paths: {
    "relalg": '.', // Annoying work-around for the Ace WebWorker name-space thingy
    "bootstrap": "../../bower_components/bootstrap/dist/js/bootstrap",
    "jquery": "../../bower_components/jquery/jquery",
    "jqueryuitabs": "../../bower_components/jquery-ui/ui/tabs",
    "flight": "../../bower_components/flight",
    "d3": "../../bower_components/d3/d3",
    "deep-equal": "../../bower_components/deep-equal/index",
    "ace": "../../bower_components/ace/lib/ace",
    "core" : "../../bower_components/jquery-ui/ui/core",
    "widget" : "../../bower_components/jquery-ui/ui/widget"
  },
  shim: {
    'd3': {
      exports: 'd3'
    },
    'bootstrap': {
      deps: ['jquery']
    },
      'jqueryuitabs' : ['core']
  }
});

define(['flight/lib/debug'], function(DEBUG) {
  // DEBUG.enable(true)
  // DEBUG.events.logAll()
  require(['web/app'], function(initialize) {
    initialize()
  })
})