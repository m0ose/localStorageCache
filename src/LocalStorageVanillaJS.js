

function loadText(filename, callback, dataType ) {

  callback = callback || function(e){}

  localforage.getItem(filename).then( function(e){
    if (e == null) { //not found locally
      // Load it from the network
      var request = new XMLHttpRequest();

      if( dataType ){
         request.responseType = dataType;
      }

      request.open('GET', filename, true);
      //request.responseType = 'arraybuffer';

      // When the AJAX state changes, save the thing locally.
      request.addEventListener('readystatechange', function() {
        //console.log(request)
        if (request.readyState === 4) { // readyState DONE
          if (request.status === 200) {
            // We store the binary data as-is; this wouldn't work with localStorage.
            localforage.setItem(filename, request.response, function() {
              console.log(filename, 'saved')
              // Photo has been saved, do whatever happens next!
            });

            callback(request.response)
          } else {
            console.error('failed to load', filename)
            callback(null, request.statusText)
          }
        }
      });

      request.send()
    } else { // Found it locally.
      console.log('found ', filename, ' locally . woopie')
      callback(e)
    }
  })
}

var loadImg = function(filename, callback ) {

  callback = callback || function(){}

  localforage.getItem(filename).then(
    function(e) {

      if (e == null) { //not found locally
        // Load image over the network
        var img = new Image()
        img.crossOrigin = '';

        img.onload = function() {
          var urldata = getURLencode(img)
          localforage.setItem(filename, urldata).then(
            function(e) {
              callback(img)
            }
          )
        }

        // call onerror if the image can't be found
        img.onerror = function(e) {
          console.error('image failed to load')
          callback(null, e)
        }

        img.src = filename
      } else { //found image locally
        console.log('found ', filename , " locally")
        var img = new Image()

        img.onload = function() {
          callback(img)
        }

        img.onerror = function(e) {
          callback(null, e)
        }
        // assume it is url encoded              
        img.src = e
      }
    })
}

var getURLencode = function(img) {
  var canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  // Get '2d' context and draw the image.
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  // Get canvas data URL
  var data = canvas.toDataURL();
  return data
}