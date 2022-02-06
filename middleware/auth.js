module.exports = {
    authenticator: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        // req.flash('warning_msg', 'Login in first to access webpage.')
        res.redirect('/users/login')
    }
}