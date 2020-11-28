import '@services/ExceptionListener'
import '@services/RejectionListener'
import '@services/GracefulShutdownListener'
import expressServer from '@infra/http/ExpressServer'

;(async () => {
  expressServer.loadDocumentation()
  expressServer.loadModules()
  expressServer.startServer()
})()
