/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/field-validator");
const { validateJWT } = require("../middlewares/jwt-validator");
const router = Router();

router.post(
  "/new",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser de, al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    // middlewares
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser de, al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  loginUsuario
);

router.get("/renew", [validateJWT], revalidarToken);

module.exports = router;
