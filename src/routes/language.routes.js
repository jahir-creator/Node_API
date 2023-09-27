import {Router} from "express";
import { methods as languageController } from "./../controllers/language.controllers";
const router = Router();

// router.get("/", (req, res) => {
    // res.send("PRUEBA DE RUTAS")
// });
router.get("/", languageController.getLanguages);
router.get("/:id", languageController.getLanguage);
router.post("/", languageController.addLanguage);
router.delete("/:id", languageController.deleteLanguage);
router.put("/:id", languageController.updateLanguage);
export default router;