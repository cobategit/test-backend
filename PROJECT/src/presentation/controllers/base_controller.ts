import { validationResult } from "express-validator";
import RequestValidationException from "../../external/middlewares/request-validation";
import { Request } from "express";

export class BaseController {
    static requestValidator(request: Request) {
  
      const errors = validationResult(request);
  
      if(!errors.isEmpty()){
        throw new RequestValidationException(
          errors.array()
        );
      }
    }
  
  }