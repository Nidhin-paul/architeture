import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project.js';
import { initialProjects } from '../database/seedProjects.js';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, featured } = req.query;
    const filter: any = {};

    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    let projects = [];
    try {
      projects = await Project.find(filter).sort({ order: 1, year: -1 });
    } catch (dbErr) {
      console.warn('[DB Warning] Fallback to embedded projects data');
      projects = initialProjects as any;
    }

    if (!projects || projects.length === 0) {
      projects = initialProjects as any;
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const cleanSlug = (slug || '').toLowerCase();

    let project = null;
    try {
      project = await Project.findOne({ slug: cleanSlug });
    } catch (dbErr) {
      project = initialProjects.find((p) => p.slug === cleanSlug) || null;
    }

    if (!project) {
      project = initialProjects.find((p) => p.slug === cleanSlug) || null;
    }

    if (!project) {
      res.status(404).json({
        success: false,
        message: `Project '${slug}' not found`,
      });
      return;
    }

    // Find next project for seamless monograph navigation
    const all = initialProjects;
    const currentIndex = all.findIndex((p) => p.slug === cleanSlug);
    const nextItem = all[(currentIndex + 1) % all.length];

    res.status(200).json({
      success: true,
      data: project,
      nextProject: {
        title: nextItem.title,
        slug: nextItem.slug,
        location: nextItem.location,
        coverImage: nextItem.coverImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
