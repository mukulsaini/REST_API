module.exports = function (app, passport) {

  app.post('/api/authenticate',
    passport.authenticate('localapikey', { failureRedirect: '/api/unauthorized', failureFlash: true }),
    function(req, res) {
       res.json({ message: "Authenticated" })
    });

    app.get('/api/unauthorized', function(req, res){
      res.json({ message: "Authentication Error" })
    });

}
