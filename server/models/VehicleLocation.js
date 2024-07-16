const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const VehicleLocation = sequelize.define('VehicleLocation', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    vehicle_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'vehicle_locations',
    timestamps: false
});

module.exports = VehicleLocation;
