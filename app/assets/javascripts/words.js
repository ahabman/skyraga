var ready;
ready = function() {

  console.log('list');

  var options = {
    valueNames: [ 'text', 'temp', 'clouds', 'pressure', 'wind', 'created_at' ]
  };

  var userList = new List('words_index', options);

};

$(document).ready(ready);
$(document).on('page:load', ready);