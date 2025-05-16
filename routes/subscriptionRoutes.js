import { Router } from "express";
import authorize  from "../middleware/authMiddleware.js";
import { createSubscription, getAllSubscriptions }from "../controllers/subscriptionController.js";

const subcriptionRouter = Router();

subcriptionRouter.get("/",authorize, getAllSubscriptions);

subcriptionRouter.post("/", authorize, createSubscription);

subcriptionRouter.put("/:id", (req, res) => {
    res.send("update subscription");
    });

subcriptionRouter.delete("/:id", (req, res) => {
    res.send("delete subscription");
    });


subcriptionRouter.get("/:id", (req, res) => {
    res.send("get subscription");
    });
export default subcriptionRouter;









