import { Router } from "express";
import authController from "../controller/auth.controller";
import validationMiddlware from "../middleware/validation.middlware";
import { accountPreferenceValidation } from "../service/validation/account.validation";
const router = Router();

const { validate } = validationMiddlware;

router.post("/login", authController.login);
router.post(
  "/register",
  [validate(accountPreferenceValidation)],
  authController.register
);
router.post("/forgot-password", authController.forgotPassword);
router.post("/checkpoint/:id", authController.verifyAccount);
router.put("/checkpoint/change-password/:id", authController.changePassword);

export default router;
