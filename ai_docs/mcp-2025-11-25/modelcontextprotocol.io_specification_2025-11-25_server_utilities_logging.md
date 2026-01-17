---
url: "https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging"
title: "Logging - Model Context Protocol"
---

[Skip to main content](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#content-area)

[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](https://modelcontextprotocol.io/)

Version 2025-11-25 (latest)

Search...

Ctrl K

- [Blog](https://blog.modelcontextprotocol.io/)
- [GitHub](https://github.com/modelcontextprotocol)

Search...

Navigation

Utilities

Logging

[Documentation](https://modelcontextprotocol.io/docs/getting-started/intro) [Specification](https://modelcontextprotocol.io/specification/2025-11-25) [Community](https://modelcontextprotocol.io/community/communication) [About MCP](https://modelcontextprotocol.io/about)

- [Specification](https://modelcontextprotocol.io/specification/2025-11-25)

- [Key Changes](https://modelcontextprotocol.io/specification/2025-11-25/changelog)

- [Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)

##### Base Protocol

- [Overview](https://modelcontextprotocol.io/specification/2025-11-25/basic)
- [Lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)
- [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
- [Authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- Utilities


##### Client Features

- [Roots](https://modelcontextprotocol.io/specification/2025-11-25/client/roots)
- [Sampling](https://modelcontextprotocol.io/specification/2025-11-25/client/sampling)
- [Elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation)

##### Server Features

- [Overview](https://modelcontextprotocol.io/specification/2025-11-25/server)
- [Prompts](https://modelcontextprotocol.io/specification/2025-11-25/server/prompts)
- [Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)
- [Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- Utilities

  - [Completion](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/completion)
  - [Logging](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging)
  - [Pagination](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/pagination)

- [Schema Reference](https://modelcontextprotocol.io/specification/2025-11-25/schema)

On this page

- [User Interaction Model](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#user-interaction-model)
- [Capabilities](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#capabilities)
- [Log Levels](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#log-levels)
- [Protocol Messages](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#protocol-messages)
- [Setting Log Level](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#setting-log-level)
- [Log Message Notifications](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#log-message-notifications)
- [Message Flow](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#message-flow)
- [Error Handling](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#error-handling)
- [Implementation Considerations](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#implementation-considerations)
- [Security](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging#security)

Utilities

# Logging

Copy page

Copy page

**Protocol Revision**: 2025-11-25

The Model Context Protocol (MCP) provides a standardized way for servers to send
structured log messages to clients. Clients can control logging verbosity by setting
minimum log levels, with servers sending notifications containing severity levels,
optional logger names, and arbitrary JSON-serializable data.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#user-interaction-model)  User Interaction Model

Implementations are free to expose logging through any interface pattern that suits their
needs—the protocol itself does not mandate any specific user interaction model.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#capabilities)  Capabilities

Servers that emit log message notifications **MUST** declare the `logging` capability:

Copy

```
{
  "capabilities": {
    "logging": {}
  }
}
```

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#log-levels)  Log Levels

The protocol follows the standard syslog severity levels specified in
[RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1):

| Level | Description | Example Use Case |
| --- | --- | --- |
| debug | Detailed debugging information | Function entry/exit points |
| info | General informational messages | Operation progress updates |
| notice | Normal but significant events | Configuration changes |
| warning | Warning conditions | Deprecated feature usage |
| error | Error conditions | Operation failures |
| critical | Critical conditions | System component failures |
| alert | Action must be taken immediately | Data corruption detected |
| emergency | System is unusable | Complete system failure |

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#protocol-messages)  Protocol Messages

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#setting-log-level)  Setting Log Level

To configure the minimum log level, clients **MAY** send a `logging/setLevel` request:**Request:**

Copy

```
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "logging/setLevel",
  "params": {
    "level": "info"
  }
}
```

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#log-message-notifications)  Log Message Notifications

Servers send log messages using `notifications/message` notifications:

Copy

```
{
  "jsonrpc": "2.0",
  "method": "notifications/message",
  "params": {
    "level": "error",
    "logger": "database",
    "data": {
      "error": "Connection failed",
      "details": {
        "host": "localhost",
        "port": 5432
      }
    }
  }
}
```

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#message-flow)  Message Flow

ServerClientServerClientConfigure LoggingServer ActivityLevel ChangeOnly sends error leveland abovelogging/setLevel (info)Empty Resultnotifications/message (info)notifications/message (warning)notifications/message (error)logging/setLevel (error)Empty Result

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#error-handling)  Error Handling

Servers **SHOULD** return standard JSON-RPC errors for common failure cases:

- Invalid log level: `-32602` (Invalid params)
- Configuration errors: `-32603` (Internal error)

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#implementation-considerations)  Implementation Considerations

1. Servers **SHOULD**:   - Rate limit log messages
   - Include relevant context in data field
   - Use consistent logger names
   - Remove sensitive information
2. Clients **MAY**:   - Present log messages in the UI
   - Implement log filtering/search
   - Display severity visually
   - Persist log messages

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/logging\#security)  Security

1. Log messages **MUST NOT** contain:   - Credentials or secrets
   - Personal identifying information
   - Internal system details that could aid attacks
2. Implementations **SHOULD**:   - Rate limit messages
   - Validate all data fields
   - Control log access
   - Monitor for sensitive content

Was this page helpful?

YesNo

[Completion](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/completion) [Pagination](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/pagination)

Ctrl+I

[github](https://github.com/modelcontextprotocol)

Assistant

Responses are generated using AI and may contain mistakes.