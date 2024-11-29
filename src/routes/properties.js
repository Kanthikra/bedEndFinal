import { Router } from "express";
import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import authenticateJWT from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;

    const price = pricePerNight ? parseFloat(pricePerNight) : undefined;

    const amenitiesArray = amenities ? amenities.split(",") : undefined;

    const properties = await getProperties({
      location,
      pricePerNight: price,
      amenities: amenitiesArray,
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );

    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found!" });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const updatedProperty = await updatePropertyById(req.params.id, req.body);
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found!" });
    }
    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const deletedProperty = await deletePropertyById(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found!" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
