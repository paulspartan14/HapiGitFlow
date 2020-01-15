'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    uuid: DataTypes.STRING,
    uuidCourse: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};