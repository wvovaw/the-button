import process from 'node:process'
import buildServer from './server'

buildServer().then((server) => {
  void server.listen({
    port: server.config.PORT,
    host: server.config.SERVER_HOSTNAME,
  })

  server.ready((e) => {
    if (e instanceof Error) {
      server.log.fatal(e, 'Server failed on start')
      process.exit(1)
    }
  })
})
