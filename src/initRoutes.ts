import express, { type Request, type Response } from "express";
import { ObjectId, type Db } from "mongodb";
import type { ResponseObject, User } from "src/models";
import { ERROR_MESSAGES } from "src/utils";

const USERS_COLLECTION = "users";

const API_VERSION = "v1";

export function initRoutes(db: Db) {
  const app = express();

  app.use(express.json());

  const createUser = async (req: Request, res: Response) => {
    let response: ResponseObject = {
      errors: [],
    };

    try {
      const { birthdate, email, name, password, phones } = req?.body;

      if (!birthdate) {
        response.errors?.push(ERROR_MESSAGES.BIRTHDATE_IS_MISSING);
      }

      if (!email) {
        response.errors?.push(ERROR_MESSAGES.EMAIL_IS_MISSING);
      }

      if (!name) {
        response.errors?.push(ERROR_MESSAGES.NAME_IS_MISSING);
      }

      if (!password) {
        response.errors?.push(ERROR_MESSAGES.PASSWORD_IS_MISSING);
      }

      const user: User = { birthdate, email, name, password };

      const queryResult = await db
        .collection<User>(USERS_COLLECTION)
        .findOne({ email: email });

      if (queryResult) {
        response.errors?.push(ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED);
      }

      if (response?.errors && response?.errors?.length > 0) {
        response.status = 400;

        res.status(400).send(JSON.stringify(response));

        return;
      }

      await db.collection<User>(USERS_COLLECTION).insertOne(user);

      response.errors = undefined;

      response.message = "User created!";

      response.status = 200;

      res.status(200).send(JSON.stringify(response));
    } catch (err) {
      console.error(err);

      response.errors = [];

      response.errors.push(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);

      response.status = 500;

      res.status(500).send(JSON.stringify(response));
    }
  };

  const listUserById = async (req: Request, res: Response) => {
    let response: ResponseObject = {
      errors: [],
    };

    try {
      const { id } = req.params;

      const user = await db
        .collection<User>(USERS_COLLECTION)
        .findOne({ _id: new ObjectId(id) });

      response.data = user;

      response.errors = undefined;

      response.status = 200;

      res.status(200).send(JSON.stringify(response));
    } catch (err) {
      console.error(err);

      response.errors = [];

      response.errors.push(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);

      response.status = 500;

      res.status(500).send(JSON.stringify(response));
    }
  };

  const deleteUserById = async (req: Request, res: Response) => {
    let response: ResponseObject = {
      errors: [],
    };

    try {
      const { id } = req.params;

      const result = await db
        .collection(USERS_COLLECTION)
        .deleteOne({ _id: id as any });

      response.errors = undefined;

      response.message = "User deleted!";

      response.status = 200;

      res.status(200).send(JSON.stringify(result));
    } catch (err) {
      console.error(err);

      response.errors = [];

      response.errors.push(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);

      response.status = 500;

      res.status(500).send(JSON.stringify(response));
    }
  };

  const listUsers = async (req: Request, res: Response) => {
    let response: ResponseObject = {
      errors: [],
    };

    try {
      const users = await db
        .collection<User>(USERS_COLLECTION)
        .find()
        .toArray();

      response.data = users;

      response.errors = undefined;

      response.status = 200;

      res.status(200).send(JSON.stringify(response));
    } catch (err) {
      console.error(err);

      response.errors = [];

      response.errors.push(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);

      response.status = 500;

      res.status(500).send(JSON.stringify(response));
    }
  };

  const updateUserById = async (req: Request, res: Response) => {
    let response: ResponseObject = {
      errors: [],
    };

    try {
      const { id } = req.params;

      const { birthdate, email, name, password, phones } = req?.body;

      if (!birthdate) {
        response.errors?.push(ERROR_MESSAGES.BIRTHDATE_IS_MISSING);
      }

      if (!email) {
        response.errors?.push(ERROR_MESSAGES.EMAIL_IS_MISSING);
      }

      if (!name) {
        response.errors?.push(ERROR_MESSAGES.NAME_IS_MISSING);
      }

      if (!password) {
        response.errors?.push(ERROR_MESSAGES.PASSWORD_IS_MISSING);
      }

      const queryResult = await db
        .collection<User>(USERS_COLLECTION)
        .findOne({ email: email });

      if (!queryResult) {
        response.errors?.push(ERROR_MESSAGES.NO_USER_FOUND_WITH_PROVIDED_ID);
      }

      if (response?.errors!.length > 0) {
        response.status = 400;

        res.status(400).send(JSON.stringify(response));

        return;
      }

      const user: User = {
        ...queryResult,
        birthdate,
        email,
        name,
        password,
        phones,
      };

      const result = await db
        .collection<User>(USERS_COLLECTION)
        .updateOne({ email: email }, user);

      if (result.modifiedCount === 0) {
        throw new Error("Error in user update");
      }

      response.status = 200;

      response.errors = undefined;

      response.message = "User updated!";

      res.status(200).send(JSON.stringify(response));
    } catch (err) {
      console.error(err);

      response.errors = [];

      response.errors.push(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);

      response.status = 500;

      res.status(500).send(JSON.stringify(response));
    }
  };

  app.delete(`/${API_VERSION}/users/:id`, deleteUserById);

  app.get(`/${API_VERSION}/users/:id`, listUserById);

  app.get(`/${API_VERSION}/users`, listUsers);

  app.post(`/${API_VERSION}/users`, createUser);

  app.put(`/${API_VERSION}/users/:id`, updateUserById);

  app.listen(3000, () => {
    console.log(`Service is running at ${process.env.PORT}`);
  });
}
