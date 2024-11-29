import { Router } from "express";
import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import getHostById from "../services/hosts/getHostById.js";
import getHosts from "../services/hosts/getHosts.js";
import updateHostById from "../services/hosts/updateHostById.js";

import authenticateJWT from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateJWT, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res
      .status(201)
      .json({ message: "Host created successfully", host: newHost });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (!host) {
      return res.status(404).json({ message: "Host not found!" });
    }
    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const updatedHost = await updateHostById(req.params.id, req.body);
    if (!updatedHost) {
      return res.status(404).json({ message: "Host not found!" });
    }
    res
      .status(200)
      .json({ message: "Host updated successfully", host: updatedHost });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticateJWT, async (req, res, next) => {
  try {
    const deletedHost = await deleteHostById(req.params.id);
    if (!deletedHost) {
      return res.status(404).json({ message: "Host not found!" });
    }
    res.status(200).json({ message: "Host deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
