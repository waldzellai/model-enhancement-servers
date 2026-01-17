---
url: "https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation"
title: "Cancellation - Model Context Protocol"
---

[Skip to main content](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation#content-area)

[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](https://modelcontextprotocol.io/)

Version 2025-11-25 (latest)

Search...

Ctrl K

- [Blog](https://blog.modelcontextprotocol.io/)
- [GitHub](https://github.com/modelcontextprotocol)

Search...

Navigation

Utilities

Cancellation

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

- [Cancellation Flow](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation#cancellation-flow)
- [Behavior Requirements](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation#behavior-requirements)
- [Timing Considerations](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation#timing-considerations)
- [Implementation Notes](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation#implementation-notes)
- [Error Handling](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation#error-handling)

Utilities

# Cancellation

Copy page

Copy page

**Protocol Revision**: 2025-11-25

The Model Context Protocol (MCP) supports optional cancellation of in-progress requests
through notification messages. Either side can send a cancellation notification to
indicate that a previously-issued request should be terminated.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation\#cancellation-flow)  Cancellation Flow

When a party wants to cancel an in-progress request, it sends a `notifications/cancelled`
notification containing:

- The ID of the request to cancel
- An optional reason string that can be logged or displayed

Copy

```
{
  "jsonrpc": "2.0",
  "method": "notifications/cancelled",
  "params": {
    "requestId": "123",
    "reason": "User requested cancellation"
  }
}
```

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation\#behavior-requirements)  Behavior Requirements

1. Cancellation notifications **MUST** only reference requests that:

   - Were previously issued in the same direction
   - Are believed to still be in-progress
2. The `initialize` request **MUST NOT** be cancelled by clients
3. For [task-augmented requests](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks), the `tasks/cancel` request **MUST** be used instead of the `notifications/cancelled` notification. Tasks have their own dedicated cancellation mechanism that returns the final task state.
4. Receivers of cancellation notifications **SHOULD**:

   - Stop processing the cancelled request
   - Free associated resources
   - Not send a response for the cancelled request
5. Receivers **MAY** ignore cancellation notifications if:

   - The referenced request is unknown
   - Processing has already completed
   - The request cannot be cancelled
6. The sender of the cancellation notification **SHOULD** ignore any response to the
request that arrives afterward

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation\#timing-considerations)  Timing Considerations

Due to network latency, cancellation notifications may arrive after request processing
has completed, and potentially after a response has already been sent.Both parties **MUST** handle these race conditions gracefully:

ServerClientServerClientProcessing startsProcessing may havecompleted beforecancellation arrivesStop processingalt​\[If notcompleted\]Request (ID: 123)notifications/cancelled (ID: 123)

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation\#implementation-notes)  Implementation Notes

- Both parties **SHOULD** log cancellation reasons for debugging
- Application UIs **SHOULD** indicate when cancellation is requested

## [​](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/cancellation\#error-handling)  Error Handling

Invalid cancellation notifications **SHOULD** be ignored:

- Unknown request IDs
- Already completed requests
- Malformed notifications

This maintains the “fire and forget” nature of notifications while allowing for race
conditions in asynchronous communication.

Was this page helpful?

YesNo

[Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) [Ping](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/ping)

Ctrl+I

[github](https://github.com/modelcontextprotocol)

Assistant

Responses are generated using AI and may contain mistakes.