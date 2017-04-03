module.exports = function (app, passport) {

  var jsonfile = require('jsonfile'); // TO read and write json files

  /*
   *  curl -v -d "apikey=asdasjsdgfjkjhg" http://127.0.0.1:3000/api/authenticate
   *  curl -v -H "apikey=asdasjsdgfjkjhg" http://127.0.0.1:3000/api/authenticate
   */

  app.get('/api/electricity',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized', failureFlash: true }),
    function(req, res) {
        /*
         * Emission factor(EF) for electricity in UK = 0.58982 kgCO2e/kWh
         * use (kWh/yr) * EF (kg CO2e/kWh) = emissions (kg CO2e/yr)
         */
         var EF = 0;
         var file = './routes/api/res/countryEF.json';
         jsonfile.readFile(file, function(err, obj) {
           if (err) {
             console.log(err);
           }
           EF = obj["electricity"][req.query.country];
           // console.log(EF);
           var emissions = req.query.use * EF;
           res.status(200).json({ emissions : emissions });
         });
    });

    app.get('/api/naturalGas',
      passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized', failureFlash: true }),
      function(req, res) {
          /*
           * Emission factor(EF) for naturalGas in UK = 0.22674 kgCO2e/kWh
           * use (therms/yr) * EF (kg CO2e/therms) = emissions (kg CO2e/yr)
           */
           var EF = 0;
           var file = './routes/api/res/countryEF.json';
           jsonfile.readFile(file, function(err, obj) {
             if (err) {
               console.log(err);
             }
             EF = obj["naturalGas"][req.query.country];
             // console.log(EF);
             var emissions = req.query.use * EF;
             res.status(200).json({ emissions : emissions });
           });
      });

  app.route('/api/authenticate')
      .post(
        passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized', failureFlash: true }),
        function(req, res) {
           res.json({ message: "Authenticated" })
        });

        app.route('/api/authenticate')
            .get(
              passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized', failureFlash: true }),
              function(req, res) {
                 res.json({ message: "Authenticated" })
              });

    app.get('/api/unauthorized', function(req, res){
      res.json({ message: "Authentication Error" })
    });

}
