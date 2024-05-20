const { Router } = require('express');
const addressController = require('../Controllers/addressController');
const router = Router();

router.get('/useraddress/:id', addressController.getById);
router.post('/postaddresses', addressController.postAddresses)
router.get('/lok', addressController.letlookupCheck)



module.exports = router;