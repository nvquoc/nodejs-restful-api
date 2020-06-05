const express = require('express');

const controller = require('../controllers/user');

const router = express.Router();

router.route('/')
      .get(controller.index)
      .post(controller.store);

router.route('/:id')
      .get(controller.show)
      .patch(controller.update)
      .delete(controller.delete);

module.exports = router;