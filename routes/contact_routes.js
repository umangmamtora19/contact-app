const express = require("express")
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {
    getContact, 
    createContact, 
    updateContact, 
    deleteContact, 
    getSingleContact
} = require("../controllers/contact_controller");


router.use(validateToken)

router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getSingleContact).put(updateContact).delete(deleteContact);

module.exports = router;