---
url: "https://modelcontextprotocol.io/specification/2025-11-25/changelog"
title: "Key Changes - Model Context Protocol"
---

[Skip to main content](https://modelcontextprotocol.io/specification/2025-11-25/changelog#content-area)

[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](https://modelcontextprotocol.io/)

Version 2025-11-25 (latest)

Search...

Ctrl K

- [Blog](https://blog.modelcontextprotocol.io/)
- [GitHub](https://github.com/modelcontextprotocol)

Search...

Navigation

Key Changes

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


- [Schema Reference](https://modelcontextprotocol.io/specification/2025-11-25/schema)

On this page

- [Major changes](https://modelcontextprotocol.io/specification/2025-11-25/changelog#major-changes)
- [Minor changes](https://modelcontextprotocol.io/specification/2025-11-25/changelog#minor-changes)
- [Other schema changes](https://modelcontextprotocol.io/specification/2025-11-25/changelog#other-schema-changes)
- [Governance and process updates](https://modelcontextprotocol.io/specification/2025-11-25/changelog#governance-and-process-updates)
- [Full changelog](https://modelcontextprotocol.io/specification/2025-11-25/changelog#full-changelog)

# Key Changes

Copy page

Copy page

This document lists changes made to the Model Context Protocol (MCP) specification since
the previous revision, [2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18).

## [​](https://modelcontextprotocol.io/specification/2025-11-25/changelog\#major-changes)  Major changes

1. Enhance authorization server discovery with support for [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html). (PR [#797](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/797))
2. Allow servers to expose icons as additional metadata for tools, resources, resource templates, and prompts ( [SEP-973](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/973)).
3. Enhance authorization flows with incremental scope consent via `WWW-Authenticate` ( [SEP-835](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/835))
4. Provide guidance on tool names ( [SEP-986](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1603))
5. Update `ElicitResult` and `EnumSchema` to use a more standards-based approach and support titled, untitled, single-select, and multi-select enums ( [SEP-1330](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1330)).
6. Added support for [URL mode elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation#url-elicitation-requests) ( [SEP-1036](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/887))
7. Add tool calling support to sampling via `tools` and `toolChoice` parameters ( [SEP-1577](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1577))
8. Add support for OAuth Client ID Metadata Documents as a recommended client registration mechanism ( [SEP-991](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/991), PR [#1296](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1296))
9. Add experimental support for [tasks](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks) to enable tracking durable requests with polling and deferred result retrieval ( [SEP-1686](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1686)).

## [​](https://modelcontextprotocol.io/specification/2025-11-25/changelog\#minor-changes)  Minor changes

01. Clarify that servers using stdio transport may use stderr for all types of logging, not just error messages (PR [#670](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/670)).
02. Add optional `description` field to `Implementation` interface to align with MCP registry server.json format and provide human-readable context during initialization.
03. Clarify that servers must respond with HTTP 403 Forbidden for invalid Origin headers in Streamable HTTP transport. (PR [#1439](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1439))
04. Updated the [Security Best Practices guidance](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices).
05. Clarify that input validation errors should be returned as Tool Execution Errors rather than Protocol Errors to enable model self-correction ( [SEP-1303](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1303)).
06. Support polling SSE streams by allowing servers to disconnect at will ( [SEP-1699](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1699)).
07. Clarify SEP-1699: GET streams support polling, resumption always via GET regardless of stream origin, event IDs should encode stream identity, disconnection includes server-initiated closure (Issue [#1847](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1847)).
08. Align OAuth 2.0 Protected Resource Metadata discovery with RFC 9728, making `WWW-Authenticate` header optional with fallback to `.well-known` endpoint ( [SEP-985](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/985)).
09. Add support for default values in all primitive types (string, number, enum) for elicitation schemas ( [SEP-1034](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1034)).
10. Establish JSON Schema 2020-12 as the default dialect for MCP schema definitions ( [SEP-1613](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1613)).

## [​](https://modelcontextprotocol.io/specification/2025-11-25/changelog\#other-schema-changes)  Other schema changes

1. Decouple request payloads from RPC method definitions into standalone parameter schemas. ( [SEP-1319](https://github.com/modelcontextprotocol/specification/issues/1319), PR [#1284](https://github.com/modelcontextprotocol/specification/pull/1284))

## [​](https://modelcontextprotocol.io/specification/2025-11-25/changelog\#governance-and-process-updates)  Governance and process updates

1. Formalize Model Context Protocol governance structure ( [SEP-932](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/932)).
2. Establish shared communication practices and guidelines for the MCP community ( [SEP-994](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/994)).
3. Formalize Working Groups and Interest Groups in MCP governance ( [SEP-1302](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1302)).
4. Establish SDK tiering system with clear requirements for feature support and maintenance commitments ( [SEP-1730](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1730)).

## [​](https://modelcontextprotocol.io/specification/2025-11-25/changelog\#full-changelog)  Full changelog

For a complete list of all changes that have been made since the last protocol revision,
[see GitHub](https://github.com/modelcontextprotocol/specification/compare/2025-06-18...2025-11-25).

Was this page helpful?

YesNo

[Specification](https://modelcontextprotocol.io/specification/2025-11-25) [Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture/index)

Ctrl+I

[github](https://github.com/modelcontextprotocol)

Assistant

Responses are generated using AI and may contain mistakes.