import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import models from '../models';
import {
  successResponse,
  errorResponse,
  handleError,
} from '../utils/responses';
import jwtHelper from '../utils/jwt';

const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create, log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, password, region } = req.body;
      const emailExist = await models.User.findOne({ email });
      if (emailExist) {
        return errorResponse(
          res,
          409,
          'email already registered by another user.',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await models.User.create({
        name,
        email,
        password: hashedPassword,
        region,
      });
      return successResponse(
        res,
        201,
        'Account created successfully, kindly verify your email and login.',
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error.');
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async loginUser(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      const user = await models.User.findOne({ email });
      if (!user)
        return errorResponse(res, 404, 'email or Phone number not found');

      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) {
        return errorResponse(res, 404, 'Password is not correct!.');
      }

      const token = await generateToken({ _id: user._id, email });

      const userDetails = {
        _id: user._id,
        email,
        name: user.name,
        role: user.role,
        region: user.region,
      };
      return successResponse(res, 200, 'User Logged in Successfully.', {
        token,
        userDetails,
      });
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, 'Server error');
    }
  }
}
