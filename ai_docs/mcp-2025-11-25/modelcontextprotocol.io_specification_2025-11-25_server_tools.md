---
url: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools"
title: "Tools - Model Context Protocol"
---

[Skip to main content](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#content-area)

[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](https://modelcontextprotocol.io/)

Version 2025-11-25 (latest)

Search...

Ctrl K

- [Blog](https://blog.modelcontextprotocol.io/)
- [GitHub](https://github.com/modelcontextprotocol)

Search...

Navigation

Server Features

Tools

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

- [User Interaction Model](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#user-interaction-model)
- [Capabilities](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#capabilities)
- [Protocol Messages](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#protocol-messages)
- [Listing Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#listing-tools)
- [Calling Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#calling-tools)
- [List Changed Notification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#list-changed-notification)
- [Message Flow](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#message-flow)
- [Data Types](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#data-types)
- [Tool](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#tool)
- [Tool Names](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#tool-names)
- [Tool Result](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#tool-result)
- [Text Content](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#text-content)
- [Image Content](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#image-content)
- [Audio Content](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#audio-content)
- [Resource Links](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#resource-links)
- [Embedded Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#embedded-resources)
- [Structured Content](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#structured-content)
- [Output Schema](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#output-schema)
- [Schema Examples](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#schema-examples)
- [Tool with default 2020-12 schema:](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#tool-with-default-2020-12-schema%3A)
- [Tool with explicit draft-07 schema:](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#tool-with-explicit-draft-07-schema%3A)
- [Tool with no parameters:](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#tool-with-no-parameters%3A)
- [Error Handling](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling)
- [Security Considerations](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#security-considerations)

Server Features

# Tools

Copy page

Copy page

**Protocol Revision**: 2025-11-25

The Model Context Protocol (MCP) allows servers to expose tools that can be invoked by
language models. Tools enable models to interact with external systems, such as querying
databases, calling APIs, or performing computations. Each tool is uniquely identified by
a name and includes metadata describing its schema.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#user-interaction-model)  User Interaction Model

Tools in MCP are designed to be **model-controlled**, meaning that the language model can
discover and invoke tools automatically based on its contextual understanding and the
user’s prompts.However, implementations are free to expose tools through any interface pattern that
suits their needs—the protocol itself does not mandate any specific user
interaction model.

For trust & safety and security, there **SHOULD** always
be a human in the loop with the ability to deny tool invocations.Applications **SHOULD**:

- Provide UI that makes clear which tools are being exposed to the AI model
- Insert clear visual indicators when tools are invoked
- Present confirmation prompts to the user for operations, to ensure a human is in the
loop

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#capabilities)  Capabilities

Servers that support tools **MUST** declare the `tools` capability:

Copy

```
{
  "capabilities": {
    "tools": {
      "listChanged": true
    }
  }
}
```

`listChanged` indicates whether the server will emit notifications when the list of
available tools changes.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#protocol-messages)  Protocol Messages

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#listing-tools)  Listing Tools

To discover available tools, clients send a `tools/list` request. This operation supports
[pagination](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/pagination).**Request:**

Copy

```
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {
    "cursor": "optional-cursor-value"
  }
}
```

**Response:**

Copy

```
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [\
      {\
        "name": "get_weather",\
        "title": "Weather Information Provider",\
        "description": "Get current weather information for a location",\
        "inputSchema": {\
          "type": "object",\
          "properties": {\
            "location": {\
              "type": "string",\
              "description": "City name or zip code"\
            }\
          },\
          "required": ["location"]\
        },\
        "icons": [\
          {\
            "src": "https://example.com/weather-icon.png",\
            "mimeType": "image/png",\
            "sizes": ["48x48"]\
          }\
        ]\
      }\
    ],
    "nextCursor": "next-page-cursor"
  }
}
```

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#calling-tools)  Calling Tools

To invoke a tool, clients send a `tools/call` request:**Request:**

Copy

```
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "New York"
    }
  }
}
```

**Response:**

Copy

```
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [\
      {\
        "type": "text",\
        "text": "Current weather in New York:\nTemperature: 72°F\nConditions: Partly cloudy"\
      }\
    ],
    "isError": false
  }
}
```

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#list-changed-notification)  List Changed Notification

When the list of available tools changes, servers that declared the `listChanged`
capability **SHOULD** send a notification:

Copy

```
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed"
}
```

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#message-flow)  Message Flow

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#data-types)  Data Types

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#tool)  Tool

A tool definition includes:

- `name`: Unique identifier for the tool
- `title`: Optional human-readable name of the tool for display purposes.
- `description`: Human-readable description of functionality
- `inputSchema`: JSON Schema defining expected parameters

  - Follows the [JSON Schema usage guidelines](https://modelcontextprotocol.io/specification/2025-11-25/basic#json-schema-usage)
  - Defaults to 2020-12 if no `$schema` field is present
  - **MUST** be a valid JSON Schema object (not `null`)
  - For tools with no parameters, use one of these valid approaches:
    - `{ "type": "object", "additionalProperties": false }` \- **Recommended**: explicitly accepts only empty objects
    - `{ "type": "object" }` \- accepts any object (including with properties)
- `outputSchema`: Optional JSON Schema defining expected output structure

  - Follows the [JSON Schema usage guidelines](https://modelcontextprotocol.io/specification/2025-11-25/basic#json-schema-usage)
  - Defaults to 2020-12 if no `$schema` field is present
- `annotations`: Optional properties describing tool behavior

For trust & safety and security, clients **MUST** consider tool annotations to
be untrusted unless they come from trusted servers.

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#tool-names)  Tool Names

- Tool names **SHOULD** be between 1 and 128 characters in length (inclusive).
- Tool names **SHOULD** be considered case-sensitive.
- The following **SHOULD** be the only allowed characters: uppercase and lowercase ASCII letters (A-Z, a-z), digits
(0-9), underscore (\_), hyphen (-), and dot (.)
- Tool names **SHOULD NOT** contain spaces, commas, or other special characters.
- Tool names **SHOULD** be unique within a server.
- Example valid tool names:
  - getUser
  - DATA\_EXPORT\_v2
  - admin.tools.list

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#tool-result)  Tool Result

Tool results may contain [**structured**](https://modelcontextprotocol.io/specification/2025-11-25/server/tools#structured-content) or **unstructured** content.**Unstructured** content is returned in the `content` field of a result, and can contain multiple content items of different types:

All content types (text, image, audio, resource links, and embedded resources)
support optional
[annotations](https://modelcontextprotocol.io/specification/2025-11-25/server/resources#annotations) that
provide metadata about audience, priority, and modification times. This is the
same annotation format used by resources and prompts.

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#text-content)  Text Content

Copy

```
{
  "type": "text",
  "text": "Tool result text"
}
```

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#image-content)  Image Content

Copy

```
{
  "type": "image",
  "data": "base64-encoded-data",
  "mimeType": "image/png",
  "annotations": {
    "audience": ["user"],
    "priority": 0.9
  }
}
```

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#audio-content)  Audio Content

Copy

```
{
  "type": "audio",
  "data": "base64-encoded-audio-data",
  "mimeType": "audio/wav"
}
```

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#resource-links)  Resource Links

A tool **MAY** return links to [Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources), to provide additional context
or data. In this case, the tool will return a URI that can be subscribed to or fetched by the client:

Copy

```
{
  "type": "resource_link",
  "uri": "file:///project/src/main.rs",
  "name": "main.rs",
  "description": "Primary application entry point",
  "mimeType": "text/x-rust"
}
```

Resource links support the same [Resource annotations](https://modelcontextprotocol.io/specification/2025-11-25/server/resources#annotations) as regular resources to help clients understand how to use them.

Resource links returned by tools are not guaranteed to appear in the results
of a `resources/list` request.

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#embedded-resources)  Embedded Resources

[Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources) **MAY** be embedded to provide additional context
or data using a suitable [URI scheme](https://modelcontextprotocol.io/specification/2025-11-25/server/resources#common-uri-schemes). Servers that use embedded resources **SHOULD** implement the `resources` capability:

Copy

```
{
  "type": "resource",
  "resource": {
    "uri": "file:///project/src/main.rs",
    "mimeType": "text/x-rust",
    "text": "fn main() {\n    println!(\"Hello world!\");\n}",
    "annotations": {
      "audience": ["user", "assistant"],
      "priority": 0.7,
      "lastModified": "2025-05-03T14:30:00Z"
    }
  }
}
```

Embedded resources support the same [Resource annotations](https://modelcontextprotocol.io/specification/2025-11-25/server/resources#annotations) as regular resources to help clients understand how to use them.

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#structured-content)  Structured Content

**Structured** content is returned as a JSON object in the `structuredContent` field of a result.For backwards compatibility, a tool that returns structured content SHOULD also return the serialized JSON in a TextContent block.

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#output-schema)  Output Schema

Tools may also provide an output schema for validation of structured results.
If an output schema is provided:

- Servers **MUST** provide structured results that conform to this schema.
- Clients **SHOULD** validate structured results against this schema.

Example tool with output schema:

Copy

```
{
  "name": "get_weather_data",
  "title": "Weather Data Retriever",
  "description": "Get current weather data for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City name or zip code"
      }
    },
    "required": ["location"]
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "temperature": {
        "type": "number",
        "description": "Temperature in celsius"
      },
      "conditions": {
        "type": "string",
        "description": "Weather conditions description"
      },
      "humidity": {
        "type": "number",
        "description": "Humidity percentage"
      }
    },
    "required": ["temperature", "conditions", "humidity"]
  }
}
```

Example valid response for this tool:

Copy

```
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "content": [\
      {\
        "type": "text",\
        "text": "{\"temperature\": 22.5, \"conditions\": \"Partly cloudy\", \"humidity\": 65}"\
      }\
    ],
    "structuredContent": {
      "temperature": 22.5,
      "conditions": "Partly cloudy",
      "humidity": 65
    }
  }
}
```

Providing an output schema helps clients and LLMs understand and properly handle structured tool outputs by:

- Enabling strict schema validation of responses
- Providing type information for better integration with programming languages
- Guiding clients and LLMs to properly parse and utilize the returned data
- Supporting better documentation and developer experience

### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#schema-examples)  Schema Examples

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#tool-with-default-2020-12-schema:)  Tool with default 2020-12 schema:

Copy

```
{
  "name": "calculate_sum",
  "description": "Add two numbers",
  "inputSchema": {
    "type": "object",
    "properties": {
      "a": { "type": "number" },
      "b": { "type": "number" }
    },
    "required": ["a", "b"]
  }
}
```

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#tool-with-explicit-draft-07-schema:)  Tool with explicit draft-07 schema:

Copy

```
{
  "name": "calculate_sum",
  "description": "Add two numbers",
  "inputSchema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "a": { "type": "number" },
      "b": { "type": "number" }
    },
    "required": ["a", "b"]
  }
}
```

#### [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#tool-with-no-parameters:)  Tool with no parameters:

Copy

```
{
  "name": "get_current_time",
  "description": "Returns the current server time",
  "inputSchema": {
    "type": "object",
    "additionalProperties": false
  }
}
```

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#error-handling)  Error Handling

Tools use two error reporting mechanisms:

1. **Protocol Errors**: Standard JSON-RPC errors for issues like:   - Unknown tools
   - Malformed requests (requests that fail to satisfy [CallToolRequest schema](https://modelcontextprotocol.io/specification/2025-11-25/server/specification/2025-11-25/schema#calltoolrequest))
   - Server errors
2. **Tool Execution Errors**: Reported in tool results with `isError: true`:   - API failures
   - Input validation errors (e.g., date in wrong format, value out of range)
   - Business logic errors

**Tool Execution Errors** contain actionable feedback that language models can use to self-correct and retry with adjusted parameters.
**Protocol Errors** indicate issues with the request structure itself that models are less likely to be able to fix.
Clients **SHOULD** provide tool execution errors to language models to enable self-correction.
Clients **MAY** provide protocol errors to language models, though these are less likely to result in successful recovery.Example protocol error:

Copy

```
{
  "jsonrpc": "2.0",
  "id": 3,
  "error": {
    "code": -32602,
    "message": "Unknown tool: invalid_tool_name"
  }
}
```

Example tool execution error (input validation):

Copy

```
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "content": [\
      {\
        "type": "text",\
        "text": "Invalid departure date: must be in the future. Current date is 08/08/2025."\
      }\
    ],
    "isError": true
  }
}
```

## [​](https://modelcontextprotocol.io/specification/2025-11-25/server/tools\#security-considerations)  Security Considerations

1. Servers **MUST**:   - Validate all tool inputs
   - Implement proper access controls
   - Rate limit tool invocations
   - Sanitize tool outputs
2. Clients **SHOULD**:   - Prompt for user confirmation on sensitive operations
   - Show tool inputs to the user before calling the server, to avoid malicious or
     accidental data exfiltration
   - Validate tool results before passing to LLM
   - Implement timeouts for tool calls
   - Log tool usage for audit purposes

Was this page helpful?

YesNo

[Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources) [Completion](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/completion)

Ctrl+I

[github](https://github.com/modelcontextprotocol)

Assistant

Responses are generated using AI and may contain mistakes.