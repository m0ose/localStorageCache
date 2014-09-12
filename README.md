localStorageCache
=================

This is a wrapper around localforage. It allows easy caching of files. The first time it gets a file it caches it in indexDB.

Usage:
===============
```javascript
    // Load an image
    //
    loadImg("../data/data.png", function(e, er) {
      //do something with the image
    
      if(!er){
        document.body.appendChild(e)
      }
    })
    
    // Load a text file
    //
    loadText("somefile.json", function(e, er) {
      if(er){
        console.warn('error',er)
      }
      else{
        var jsn = JSON.parse(e)
        console.log(jsn)
      }
    })

```

