import { Request, Response } from 'express';
import models from '../models';
import {
  successResponse,
  errorResponse,
  handleError,
} from '../utils/responses';

/**
 * @class QuestionController
 * @description create, get, delete, update Question
 * @exports QuestionController
 */
export default class QuestionController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createQuestion(req: Request, res: Response): Promise<any> {
    try {
      const question = await models.Question.create(...req.body);
      return successResponse(res, 200, 'question created.', question);
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
  static async getAllQuestions(req: Request, res: Response): Promise<any> {
    try {
      let { page, limit }: any = req.query;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const questions = await models.AssignedQuestion.find({
        user: req.details._id,
      })
        .limit(endIndex)
        .skip(startIndex)
        .exec();

      const count = await models.AssignedQuestion.countDocuments({
        user: req.details._id,
      });

      let totalPages = Math.ceil(count / limit) - 1;
      if (totalPages === 0) totalPages = 1;
      const total = questions.length;
      return successResponse(res, 200, 'questions fetched successfully.', {
        total,
        totalPages,
        currentPage: page,
        questions,
      });
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
  static async getQuestionById(req: Request, res: Response): Promise<any> {
    try {
      const question = await models.AssignedQuestion.findById(req.params.id);
      if (!question) {
        return errorResponse(res, 404, 'question not found.');
      }
      return successResponse(
        res,
        200,
        'question fetched successfully.',
        question,
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
  static async updateQuestion(req: Request, res: Response): Promise<any> {
    try {
      const question = await models.Question.findByIdAndUpdate(
        req.params.id,
        ...req.body,
        { new: true },
      );
      return successResponse(res, 200, 'Post updated successfully.', question);
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
  static async deleteQuestion(req: Request, res: Response): Promise<any> {
    try {
      const question = await models.Question.findByIdAndDelete(req.params.id);
      return successResponse(res, 200, 'Post deleted successfully.', question);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error');
    }
  }
}
