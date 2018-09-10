const express = require('express');
const router = express.Router();

const storeController = require('../controllers');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.json({
    message: 'All good!'
  });
})

router.get('/stores', catchErrors(storeController.getStores));

router.get('/users/collections', catchErrors(storeController.getUserCollection));
router.post('/users/collections', catchErrors(storeController.createCollection));
router.patch('/users/collections', catchErrors(storeController.updateCollection));


module.exports = router;