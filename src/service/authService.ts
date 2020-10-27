import jwt from 'express-jwt';
import { decode } from 'jsonwebtoken';
import { NextFunction, RequestHandler, Response, Request } from 'express';

const secret: string = process.env.SECRET || "secret";

function getTokenFromCookie(req: Request): string {
  if (req.cookies) {
    return req.cookies.token;
  } else {
    throw new Error("No cookies")
  }
}

function getIdFromToken(req: Request): string {
  const token = getTokenFromCookie(req);
  const decodedToken: any = decode(token);
  if (decodedToken && decodedToken.id) {
    return decodedToken.id
  } else {
    throw new Error("No id in cookie")
  }
}

const auth = {
  required: jwt({
    secret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromCookie
  }),
  optional: jwt({
    secret,
    algorithms: ['HS256'],
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromCookie
  })
};

export { auth, getIdFromToken };
