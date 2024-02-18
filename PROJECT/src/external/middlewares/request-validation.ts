import { ValidationError } from "express-validator";
import { AppErrorV1 } from "../utils";

export default class RequestValidationException extends AppErrorV1 {

    constructor(errorMessage: Array<ValidationError>) {
      super(
        "400",
        true,
        `Bad Request - ${(errorMessage[0].msg)}`,
        `000`,
        errorMessage,
      );
    }
  };