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
    const bookings = await getBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  try {
    const { userId, propertyId, checkinDate, checkoutDate, totalPrice } =
      req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      totalPrice
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBookingById(id);

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully deleted`,
        user,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, checkinDate, checkoutDate, totalPrice } =
      req.body;
    const booking = await updateBookingById(id, {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      totalPrice,
    });

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
