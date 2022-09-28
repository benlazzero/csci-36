import express from 'express';

const router = express.Router();

router.get("/dis-form", async (req, res) => {
    res.render("dis-form", { title: "SLO Tracker - Form"});
});

export default router;