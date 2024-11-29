import { Router } from "express";
import createAmenity from "../services/amenities/createAmenity.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";

import authenticateJWT from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res
      .status(201)
      .json({ message: "Amenity created successfully", amenity: newAmenity });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const amenity = await getAmenityById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found!" });
    }
    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const updatedAmenity = await updateAmenityById(req.params.id, req.body);
    if (!updatedAmenity) {
      return res.status(404).json({ message: "Amenity not found!" });
    }
    res.status(200).json({
      message: "Amenity updated successfully",
      amenity: updatedAmenity,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const deletedAmenity = await deleteAmenityById(req.params.id);
    if (!deletedAmenity) {
      return res.status(404).json({ message: "Amenity not found!" });
    }
    res.status(200).json({ message: "Amenity deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
