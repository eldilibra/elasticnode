var request = require('request');

var ElasticNode = function (config) {
  this.host = config.host;
  this.port = config.port;
};

ElasticNode.prototype.index = function (options, callback) {
  if (!options.doc || !options.doc.id) {
    callback(new Error('Must provide a document for indexing. That document must have an id field.'));
    return;
  }
  if(!options.index || !options.type) {
    callback(new Error('Must provide an index and type for indexing.'));
    return;
  }
  var requestObject = {
    uri: 'http://' + this.host + ':' + this.port + '/' + options.index + '/' + options.type + '/' + options.doc.id,
    method: 'PUT',
    body: JSON.stringify(options.doc)
  };
  request(requestObject, function(err, res, body) {
    if (err) throw err;
    callback(err, res, body);
  });
};

ElasticNode.prototype.get = function (options, callback) {
  if (!options.index || !options.type || !options.id) {
    callback(new Error('Must provide index, type, and id to GET the document you want'));
    return;
  }
  var requestObject = {
    uri: 'http://' + this.host + ':' + this.port + '/' + options.index + '/' + options.type + '/' + options.id,
  };
  request(requestObject, function(err, res, body) {
    if (err) throw err;
    callback(err, res, body);
  });
};

ElasticNode.prototype.search = function (options, callback) {
  if (!options.index || !options.type) {
    callback(new Error('Must provide index and type to perform a search'));
    return;
  }
  if (!options.queryObject) {
    callback(new Error('Must provide a query object to perform a search'));
  }
  var requestObject = {
    uri: 'http://' + this.host + ':' + this.port + '/' + options.index + '/' + options.type + '/_search',
    method: 'GET',
    body: JSON.stringify(options.queryObject)
  };
  request(requestObject, function(err, res, body) {
    if (err) throw err;
    callback(err, res, body);
  });
};

ElasticNode.prototype.moreLikeThis = function (options, callback) {
  if (!options.index || !options.type || !options.id) {
    callback(new Error('Must provide index, type, and id to perform a moreLikeThis query'));
    return;
  }
  var requestObject = {
    uri: 'http://' + this.host + ':' + this.port + '/' + options.index + '/' + options.type + '/' + options.id + '/_mlt',
    method: 'GET',
    body: JSON.stringify(options.queryObject),
    qs: {
      search_from: options.from || 0,
      search_size: options.size || 10
    }
  };
  request(requestObject, function(err, res, body) {
    if (err) throw err;
    callback(err, res, body);
  });
};

ElasticNode.prototype.deleteByQuery = function (options, callback) {
  if (!options.index || !options.type) {
    callback(new Error('Must provide index and type to perform a deletion by query'));
    return;
  }
  if (!options.queryObject) {
    callback(new Error('Must provide a query object to perform a deletion by query'));
    return;
  }
  var requestObject = {
    uri: 'http://' + this.host + ':' + this.port + '/' + options.index + '/_query',
    method: 'DELETE',
    body: JSON.stringify(options.queryObject)
  };
  request(requestObject, function(err, res, body) {
    if (err) throw err;
    callback(err, res, body);
  });
};

module.exports = ElasticNode;
