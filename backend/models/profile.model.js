module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    avatar: DataTypes.STRING,
    preferredLocation: DataTypes.STRING
  }, {
    tableName: 'profiles'
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Profile;
};
