import { NextFunction, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import Carts from "../models/carts.model";
import Books from "../models/books.model";
import {
  InternalErrorException,
  NotFoundException,
} from "./../exceptions/index";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const dataReceive = req.body;
  const cartCreateInput = {
    books: dataReceive.map((item) => {
      return {
        bookId: item._id,
        quantity: item.amount,
        price: item.price,
        totalCosts: item.price * item.amount,
      };
    }),
  };

  const insertResult = await Carts.create(cartCreateInput);
  const result = await Carts.findById(insertResult._id.toHexString());
  if (!result) {
    // return res.status(500).json({
    //   message: "Problem getting created user from DB",
    // });
    return next(new InternalErrorException({ detail: "Something went wrong" }));
  }

  await dataReceive.forEach(async (element) => {
    console.log(element);
    const dataToSave = {
      quantity: element.quantity - element.amount,
    };
    try {
      await Books.findOneAndUpdate({ title: element.title }, dataToSave);
    } catch (error) {
      // throw { status: 500, message: error.message };
      return next(
        new InternalErrorException({ detail: "Something went wrong" })
      );
    }
  });

  return res.status(201).json({
    cart: cartCreateInput,
  });
};

const getCartByCustomerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dataReceive = req.params;
  const pipeline = [];

  const match = {
    customerId: dataReceive.customerId,
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 20,
  });

  const result = await Carts.aggregate(pipeline).exec();
  console.log(result);
  if (result.length > 0) {
    return res.status(200).json({
      data: result,
    });
  }

  return res.status(404).json({
    message: "cart not found",
  });
};

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  const dataReceive = req.body;
};

export default { create };
