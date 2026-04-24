/* eslint-disable */
// Pastiin lo panggil service di paling atas file
const usersService = require('./users-service');

async function createOrder(request, response, next) {
  try {
    const {
      userId,
      nama,
      address,
      drop_off,
    } = request.body;
  
    const order_nyak = {
      userId,
      namapenumpang: nama,
      status: 'pending',
      pickupLocation: { address_penumpang: address },
      destination: { address_drop: drop_off }
    };
    
    const savedOrder = await usersService.createOrder(orderData);

    return response.status(201).json({
      message: 'Selamat, orderan kamu sudah berhasil dibuat',
      neworder: savedOrder, 
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Aduh, servernya error, coba reload dulu ya',
    });
  }
}

async function coordinates(request, response, next) {
  try {
    const { 
      userId, 
      pickup_c, 
      dropoff_c 
    } = request.body;


    await usersService.coordinates({ userId, pickup_c, dropoff_c });

    return response.status(200).json({
      message: 'Koordinat lokasi berhasil didapat',
      data: {
        userId: userId,
        points: {
          pickup: {
            type: 'Point',
            coordinates_pickups: pickup_c 
          },
          drop_off: {
            type: 'Point',
            coordinatesdrop: dropoff_c
          }
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Maaf, gagal untuk memproses koordinat. Mohon Coba Lagi yaa',
    });
  }
}

module.exports = {
  createOrder, 
  coordinates
};