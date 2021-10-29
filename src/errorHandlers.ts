import { ErrorRequestHandler } from "express";

export const badRequest: ErrorRequestHandler = (err, req, res, next) => {
  if (err && err.status === 400) {
    res.status(400).send({
      message: err.message || "Bad request",
      errors: err.errors || [],
    });
  }
  next();
};

export const notFound404: ErrorRequestHandler = (err, req, res, next) => {
  if (err && err.status === 404) {
    res
      .status(404)
      .send({ message: err.message || "Not found!", errors: err.errors || [] });
  }
  next();
};

export const forbidden: ErrorRequestHandler = (err, req, res, next) => {
  if (err && err.status === 403) {
    res.status(403).send({ message: err.message || "Forbidden!" });
  }
  next();
};
export const unauthorized: ErrorRequestHandler = (err, req, res, next) => {
  if (err && err.status === 401) {
    res.status(401).send({ message: err.message || "Unauthorized" });
  }
  next();
};

export const serverError: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    if (!res.headersSent) {
      res.status(err.status || 500).send({
        message: err.message || "Internal server error, lets investigate",
      });
    }
  }
  next();
};
