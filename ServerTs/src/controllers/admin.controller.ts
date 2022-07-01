import { NextFunction, Request, Response } from "express";
import Admin from "../models/admin.model";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const adminCreateInput = req.body;
  const insertResult = await Admin.create(adminCreateInput);
  const result = await Admin.findById(insertResult._id.toHexString());
  if (!result) {
    return res.status(500).json({
      message: "Problem getting created admin from DB",
    });
  }

  return res.status(201).json({
    admin: result.username,
  });
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
  Admin.find()
    .exec()
    .then((admin) => {
      return res.status(200).json({
        admin: admin,
        count: admin.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dataReceive = req.params;
  const pipeline = [];

  const match = {
    category: dataReceive.username,
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 20,
  });

  const result = await Admin.aggregate(pipeline).exec();
  console.log(result);
  if (result.length > 0) {
    return res.status(200).json({
      data: result,
    });
  }

  return res.status(404).json({
    message: "admin not found",
  });
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
    await Admin.findOneAndUpdate({ title: dataReceive.title }, dataToSave);
  } catch (error) {
    throw { status: 500, message: error.message };
  }

  res.status(200).json({
    data: {
      message: "update admin success",
    },
  });
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const dataReceive = req.body;
  try {
    await Admin.findOneAndDelete({ title: dataReceive.title });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
  res.status(200).json({
    data: {
      message: "delete admin success",
    },
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const inputData = req.body;
  const pipeline = [];

  const match = {
    username: inputData.username,
    password: inputData.password,
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 1,
  });

  const result = await Admin.aggregate(pipeline).exec();
  console.log(result);
  if (result.length > 0) {
    return res.status(200).json({
      data: result,
      token: "this is token",
    });
  }

  return res.status(404).json({
    message: "user not found",
  });
};

export default { create, getAll, getByUsername, update, remove, login };
