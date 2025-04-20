import Fastify, { FastifyInstance } from 'fastify';
import pino from 'pino';
import fastifyCors from '@fastify/cors';
import routes from './routes';

const server: FastifyInstance = Fastify({ logger: pino({ level: 'info' }) });

server.register(fastifyCors);
server.register(routes, { prefix: '/api' });

const start = async () => {
  try {
    await server.listen(4000);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
