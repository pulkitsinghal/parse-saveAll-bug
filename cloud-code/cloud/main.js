require('cloud/app.js');
var _ = require('underscore');

Parse.Cloud.afterSave("product", function(request) {
  'use strict';
  var product = request.object;

  var httpOptions = {
    url : 'http://mock.parseapp.com/hello', // simulate some sort of throttling or timeout in the external request
    method : 'GET',
    success : function(httpResponse) {
      console.log('operation response: ' + httpResponse.text);
    },
    error : function(httpResponse) {
      console.error('operation failed: ' + JSON.stringify(httpResponse,null,2));
    }
  }
  console.log(httpOptions.method + ' ' + httpOptions.url);
  Parse.Cloud.httpRequest(httpOptions);

});