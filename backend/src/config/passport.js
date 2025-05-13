import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import prisma from '../lib/prismaClient.js';

/**
 * Initializes Passport with JWT strategy.
 * Adds user info to `req.user` if token is valid.
 */
export default function initializePassport(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

        return done(null, user); // ✅ req.user gets populated
      } catch (err) {
        return done(err, false);
      }
    })
  );
}
