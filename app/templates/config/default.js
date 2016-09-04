module.exports = {
  listen: {
    port: 8080
  },
  healthcheck: {
    port: 8081
  },
  opbeat: {
    appId: '11043d565d', // WARN: replace with real app id, or errors will be catched by default app handler
    organizationId: '187d12f8f3de4367b32c453939b6d765',
    secretToken: 'c6cc9c5556ed92259ee54505da5daceefe8fb240'
  },
  log: {
    stdout: { level: 'info' }
  },
  microservice: {}
}
