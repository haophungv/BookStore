import { NextFunction, Request, Response } from "express";
import Users from "../models/users.model";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const userCreateInput = req.body;

  const pipeline = [];

  const match = {
    username: userCreateInput.username,
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 20,
  });

  const userInDb = await Users.aggregate(pipeline).exec();
  if (userInDb.length > 0) {
    return res.status(404).json({
      message: "username have already exist",
    });
  }

  const insertResult = await Users.create(userCreateInput);
  const result = await Users.findById(insertResult._id.toHexString());
  if (!result) {
    return res.status(500).json({
      message: "Problem getting created user from DB",
    });
  }

  return res.status(201).json({
    user: result.username,
  });
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
  Users.find()
    .exec()
    .then((user) => {
      return res.status(200).json({
        user: user,
        count: user.length,
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
    username: dataReceive.username,
  };

  pipeline.push({
    $match: match,
  });

  pipeline.push({
    $limit: 20,
  });

  const result = await Users.aggregate(pipeline).exec();
  console.log(result);
  if (result.length > 0) {
    return res.status(200).json({
      data: result,
    });
  }

  return res.status(404).json({
    message: "user not found",
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
    await Users.findOneAndUpdate({ title: dataReceive.title }, dataToSave);
  } catch (error) {
    throw { status: 500, message: error.message };
  }

  res.status(200).json({
    data: {
      message: "update user success",
    },
  });
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const dataReceive = req.body;
  try {
    await Users.findOneAndDelete({ title: dataReceive.title });
  } catch (error) {
    throw { status: 500, message: error.message };
  }
  res.status(200).json({
    data: {
      message: "delete user success",
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

  const result = await Users.aggregate(pipeline).exec();
  console.log(result);
  if (result.length > 0) {
    return res.status(200).json({
      data: result,
      token: "this is token",
    });
  }

  return res.status(404).json({
    message: "wrong username or password",
  });
};

export default { create, getAll, getByUsername, update, remove, login };
