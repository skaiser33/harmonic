//authorization so users need to be logged in to access certain pages.
module.exports = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'HOLD ON, ROCK STAR. You have to log in to access that page.');
    res.redirect('/auth/login');
  } else {
    next();
  }
};