const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Train = require("../models/Train");

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
    });
    res.json({
      success: true,
      data: newTrain,
      message: "Train added successfully",
    });
  } catch (error) {
    console.error("Error in adding train:", error);
    res.status(500).json({ error: "An error occurred while adding train" });
  }
});

// Get seat availability
router.get("/trains", auth, async (req, res) => {
  try {
    const { source, destination } = req.body;
    const trains = await Train.findOne({ where: { source, destination } });
    res.json(trains);
  } catch (error) {
    console.error("Error in getting seat availability:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching seat availability" });
  }
});

// Book a seat
router.post("/bookings", auth, async (req, res) => {
  try {
    const { trainId } = req.body;
    const totalBookings = await Booking.count({ where: { trainId } });
    const { totalSeats } = await Train.findOne({ where: { id: trainId } });
    if (totalSeats - totalBookings <= 0) {
      return res.status(400).json({ error: "No seats available" });
    }
    const booking = await Booking.create({
      UserId: req.user.id,
      TrainId: trainId,
      status: "booked",
    });
    res.json({
      success: true,
      data: booking,
      message: "Seat booked successfully",
    });
  } catch (error) {
    console.error("Error in booking seat:", error);
    res.status(500).json({ error: "An error occurred while booking seat" });
  }
});

// Get specific booking details
router.get("/bookings/:bookingId", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.bookingId },
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (booking.UserId !== req.user.id) return res.sendStatus(403);

    res.status(200).json({
      data: booking,
    });
  } catch (error) {
    console.error("Error in getting booking details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching booking details" });
  }
});

module.exports = router;
