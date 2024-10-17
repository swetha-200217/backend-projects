const express = require('express');
const dotenv = require('dotenv');
const Boom = require('@hapi/boom');
const signupRoutes = require('./signup/signup.routes');
const loginRoutes = require('./login/login.routes');


dotenv.config();
const app = express();
app.use(express.json());


// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json({ ...output.payload, success: false });
    } else {
      res.status(500).json({ success: false, statusCode: 500, error: 'Internal Server Error', message: err.message });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
