const express = require("express");
const { newPatientRegister, newPatientAppointment, getRegisteredPatient, getAppointedPatient } = require("../controller/patientController");
const { createAppointReview, getAllPrescPatient, getLastPrescPatient } = require("../controller/videoController");


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router()


router.route("/dash/register").post(isAuthenticatedUser,newPatientRegister).get(isAuthenticatedUser,getRegisteredPatient);
router.route("/dash/appointment").post(isAuthenticatedUser,newPatientAppointment).get(isAuthenticatedUser,getAppointedPatient);


router.route("/dash/presc").put(isAuthenticatedUser, createAppointReview);
router.route("/dash/prescptions").post(isAuthenticatedUser, getAllPrescPatient);
router.route("/dash/prescption").post(isAuthenticatedUser, getLastPrescPatient);



module.exports = router