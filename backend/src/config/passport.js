import { Strategy as JwtStrategy } from 'passport-jwt';
import prisma from '../lib/prismaClient.js';

/**
 * Extract JWT from cookies instead of headers.
 */
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  return token;
};

/**
 * Initializes Passport with JWT strategy using cookies.
 * Adds user info to `req.user` if token is valid.
 */
export default function initializePassport(passport) {
  const opts = {
    jwtFromRequest: cookieExtractor, // ✅ use cookie instead of header
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwt_payload.userId },
        });

        if (
          !user ||
          user.isDeleted ||
          user.isDeactivated ||
          user.isSuspended === true
        ) {
          return done(null, false);
        }

        return done(null, user); // ✅ sets req.user
      } catch (err) {
        return done(err, false);
      }
    })
  );
}
