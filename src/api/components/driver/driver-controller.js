/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */ 
/* eslint-disable prettier/prettier */
const DriverService = require('./driver-service');

class DriverController {
  // eslint-disable-next-line consistent-return
  async register(req, res) {
    try {
      const { name, email, password, phoneNumber } = req.body;

      // Basic Validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
      }

      const newDriver = await DriverService.registerDriver({
        name,
        email,
        password,
        phoneNumber,
      });

      res.status(201).json({
        message: 'Driver berhasil didaftarkan',
        data: { id: newDriver._id, email: newDriver.email },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
 
module.exports = new DriverController(); 
