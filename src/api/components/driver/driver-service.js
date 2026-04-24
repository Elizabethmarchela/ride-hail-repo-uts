
// driver-service.js
const DriverRepository = require('./driver-repository');

class DriverService {
    // Fungsi pencarian driver aktif
    async getActiveDrivers(coords) {
        const { lat, lng } = coords;
        
        // Validasi dasar: pastikan koordinat ada
        if (!lat || !lng) {
            throw new Error("Koordinat (lat, lng) diperlukan untuk mencari driver.");
        }

        const drivers = await DriverRepository.findNearbyDrivers();
        
        if (drivers.length === 0) {
            throw new Error("Maaf, tidak ada driver yang aktif saat ini.");
        }

        return drivers;
    }

    // Fungsi update lokasi real-time (Safety Feature)
    async updateEmergencyTrack(driverId, data) {
        const { lat, lng } = data;

        if (!lat || !lng) {
            throw new Error("Data lokasi real-time tidak lengkap.");
        }

        const updatedDriver = await DriverRepository.updateDriverLocation(driverId, lat, lng);

        if (!updatedDriver) {
            throw new Error("Driver tidak ditemukan.");
        }

        return updatedDriver;
    }
}

module.exports = new DriverService();
