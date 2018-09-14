const express = require('express');
const router = express.Router();

const Controller = require('../controllers');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.json({
    message: 'All good!'
  });
})

router.get('/stores', catchErrors(Controller.getStores));

router.get('/users/collections', catchErrors(Controller.getUserCollection));
router.post('/users/collections', catchErrors(Controller.createCollection));
router.patch('/users/collections', catchErrors(Controller.updateCollection));
router.post('/invite', catchErrors(Controller.invite));


module.exports = router;