import jwt from "jsonwebtoken";

class TokenUtils {
  constructor() {}

  generateToken<T extends object>(
    payload: T,
    expiresAt: string | number = "1d",
    secret: string = process.env.JWT_SECRET || ""
  ): string {
    if (!payload || !secret)
      throw new Error("Please provide all required parameters");
    return jwt.sign({ data: payload }, secret, {
      expiresIn: expiresAt,
    });
  }

  verifyToken(
    token: string,
    secret: string = process.env.JWT_SECRET || ""
  ): { payload: any; expired: boolean; exp?: number } {
    try {
      const decoded = jwt.verify(token, secret, {
        ignoreExpiration: true,
      }) as { data: any[]; exp: number };

      const now = Math.floor(Date.now() / 1000);
      return {
        payload: decoded.data,
        expired: decoded.exp < now,
        exp: decoded.exp,
      };
    } catch (e) {
      return { payload: null, expired: true };
    }
  }
}

export default new TokenUtils();
