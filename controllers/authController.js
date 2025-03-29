exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Hash the password and save the user...
  console.log(req.body); // Log the incoming data to verify it’s correct

};
