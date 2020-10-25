import "reflect-metadata";
import { createConnection } from "typeorm";
import config from './ormconfig';

const createDatabaseConnection = async () => {
  try {
    return await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
};

export default createDatabaseConnection;
