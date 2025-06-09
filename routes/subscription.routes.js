import { Router } from "express";
import authorize from "../Middlewares/auth.middleware.js"
import { createSubscription, getUserSubscriptions, getAllSubscriptions, deleteSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get("/", getAllSubscriptions)

subscriptionRouter.get("/:id", (req, res) => res.send({title: "Get subscription details"}))

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", (req, res) => res.send({title: "Update subscription"}))

subscriptionRouter.delete("/:id", authorize, deleteSubscription)

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({title: "Cancel subscription"}))

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({title: "Get upcoming renewals"}))


export default subscriptionRouter;