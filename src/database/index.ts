import "reflect-metadata";
import { createConnection } from "typeorm";
import config from './ormconfig';

const createDatabaseConnection = async () => {
  try {
    const connection = await createConnection(config);
    console.log(connection);
    return connection;
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
};

export default createDatabaseConnection;
