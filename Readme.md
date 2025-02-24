# <span style="display: flex; align-items: center;"><img src="https://github.com/BaniChimu/node-red-gotify/raw/main/images/icon.png" height="100"/>Node-RED Gotify Integration</span>

![Node-RED Gotify](https://github.com/BaniChimu/node-red-gotify/blob/main/images/generic.png?raw=true)

A comprehensive module for Node-RED facilitating the sending and receiving of notifications via [Gotify](https://gotify.net/).

## Instalation

In order to install the module run

```
npm install node-red-contrib-gotify-notification
```

## Publish Node Configuration

![Publish Node](https://github.com/BaniChimu/node-red-gotify/raw/main/images/node-publish.png?raw=true)

### Configuration:

- **Override**: Determines if the `title`, `message`, `priority`, and `extras` properties from incoming messages should be overwritten.
- **Title**: Specifies the notification title.
- **Message**: The main text of the notification.
- **Priority**: Sets the notification's priority level.
- **Extras**: Additional data for the notification, formatted as JSON.

### Workflow

The publish node can be integrated at any point in your workflow.

### Inputs

The node accepts inputs from the `msg.` object. Ensure `override` is disabled to utilize this feature.

#### Example `msg` Object

```json
{
  "message": "Example Message",
  "title": "Example Title",
  "priority": 5,
  "extras": {
    "my_extra_parameter": "Parameter"
  }
}
```

### Outputs

After sending a notification, the node outputs the notification details as a JSON object in `msg.gotify`.

## Subscribe Node Configuration

![Subscribe Node](https://github.com/BaniChimu/node-red-gotify/raw/main/images/node-subscribe.png?raw=true)

### Configuration:

- **Server**: The target server for subscription.

### Workflow

This node can be placed at any suitable point in your workflow.

### Outputs

Upon receiving notifications, the node outputs the data as a JSON object in `msg.`

#### Example `msg` Object for a Notification

```json
{
  "id": 1,
  "appid": 1,
  "message": "Some message",
  "title": "Some title",
  "priority": 0,
  "date": "2025-01-23T18:16:08.991165343Z"
}
```
