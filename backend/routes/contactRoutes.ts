import { Router } from 'express';
import { createContact, getContacts } from '../controllers/contactController.js';

const router = Router();

router.route('/')
  .get(getContacts)
  .post(createContact);

export default router;
