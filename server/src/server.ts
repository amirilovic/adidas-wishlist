import { Server } from 'hapi';
import * as config from 'config';
import routes from './routes';
import * as plugins from './plugins';
import logger from './utils/logger';
import { errorMiddleware } from './middlewares/error-middleware';

const server = new Server();

server.connection({
  port: config.get<number>('app.port'),
  routes: { cors: true },
});

// attach routes here
server.route(routes);

// register plugins
const registerPlugins = async () => {
  try {

    errorMiddleware(server);

    await server.register(plugins);
  } catch (error) {
    logger.error(error, 'Failed to register hapi plugins');
    throw error;
  }
};

registerPlugins();

// export modules
export default server;
