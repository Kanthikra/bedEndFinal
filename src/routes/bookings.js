import { Router } from "express";
import createBooking from "../services/bookings/createBooking.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import getBookingById from "../services/bookings/getBookingById.js";
import getBookings from "../services/bookings/getBookings.js";
import updateBookingById from "../services/bookings/updateBookingById.js";

import authenticateJWT from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId, bookingStatus } = req.query;

    const bookings = await getBookings();

    let filteredBookings = bookings;

    if (userId) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.userId === userId
      );
    }

    if (bookingStatus) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.status === bookingStatus
      );
    }

    res.status(200).json(filteredBookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  try {
    const { userId, propertyId, checkinDate, checkoutDate, totalPrice } =
      req.body;

    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      totalPrice
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const updatedBooking = await updateBookingById(req.params.id, req.body);
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found!" });
    }
    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const deletedBooking = await deleteBookingById(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found!" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
