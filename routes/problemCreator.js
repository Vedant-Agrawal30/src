// create
// ftech

const express =  require("express")
const problemRouter = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware")
const createProblem = require("../controllers/userProblem")



problemRouter.post("/create",adminMiddleware, createProblem);
// problemRouter.patch("/:id", updateProblem);
// problemRouter.delete("/:id", deleteProblem);


// problemRouter.get("/:id",getProblemById);
// problemRouter.get("/", fetchAllProblem);
// problemRouter.get("/user", solvedAllProblembyUser)

module.exports = problemRouter;