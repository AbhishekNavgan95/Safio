import Module from '../models/module.model.js';
import '../models/question.model.js'; // Ensure Question model is registered

export const createModule = async (req, res, next) => {
  try {
    const { title, description, levelRequired, xpReward, order, questions } = req.body;
    
    if (!title) {
      return next(new Error('Title is required'));
    }

    const newModule = new Module({
      title,
      description,
      levelRequired,
      xpReward,
      order,
      questions: questions || []
    });

    const savedModule = await newModule.save();
    res.status(201).json(savedModule);
  } catch (error) {
    next(error);
  }
};

export const updateModule = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return next(new Error('Module not found'));
    }

    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.status(200).json(updatedModule);
  } catch (error) {
    next(error);
  }
};

export const deleteModule = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return next(new Error('Module not found'));
    }

    await Module.findByIdAndDelete(req.params.id);
    res.status(200).json('Module has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getModule = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id).populate('questions');
    if (!module) {
      return next(new Error('Module not found'));
    }
    res.status(200).json(module);
  } catch (error) {
    next(error);
  }
};
  
export const getAllModules = async (req, res, next) => {
  try {
    const modules = await Module.find().sort({ order: 1 }).populate('questions');
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};
