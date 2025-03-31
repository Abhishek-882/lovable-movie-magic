const { Booking, User } = require('../models');

module.exports = {
  async createBooking(userId, bookingData) {
    return await Booking.create({
      userId,
      ...bookingData,
      status: 'confirmed'
    });
  },

  async getUserBookings(userId) {
    return await Booking.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          required: false
        }
      ]
    });
  },

  async cancelBooking(bookingId, userId) {
    const [affectedRows] = await Booking.update(
      { status: 'cancelled' },
      { 
        where: { 
          id: bookingId, 
          userId,
          status: 'confirmed' 
        } 
      }
    );

    if (affectedRows === 0) {
      throw new Error('Booking not found or already cancelled');
    }

    return { message: 'Booking cancelled successfully' };
  }
};
