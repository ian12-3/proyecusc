const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

passport.use(
  new GoogleStrategy({
      clientID: '123',
      clientSecret: '123asdasd',
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí puedes implementar la lógica para guardar o autenticar al usuario
      // profile contiene la información del usuario obtenida de Google
      console.log(profile);
    }
  )
);

passport.use(
  new FacebookStrategy({
      clientID: '123',
      clientSecret: '1231sdasd',
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí puedes implementar la lógica para guardar o autenticar al usuario
      // profile contiene la información del usuario obtenida de Facebook
      console.log(profile);
    }
  )
);

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook'));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
