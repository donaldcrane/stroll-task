import { Request, Response } from 'express';
import models from '../models';
import {
  successResponse,
  errorResponse,
  handleError,
} from '../utils/responses';

/**
 * @class RegionController
 * @description create, get, delete, update Post
 * @exports RegionController
 */
export default class RegionController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createRegion(req: Request, res: Response): Promise<any> {
    try {
      const region = await models.Region.create(...req.body);
      return successResponse(res, 200, 'Region created successfully.', region);
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
  static async getAllRegions(req: Request, res: Response): Promise<any> {
    try {
      const regions = await models.AssignedQuestion.find({}).exec();

      return successResponse(
        res,
        200,
        'regions fetched successfully.',
        regions,
      );
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
  static async getRegionById(req: Request, res: Response): Promise<any> {
    try {
      const region = await models.Region.findById(req.params.id);
      if (!region) {
        return errorResponse(res, 404, 'region not found.');
      }
      return successResponse(res, 200, 'region fetched successfully.', region);
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
  static async updateRegion(req: Request, res: Response): Promise<any> {
    try {
      const region = await models.Region.findByIdAndUpdate(
        req.params.id,
        ...req.body,
        { new: true },
      );
      return successResponse(res, 200, 'region updated successfully.', region);
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
  static async deleteRegion(req: Request, res: Response): Promise<any> {
    try {
      const region = await models.Region.findByIdAndDelete(req.params.id);
      return successResponse(res, 200, 'Deleted successfully', region);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error.');
    }
  }
}
