const express = require("express");
const cors = require("cors");
const app = express();
const VehicleLocation = require("./models/VehicleLocation");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/vehicle-locations/:date/:vehicleId", async (req, res) => {
    const { date, vehicleId } = req.params;
    try {
        const locations = await VehicleLocation.findAll({
            where: {
                date: date,
                vehicle_id: vehicleId
            }
        });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
