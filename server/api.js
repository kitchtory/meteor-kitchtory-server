var postRoutes = Picker.filter(function(req, res) {
  // you can write any logic you want.
  // but this callback does not run inside a fiber
  // at the end, you must return either true or false
  return req.method == "POST";
});


postRoutes.route('/api/barcode', function(params, req, res, next) {
  //console.log(params.code)
    req.on('data', Meteor.bindEnvironment(function(chunk) {
      obj = JSON.parse(chunk);
      Kitctory.insert({barcode:obj.barcode, added:obj.scanned,location:obj.location})
    }));
  
     req.on('end', function() {
      // empty 200 OK response for now
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.end("Woo");
    });
});