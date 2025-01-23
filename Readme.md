# Node-RED Gotify Integration

![Node-RED Gotify](/images/generic.png)

A comprehensive module for Node-RED facilitating the sending and receiving of notifications via [Gotify](https://gotify.net/).

## Instalation

In order to install the module run

```
npm install <placeholder>
```

## Publish Node Configuration

![Publish Node](/images/node-publish.png)

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

![Subscribe Node](/images/node-subscribe.png)

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
