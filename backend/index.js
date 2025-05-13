import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { apiRateLimiter } from './src/middleware/rateLimiter.js';
import initializePassport from './src/config/passport.js';
import routes from './src/routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/utils/swagger.js';

const app = express();
const PORT = process.env.PORT || 3333;
const isProd = process.env.NODE_ENV === 'production';

// ✅ Log environment
console.log(`${isProd ? '🚀 Production' : '🔧 Development'} mode`);

// ✅ Trust proxy for secure cookies behind reverse proxies (NGINX, etc.)
app.set('trust proxy', 1);

// ✅ Initialize Passport Strategy (Correct usage!)
initializePassport(passport);  // <--- NOT `passportConfig;`

// ✅ Security Middleware
app.use(helmet({ contentSecurityPolicy: false })); // safer for Swagger/iFrames
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(passport.initialize());
app.use(apiRateLimiter);

// ✅ API Routes
app.use('/api', routes);

// ✅ Swagger Docs (ONLY in development)
if (!isProd) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// ✅ Health Check
app.get('/', (_, res) => res.send({ message: 'API is running securely with Helmet' }));

// ✅ Global Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error('[Error]', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
