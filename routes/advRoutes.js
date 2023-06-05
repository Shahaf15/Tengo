import express from 'express'
const router = express.Router();

import {createAdv, deleteAdv, getAdvs, updateAdv, showStats} from '../controllers/advController.js'

router.route('/').post(createAdv).get(getAdvs)
// remeber about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteAdv).patch(updateAdv)



export default router;