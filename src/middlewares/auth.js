import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { UnauthorizedError } from './errorHandler.js';

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/v2.0/keys`,
  cache: true,
  cacheMaxAge: 600000,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export function verifyJWT(options) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return next(new UnauthorizedError('Missing authorization header'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(new UnauthorizedError('Invalid authorization header'));
    }

    jwt.verify(
      token,
      getKey,
      {
        algorithms: ['RS256'],
        audience: `api://${process.env.CLIENT_ID}`,
        issuer: `https://sts.windows.net/${process.env.TENANT_ID}/`,
      },
      (err, decoded) => {
        if (err) {
          return next(new UnauthorizedError(err.message));
        }
        if (options.scopes && options.scopes.length > 0) {
          const tokenScopes = decoded.scp ? decoded.scp.split(' ') : [];
          const hasScopes = options.scopes.every(scope =>
            tokenScopes.includes(scope)
          );

          if (!hasScopes) {
            return next(
              new UnauthorizedError(
                `Missing scopes: ${options.scopes.join(', ')}`
              )
            );
          }
        }
        req.user = decoded;
        next();
      }
    );
  };
}
