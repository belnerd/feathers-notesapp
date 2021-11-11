const { Service } = require('feathers-mongodb');

exports.Notes = class Notes extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('notes');
    });
  }
};
