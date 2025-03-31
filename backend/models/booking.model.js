
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    movieId: DataTypes.STRING,
    showtimeId: DataTypes.STRING,
    seats: DataTypes.ARRAY(DataTypes.STRING),
    totalAmount: DataTypes.FLOAT,
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'bookings'
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Booking;
};
