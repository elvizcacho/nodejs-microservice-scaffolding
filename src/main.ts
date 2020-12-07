import '@services/ExceptionListener';
import '@services/RejectionListener';
import '@services/GracefulShutdownListener';
import expressServer from '@infra/http/ExpressServer';
import '@infra/db/DatabaseClient';

(async () => {
  expressServer.loadDocumentation();
  expressServer.loadModules();
  expressServer.startServer();
})();
