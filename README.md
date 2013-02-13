#elasticnode#

A node.js client for [ElasticSearch](http://elasticsearch.org).

This client is meant to get out of the way as much as possible. The strongest opinion driving its development is this: Writing out JSON objects isn't that hard. You'll notice that in order to speak with ElasticSearch via **elasticnode**, you will often send along on object (NOT a strict JSON object; **elasticnode** will do that part for you) that is structured according to ElasticSearch's API, which means one less set of docs to look at.

##Currently implemented:##

* ***index***
* ***get***
* ***search***
* ***moreLikeThis*** - uses the /_mlt method, so you can use filters and such in an uncluttered fashion
* ***deleteByQuery***

There will be much more to come.

PS. **elasticnode** uses the [**request** module](https://github.com/mikeal/request) for all HTTP requests, which makes for smooth sailing.
