var passport = require('passport')
 , LocalStrategy = require('passport-localapikey').Strategy;

 module.exports = function(passport){

   var users = [
       { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com',apikey: 'asdasjsdgfjkjhg' }
     , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com',apikey: 'gfsdgsfgsfg' }
   ];

   function findByApiKey(apikey, fn) {
     for (var i = 0, len = users.length; i < len; i++) {
       var user = users[i];
       if (user.apikey === apikey) {
         return fn(null, user);
       }
     }
     return fn(null, null);
   }

   passport.serializeUser(function(user, done) {
     done(null, user);
   });

   passport.deserializeUser(function(user, done) {
     done(null, user);
   });

   passport.use(new LocalStrategy(
     function(apikey, done) {
       // asynchronous verification, for effect...
       process.nextTick(function () {

         // Find the user by apikey.  If there is no user with the given
         // apikey, set the user to `false` to
         // indicate failure and set a flash message.  Otherwise, return the
         // authenticated `user`.
         findByApiKey(apikey, function(err, user) {
           if (err) { return done(err); }
           if (!user) { return done(null, false, { message: 'Unknown apikey : ' + apikey }); }
           return done(null, user);
         })
       });
     }
   ));
 }
