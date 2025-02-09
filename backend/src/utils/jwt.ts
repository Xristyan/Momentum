import { JwtPayload, verify } from "jsonwebtoken";

export const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET!, (err, payload) => {
      if (err) {
        return reject(err);
      }

      resolve(payload as JwtPayload);
    });
  });
};
