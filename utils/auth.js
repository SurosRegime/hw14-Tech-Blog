const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      return res.redirect('/login');
    }
    return next();
  };
  
  module.exports = withAuth;