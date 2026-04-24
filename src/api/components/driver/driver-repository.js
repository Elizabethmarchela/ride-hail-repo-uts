/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */ 
/* eslint-disable prettier/prettier */
// driver-repository.js
const db = require('../models'); // Pastikan path ini mengarah ke index models kamu

class DriverRepository {
    // Logika Mahasiswa 1: Mencari driver yang aktif (isAvailable: true)
    async findNearbyDrivers() {
        // Mencari semua driver yang tersedia
        return await db.Drivers.find({
            isAvailable: true
        });
    }

    // Logika Mahasiswa 1: Update lokasi real-time untuk Safety/Emergency
    async updateDriverLocation(driverId, lat, lng) {
        return await db.Drivers.findByIdAndUpdate(
            driverId,
            { 
                $set: { 
                    'currentLocation.lat': lat, 
                    'currentLocation.lng': lng 
                } 
            },
            { new: true } // Agar mengembalikan data terbaru setelah di-update
        );
    }
}

module.exports = new DriverRepository();