const express = require("express");
const Booking = require('../models/Booking');
const User = require('../models/User');
const Train = require('../models/Train');

const router = express.Router();

const { login, signup } = require("../controllers/Auth");
const { auth, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

//add a new train (Admin only)
router.post("/trains", auth, isAdmin, async (req, res) => {
  try {
    const { source, destination, totalSeats } = req.body;
    const newTrain = await Train.create({
      source,
      destination,
      totalSeats,
    }).save();
    res.json({ message: "Train added successfully" });
  } catch (error) {
    console.error("Error in adding train:", error);
    res.status(500).json({ error: "An error occurred while adding train" });
  }
});

// Get seat availability
router.get('/trains', auth, async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await Train.find({ where: { source, destination } });
        res.json(trains);
    } catch (error) {
        console.error("Error in getting seat availability:", error);
        res.status(500).json({ error: "An error occurred while fetching seat availability" });
    }
});

// Book a seat
router.post('/bookings', auth, async (req, res) => {
    try {
        const { trainId } = req.body;
        const booking = await Booking.create({ userId: req.user.id, trainId, status: 'booked' }).save();
        res.json({ message: "Seat booked successfully" });
    } catch (error) {
        console.error("Error in booking seat:", error);
        res.status(500).json({ error: "An error occurred while booking seat" });
    }
});

// Get specific booking details
router.get('/bookings/:bookingId', auth, async (req, res) => {
    try {
        const booking = await Booking.findOne(req.params.bookingId);
        if (!booking) return res.status(404).json({ error: "Booking not found" });
        if (booking.userId !== req.user.id) return res.sendStatus(403);

        res.json(booking);
    } catch (error) {
        console.error("Error in getting booking details:", error);
        res.status(500).json({ error: "An error occurred while fetching booking details" });
    }
});

module.exports = router;
