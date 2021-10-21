import { Response } from "express";
import {
  checkSchema,
  Result,
  Schema,
  ValidationChain,
  ValidationError,
  validationResult,
} from "express-validator";

const animalSchemaCheck: Schema = {
  petName: {
    in: ["body"],
    isString: {
      errorMessage: "petName: type must be string  ",
    },
  },
  type: {
    in: ["body"],
    isString: {
      errorMessage: "type : type must be  string ",
    },
  },
  breed: {
    in: ["body"],
    isString: {
      errorMessage: "breed : type must be string ",
    },
  },
  user: {
    in: ["body"],
    isMongoId: {
      errorMessage: "user must be a valid mongodb id",
    },
  },
  location: {
    in: ["body"],
    isString: {
      errorMessage: "location : type must be numeric ",
    },
  },
  dateOfBirth: {
    in: ["body"],
    isString: {
      errorMessage: "dateOfBirth : type must be string ",
    },
  },
  canLiveWithPets: {
    in: ["body"],
    isBoolean: {
      errorMessage: "canLiveWithPets type must be a boolean",
    },
  },
  canLiveWithChildren: {
    in: ["body"],
    isBoolean: {
      errorMessage: "canLiveWithChildren type must be a boolean",
    },
  },
  indoorOnly: {
    in: ["body"],
    isBoolean: {
      errorMessage: "indoorOnly type must be a boolean",
    },
  },
};

export const checkAnimalSchema = checkSchema(animalSchemaCheck);

export const checkValidationResult = (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
