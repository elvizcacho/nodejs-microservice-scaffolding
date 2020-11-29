import expressServer from '@infra/http/ExpressServer';

const shutDownInfra = async () => {
  expressServer.stopServer();
  process.exit(0);
};

process.on('SIGINT', shutDownInfra);
process.on('SIGTERM', shutDownInfra);
