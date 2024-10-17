module.exports.constant={
    validation: {
        emailOrUsername: {
          base: 'The email or username should be a string.',
          empty: 'The email or username cannot be empty.',
          required: 'The email or username is required.',
        },
        password: {
          base: 'The password should be a string.',
          empty: 'The password cannot be empty.',
          min: 'The password must be at least 8 characters long.',
          required: 'The password is required.',
        },
        session: {
          base: 'Session token must be a string.',
          empty: 'Session token cannot be empty.',
          required: 'Session token is required.',
        },
    },
    success: {
        authenticationSuccess: 'Login successful.',
    },
    error:{
        sessionNotFound: 'Session not found.',
        sessionDeletionFailed: 'Failed to delete session.',
        noTokenProvided: 'No token provided.',
        invalidTokenFormat: 'Invalid token format.',
        sessionExpiredOrUnauthorized: 'Session expired login again.',
        invalidSessionToken: 'Invalid session token.',
        failedToAuthenticateToken: 'Failed to authenticate token.',
        dbQueryFailed: 'Database query failed.',
        passwordComparisonFailed: 'Password comparison failed.',
        userNotFound: "User Not exists",
        invalidCredentials: 'Invalid credentials.',
    },
    emailIdAlreadyInUse: "This email address is already in use",
    contactNumberAlreadyInUse: "This contact number is already in use",
    registrationFailed: "Failed to register user",
    //success message
    registrationSuccess: "Registration successful",
};