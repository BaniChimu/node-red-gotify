module.exports = function (RED) {
  function RemoteServerNode(n) {
    RED.nodes.createNode(this, n);
    this.server = n.server;
    this.token = n.token;
    this.appName = n.appName;
  }
  RED.nodes.registerType("gotify-server-subscribe", RemoteServerNode);
};
