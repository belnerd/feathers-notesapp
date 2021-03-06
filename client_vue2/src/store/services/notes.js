import feathersClient, {
    makeServicePlugin,
    BaseModel
  } from '../../feathers-client'
//   import { format } from 'date-fns'
  
  class Note extends BaseModel {
    constructor(data, options) {
      super(data, options)
    }
    // Required for $FeathersVuex plugin to work after production transpile.
    static modelName = 'Note'
    // Define default properties here
    static instanceDefaults() {
      return {
        text: ''
      }
    }
    static setupInstance(data, { models }) {
      if (data.createdAt) {
        data.createdAt = new Date(data.createdAt).toLocaleDateString();
      }
      if (data.user) {
        data.user = new models.api.User(data.user)
      }
      return data
    }
    // get formattedDate() {
    //   return format(this.createdAt, 'MMM do, hh:mm:ss')
    // }
  }
  const servicePath = 'notes'
  const servicePlugin = makeServicePlugin({
    Model: Note,
    service: feathersClient.service(servicePath),
    servicePath
  })
  
  // Setup the client-side Feathers hooks.
  feathersClient.service(servicePath).hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  })
  
  export default servicePlugin