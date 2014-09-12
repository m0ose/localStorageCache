localStorageCache
=================

This is a wrapper around localforage. It allows easy caching of files. The first time it gets a file it caches it in indexDB.

Usage:
===============
```javascript
    // Load an image
    //
    loadImg("../data/data.png", function(e, er) {
      if(!er){
        //do something with the image
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

Try the test script:
====================
[http://m0ose.github.io/localStorageCache/html/test.html](http://m0ose.github.io/localStorageCache/html/test.html)


