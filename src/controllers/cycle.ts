import { Request, Response } from 'express';
import models from '../models';
import {
  successResponse,
  errorResponse,
  handleError,
} from '../utils/responses';

/**
 * @class CycleController
 * @description crud operation for  cycle
 * @exports CycleController
 */
export default class CycleController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createCycle(req: Request, res: Response): Promise<any> {
    try {
      const cycle = await models.Cycle.create(...req.body);

      return successResponse(res, 200, 'cycle created successfully', cycle);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error');
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getCycles(req: Request, res: Response): Promise<any> {
    try {
      const cycles = await models.Cycle.find({});

      return successResponse(res, 200, 'Payment was successful', cycles);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error');
    }
  }
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getCycleById(req: Request, res: Response): Promise<any> {
    try {
      const cycle = await models.Cycle.findById(req.params.id);
      if (!cycle) return errorResponse(res, 404, 'cycle not found');
      return successResponse(res, 200, 'Payment was successful', cycle);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error');
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async updateCycle(req: Request, res: Response): Promise<any> {
    try {
      const cycle = await models.Cycle.findByIdAndUpdate(
        req.params.id,
        ...req.body,
        { new: true },
      );
      return successResponse(res, 200, 'Cycle updated successfully.', cycle);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error');
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async deleteCycle(req: Request, res: Response): Promise<any> {
    try {
      const cycle = await models.Cycle.findByIdAndDelete(req.params.id);
      return successResponse(res, 200, 'Post deleted successfully.', cycle);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error');
    }
  }
}
