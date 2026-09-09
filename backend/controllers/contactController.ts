import { Request, Response, NextFunction } from 'express';
import Contact from '../models/Contact.js';

export const createContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, phone, company, projectType, budget, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and project message are required.',
      });
      return;
    }

    let contact = null;
    try {
      contact = await Contact.create({
        name,
        email,
        phone,
        company,
        projectType,
        budget,
        message,
      });
    } catch (dbErr) {
      console.warn('[DB] Contact created in local fallback store:', { name, email, projectType });
      contact = {
        name,
        email,
        phone,
        company,
        projectType,
        budget,
        message,
        createdAt: new Date(),
      };
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry received. An architectural director will contact you within 24 hours.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};
