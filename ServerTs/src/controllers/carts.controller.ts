import { NextFunction, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import Carts from "../models/carts.model";
import Books from "../models/books.model";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const cartCreateInput = req.body;
  // console.log(cartCreateInput);
  // cartCreateInput.forEach(async (element) => {
  //   const pipeline = [];

  //   const match = {
  //     _id: new mongoose.Types.ObjectId(cartCreateInput._id),
  //   };

  //   pipeline.push({
  //     $match: match,
  //   });

  //   pipeline.push({
  //     $limit: 1,
  //   });

  //   let result = await Books.aggregate(pipeline).exec();
  //   if (result.length > 0) {
  //     console.log(result[0]);
  //     result[0].quantity = result[0].quantity - element.amount;
  //   }
  //   try {
  //     await Books.findOneAndUpdate(
  //       {
  //         _id: element._id,
  //       },
  //       result[0]
  //     );
  //   } catch (error) {
  //     throw { status: 500, message: error.message };
  //   }
  // });

  await cartCreateInput.forEach(async (element) => {
    console.log(element);
    const dataToSave = {
      quantity: element.quantity - element.amount,
    };
    try {
      await Books.findOneAndUpdate({ title: element.title }, dataToSave);
    } catch (error) {
      throw { status: 500, message: error.message };
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
