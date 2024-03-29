const mosca = require("mosca");

const config = require("../../../config/mqtt");

const pubsubsettings = {
  //using ascoltatore
  type: "mongo",
  url: "mongodb://localhost:27017/mqtt",
  pubsubCollection: "ascoltatori",
  mongo: {}
};
const settings = {
  port: config.broker.port,
  //backend: pubsubsettings,
  http: config.broker.http
};

//here we start mosca
const server = new mosca.Server(settings);

server.on("ready", setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

// fired whena  client is connected
server.on("clientConnected", function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on("published", function(packet, client) {
    console.log('Published : ', packet.payload);
});

// fired when a client subscribes to a topic
server.on("subscribed", function(topic, client) {
    console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on("unsubscribed", function(topic, client) {
    console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
server.on("clientDisconnecting", function(client) {
    console.log('clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
server.on("clientDisconnected", function(client) {});
