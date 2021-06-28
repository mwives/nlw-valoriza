import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuth } from "./middlewares/ensureAuth";
import { ListSentComplimentsController } from "./controllers/ListSentComplimentsController";
import { ListReceivedComplimentsController } from "./controllers/ListReceivedComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const listSentComplimentsController = new ListSentComplimentsController();
const listReceivedCOmplimentsController = new ListReceivedComplimentsController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuth, createComplimentController.handle);

router.get("/tags", ensureAuth, listTagsController.handle);
router.get("/users", ensureAuth, listUsersController.handle);
router.get(
  "/users/compliments/sent",
  ensureAuth,
  listSentComplimentsController.handle
);
router.get(
  "/users/compliments/received",
  ensureAuth,
  listReceivedCOmplimentsController.handle
);

export { router };
