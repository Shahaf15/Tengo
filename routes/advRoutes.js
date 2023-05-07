import express from 'express'
const router = express.Router();

import {createAdv, deleteAdv, getAllAdv, updateAdv, showStats} from '../controllers/advController.js'

router.route('/').post(createAdv).get(getAllAdv)
// remeber about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteAdv).patch(updateAdv)



export default router;