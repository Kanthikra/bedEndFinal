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
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  try {
    const { propertyId, userId, comment, rating } = req.body;
    const newReview = await createReview(propertyId, userId, comment, rating);
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found!" });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const updatedReview = await updateReviewById(req.params.id, req.body);
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found!" });
    }
    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    next(error);
  }
});

// DELETE /reviews/:id - Delete a specific review by ID
router.delete("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const deletedReview = await deleteReviewById(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found!" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
