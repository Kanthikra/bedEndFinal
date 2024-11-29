import { Router } from "express";
import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import getReviewById from "../services/reviews/getReviewById.js";
import getReviews from "../services/reviews/getReviews.js";
import updateReviewById from "../services/reviews/updateReviewById.js";

import authenticateJWT from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  try {
    const { propertyId, userId, comment, rating } = req.body;
    const newReview = await createReview(propertyId, userId, comment, rating);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReviewById(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully deleted`,
        user,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { propertyId, userId, comment, rating } = req.body;
    const review = await updateReviewById(id, {
      propertyId,
      userId,
      comment,
      rating,
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Review with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
