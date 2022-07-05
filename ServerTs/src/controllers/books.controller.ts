import {
  InternalErrorException,
  NotFoundException,
} from "./../exceptions/index";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Books from "../models/books.model";
import { HttpException } from "../exceptions/index";
var HttpStatus = require("http-status-codes");

const create = async (req: Request, res: Response, next: NextFunction) => {
  const bookCreateInput = req.body;

  const pipeline = [];

  const match = {
    title: bookCreateInput.title,
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 20,
  });

  const bookInDb = await Books.aggregate(pipeline).exec();
  if (bookInDb.length > 0) {
    // return res.status(404).json({
    //   message: "book have already exist",
    // });

    return next(
      new InternalErrorException({
        detail: "book have already exist",
      })
    );
  }

  const insertResult = await Books.create(bookCreateInput);
  const result = await Books.findById(insertResult._id.toHexString());
  if (!result) {
    // return res.status(500).json({
    //   message: "Problem getting created book from DB",
    // });
    return next(
      new InternalErrorException({
        detail: "Something went wrong when create book",
      })
    );
  }

  return res.status(201).json({
    book: result,
  });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Books.find().exec();
  console.log(result);

  if (result.length > 0) {
    // next(
    //   new HttpException(
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //     "something went wrong with books update"
    //   )
    // );
    return res.status(200).json({
      books: result,
      count: result.length,
    });
  }
  return res.status(200);
};

const getByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dataReceive = req.params;
  const pipeline = [];

  const match = {
    category: dataReceive.category,
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 20,
  });

  const result = await Books.aggregate(pipeline).exec();
  console.log(result);
  if (result.length > 0) {
    return res.status(200).json({
      data: result,
    });
  }

  // return res.status(404).json({
  //   message: "book not found",
  // });
  next(new NotFoundException({ detail: "Book not found" }));
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const dataReceive = req.params;
  const pipeline = [];

  const match = {
    _id: new mongoose.Types.ObjectId(dataReceive.id),
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 20,
  });

  const result = await Books.aggregate(pipeline).exec();
  if (result.length > 0) {
    return res.status(200).json({
      data: result[0],
    });
  }

  // return res.status(404).json({
  //   message: "book not found",
  // });
  // throw new NotFoundException("Book not found");
  next(new NotFoundException({ detail: "Book not found" }));
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const dataReceive = req.body;
  const dataToSave = {
    title: dataReceive.title,
    image: dataReceive.image,
    category: dataReceive.category,
    quantity: dataReceive.quantity,
    price: dataReceive.price,
    description: dataReceive.description,
  };

  try {
    await Books.findOneAndUpdate({ title: dataReceive.title }, dataToSave);
  } catch (error) {
    // throw { status: 500, message: error.message };
    next(
      new HttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "something went wrong with books update"
      )
    );
  }

  res.status(200).json({
    data: {
      message: "update book success",
    },
  });
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const dataReceive = req.body;
  try {
    await Books.findOneAndDelete({ title: dataReceive.title });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
  res.status(200).json({
    data: {
      message: "delete book success",
    },
  });
};

export default { create, getAll, getByCategory, update, remove, getById };
