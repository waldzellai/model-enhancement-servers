---
url: "https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping"
title: "Ping - Model Context Protocol"
---

[Skip to main content](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping#content-area)

[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](https://modelcontextprotocol.io/)

Version 2025-11-25 (latest)

Search...

Ctrl K

- [Blog](https://blog.modelcontextprotocol.io/)
- [GitHub](https://github.com/modelcontextprotocol)

Search...

Navigation

Utilities

Ping

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

  - [Cancellation](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation)
  - [Ping](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping)
  - [Progress](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/progress)
  - [Tasks](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks)

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


- [Schema Reference](https://modelcontextprotocol.io/specification/2025-11-25/schema)

On this page

- [Overview](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping#overview)
- [Message Format](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping#message-format)
- [Behavior Requirements](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping#behavior-requirements)
- [Usage Patterns](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping#usage-patterns)
- [Implementation Considerations](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping#implementation-considerations)
- [Error Handling](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping#error-handling)

Utilities

# Ping

Copy page

Copy page

**Protocol Revision**: 2025-11-25

The Model Context Protocol includes an optional ping mechanism that allows either party
to verify that their counterpart is still responsive and the connection is alive.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping\#overview)  Overview

The ping functionality is implemented through a simple request/response pattern. Either
the client or server can initiate a ping by sending a `ping` request.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping\#message-format)  Message Format

A ping request is a standard JSON-RPC request with no parameters:

Copy

```
{
  "jsonrpc": "2.0",
  "id": "123",
  "method": "ping"
}
```

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping\#behavior-requirements)  Behavior Requirements

1. The receiver **MUST** respond promptly with an empty response:

Copy

```
{
  "jsonrpc": "2.0",
  "id": "123",
  "result": {}
}
```

2. If no response is received within a reasonable timeout period, the sender **MAY**:

   - Consider the connection stale
   - Terminate the connection
   - Attempt reconnection procedures

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping\#usage-patterns)  Usage Patterns

ReceiverSenderReceiverSenderping requestempty response

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping\#implementation-considerations)  Implementation Considerations

- Implementations **SHOULD** periodically issue pings to detect connection health
- The frequency of pings **SHOULD** be configurable
- Timeouts **SHOULD** be appropriate for the network environment
- Excessive pinging **SHOULD** be avoided to reduce network overhead

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping\#error-handling)  Error Handling

- Timeouts **SHOULD** be treated as connection failures
- Multiple failed pings **MAY** trigger connection reset
- Implementations **SHOULD** log ping failures for diagnostics

Was this page helpful?

YesNo

[Cancellation](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation) [Progress](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/progress)

Ctrl+I

[github](https://github.com/modelcontextprotocol)

Assistant

Responses are generated using AI and may contain mistakes.