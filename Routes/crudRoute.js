const { Router } = require('express');
const curdController = require('../Controllers/crudController')
const router = Router();

router.get('/getdata', curdController.getData )
router.post('/postdata', curdController.postData )
router.patch('/patchdata', curdController.patchData )
router.delete('/deletedata', curdController.deleteData )
router.get('/pagination', curdController.pagination )
router.get('/lookup', curdController.lookupCheck )
router.get('/letlookup', curdController.letlookupCheck )
router.get('/match', curdController.matchCheck )
router.get('/search', curdController.searching )


module.exports = router;