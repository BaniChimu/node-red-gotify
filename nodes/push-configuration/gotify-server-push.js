module.exports = function (RED) {
  function RemoteServerNode(n) {
    RED.nodes.createNode(this, n);
    this.connectionType = n.connectionType || "http";
    this.server = n.server;
    this.socketPath = n.socketPath;
    this.token = n.token;
    this.appName = n.appName;
  }
  RED.nodes.registerType("gotify-server-push", RemoteServerNode);
};
