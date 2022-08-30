import express from 'express';

import addCheck from '../function/addCheck.js';
import getHistory from '../function/getHistory.js';

const router = express.Router()

router.post('/check', addCheck)
router.get('/history', getHistory)

export { router }