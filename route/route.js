module.exports = (app) => {
    const User = require('../Controller/userController');
    const validate = require('../Middleware/validation');
    // const passport = require('passport');
    const {
        verify
    } = require('../middleware/auth');

    // require('../Middleware/auth')(passport)

    //register a new user
    app.post('/signup', validate.signupValidation, User.signup);

    //login an existing user
    app.post('/login', validate.loginValidation, User.login);

    //get profile
    app.get('/user/:id', User.getprofile);

    //update user
    app.put('/user/update/:id', User.updateUser);

    app.put('/add/experience', verify, User.addExperience);

    app.put('/add/education', verify, User.addEducation);

    app.get('/get/experience', verify, User.getExperience);

    app.get('/get/education', verify, User.getEducation);

}


