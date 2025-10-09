import { FastifyReply, FastifyRequest } from "fastify";

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const publicRoutes: RegExp[] = [
      /^PUT-\/credencial(\/[^\/]+)?$/,
      /^POST-\/credencial$/,
      /^POST-\/credencial\/signin$/,
      /^GET-\/docs$/,
      /^GET-\/docs\/json$/,
      /^GET-\/docs\/static\/.*$/,
      /^PUT-\/usuario(\/[^\/]+)?$/,
    ];

    const cleanUrl = request.url.split('?')[0];
    const routeIdentifier = `${request.method}-${cleanUrl}`;

    const isPublicRoute = publicRoutes.some((regex) => regex.test(routeIdentifier));

    if (isPublicRoute) return;

    const decoded = await request.jwtVerify();
    request.user = decoded as { username: string; credencialId: number };

  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' });
  }
}
