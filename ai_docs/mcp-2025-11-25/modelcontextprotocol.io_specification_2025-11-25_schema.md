---
url: "https://modelcontextprotocol.io/specification/2025-11-25/schema"
title: "Schema Reference - Model Context Protocol"
---

[Skip to main content](https://modelcontextprotocol.io/specification/2025-11-25/schema#content-area)

[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](https://modelcontextprotocol.io/)

Version 2025-11-25 (latest)

Search...

Ctrl K

- [Blog](https://blog.modelcontextprotocol.io/)
- [GitHub](https://github.com/modelcontextprotocol)

Search...

Navigation

Schema Reference

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

- [JSON-RPC](https://modelcontextprotocol.io/specification/2025-11-25/schema#json-rpc)
- [JSONRPCErrorResponse](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcerrorresponse)
- [JSONRPCMessage](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcmessage)
- [JSONRPCNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcnotification)
- [JSONRPCRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcrequest)
- [JSONRPCResultResponse](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcresultresponse)
- [Common Types](https://modelcontextprotocol.io/specification/2025-11-25/schema#common-types)
- [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)
- [Cursor](https://modelcontextprotocol.io/specification/2025-11-25/schema#cursor)
- [EmptyResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#emptyresult)
- [Error](https://modelcontextprotocol.io/specification/2025-11-25/schema#error)
- [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)
- [LoggingLevel](https://modelcontextprotocol.io/specification/2025-11-25/schema#logginglevel)
- [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)
- [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid)
- [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result)
- [Role](https://modelcontextprotocol.io/specification/2025-11-25/schema#role)
- [Content](https://modelcontextprotocol.io/specification/2025-11-25/schema#content)
- [AudioContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent)
- [BlobResourceContents](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents)
- [ContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#contentblock)
- [EmbeddedResource](https://modelcontextprotocol.io/specification/2025-11-25/schema#embeddedresource)
- [ImageContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent)
- [ResourceLink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink)
- [TextContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent)
- [TextResourceContents](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents)
- [completion/complete](https://modelcontextprotocol.io/specification/2025-11-25/schema#completion%2Fcomplete)
- [CompleteRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequest)
- [CompleteRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams)
- [CompleteResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#completeresult)
- [PromptReference](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptreference)
- [ResourceTemplateReference](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplatereference)
- [elicitation/create](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitation%2Fcreate)
- [ElicitRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequest)
- [ElicitRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestparams)
- [ElicitResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitresult)
- [BooleanSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#booleanschema)
- [ElicitRequestFormParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams)
- [ElicitRequestURLParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams)
- [EnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#enumschema)
- [LegacyTitledEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#legacytitledenumschema)
- [MultiSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#multiselectenumschema)
- [NumberSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#numberschema)
- [PrimitiveSchemaDefinition](https://modelcontextprotocol.io/specification/2025-11-25/schema#primitiveschemadefinition)
- [SingleSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#singleselectenumschema)
- [StringSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#stringschema)
- [TitledMultiSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema)
- [TitledSingleSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema)
- [UntitledMultiSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema)
- [UntitledSingleSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema)
- [initialize](https://modelcontextprotocol.io/specification/2025-11-25/schema#initialize)
- [InitializeRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializerequest)
- [InitializeRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializerequestparams)
- [InitializeResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializeresult)
- [ClientCapabilities](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities)
- [Implementation](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation)
- [ServerCapabilities](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities)
- [logging/setLevel](https://modelcontextprotocol.io/specification/2025-11-25/schema#logging%2Fsetlevel)
- [SetLevelRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#setlevelrequest)
- [SetLevelRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#setlevelrequestparams)
- [notifications/cancelled](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Fcancelled)
- [CancelledNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotification)
- [CancelledNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams)
- [notifications/initialized](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Finitialized)
- [InitializedNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializednotification)
- [notifications/tasks/status](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Ftasks%2Fstatus)
- [TaskStatusNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskstatusnotification)
- [TaskStatusNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskstatusnotificationparams)
- [notifications/message](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Fmessage)
- [LoggingMessageNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotification)
- [LoggingMessageNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams)
- [notifications/progress](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Fprogress)
- [ProgressNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotification)
- [ProgressNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams)
- [notifications/prompts/list\_changed](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Fprompts%2Flist-changed)
- [PromptListChangedNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptlistchangednotification)
- [notifications/resources/list\_changed](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Fresources%2Flist-changed)
- [ResourceListChangedNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelistchangednotification)
- [notifications/resources/updated](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Fresources%2Fupdated)
- [ResourceUpdatedNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourceupdatednotification)
- [ResourceUpdatedNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourceupdatednotificationparams)
- [notifications/roots/list\_changed](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Froots%2Flist-changed)
- [RootsListChangedNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#rootslistchangednotification)
- [notifications/tools/list\_changed](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Ftools%2Flist-changed)
- [ToolListChangedNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#toollistchangednotification)
- [notifications/elicitation/complete](https://modelcontextprotocol.io/specification/2025-11-25/schema#notifications%2Felicitation%2Fcomplete)
- [ElicitationCompleteNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitationcompletenotification)
- [ping](https://modelcontextprotocol.io/specification/2025-11-25/schema#ping)
- [PingRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#pingrequest)
- [tasks](https://modelcontextprotocol.io/specification/2025-11-25/schema#tasks)
- [CreateTaskResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#createtaskresult)
- [RelatedTaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#relatedtaskmetadata)
- [Task](https://modelcontextprotocol.io/specification/2025-11-25/schema#task)
- [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata)
- [TaskStatus](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskstatus)
- [tasks/get](https://modelcontextprotocol.io/specification/2025-11-25/schema#tasks%2Fget)
- [GetTaskRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskrequest)
- [GetTaskResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskresult)
- [tasks/result](https://modelcontextprotocol.io/specification/2025-11-25/schema#tasks%2Fresult)
- [GetTaskPayloadRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskpayloadrequest)
- [GetTaskPayloadResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskpayloadresult)
- [tasks/list](https://modelcontextprotocol.io/specification/2025-11-25/schema#tasks%2Flist)
- [ListTasksRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtasksrequest)
- [ListTasksResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtasksresult)
- [tasks/cancel](https://modelcontextprotocol.io/specification/2025-11-25/schema#tasks%2Fcancel)
- [CancelTaskRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#canceltaskrequest)
- [CancelTaskResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#canceltaskresult)
- [prompts/get](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompts%2Fget)
- [GetPromptRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequest)
- [GetPromptRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams)
- [GetPromptResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptresult)
- [PromptMessage](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptmessage)
- [prompts/list](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompts%2Flist)
- [ListPromptsRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#listpromptsrequest)
- [ListPromptsResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#listpromptsresult)
- [Prompt](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt)
- [PromptArgument](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument)
- [resources/list](https://modelcontextprotocol.io/specification/2025-11-25/schema#resources%2Flist)
- [ListResourcesRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcesrequest)
- [ListResourcesResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcesresult)
- [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource)
- [resources/read](https://modelcontextprotocol.io/specification/2025-11-25/schema#resources%2Fread)
- [ReadResourceRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourcerequest)
- [ReadResourceRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourcerequestparams)
- [ReadResourceResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourceresult)
- [resources/subscribe](https://modelcontextprotocol.io/specification/2025-11-25/schema#resources%2Fsubscribe)
- [SubscribeRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#subscriberequest)
- [SubscribeRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#subscriberequestparams)
- [resources/templates/list](https://modelcontextprotocol.io/specification/2025-11-25/schema#resources%2Ftemplates%2Flist)
- [ListResourceTemplatesRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcetemplatesrequest)
- [ListResourceTemplatesResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcetemplatesresult)
- [ResourceTemplate](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate)
- [resources/unsubscribe](https://modelcontextprotocol.io/specification/2025-11-25/schema#resources%2Funsubscribe)
- [UnsubscribeRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#unsubscriberequest)
- [UnsubscribeRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#unsubscriberequestparams)
- [roots/list](https://modelcontextprotocol.io/specification/2025-11-25/schema#roots%2Flist)
- [ListRootsRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#listrootsrequest)
- [ListRootsResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#listrootsresult)
- [Root](https://modelcontextprotocol.io/specification/2025-11-25/schema#root)
- [sampling/createMessage](https://modelcontextprotocol.io/specification/2025-11-25/schema#sampling%2Fcreatemessage)
- [CreateMessageRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequest)
- [CreateMessageRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams)
- [CreateMessageResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessageresult)
- [ModelHint](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelhint)
- [ModelPreferences](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences)
- [SamplingMessage](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessage)
- [ToolChoice](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolchoice)
- [ToolResultContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent)
- [ToolUseContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent)
- [tools/call](https://modelcontextprotocol.io/specification/2025-11-25/schema#tools%2Fcall)
- [CallToolRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequest)
- [CallToolRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams)
- [CallToolResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult)
- [tools/list](https://modelcontextprotocol.io/specification/2025-11-25/schema#tools%2Flist)
- [ListToolsRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtoolsrequest)
- [ListToolsResult](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtoolsresult)
- [Tool](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool)
- [ToolAnnotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations)
- [ToolExecution](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolexecution)

# Schema Reference

Copy page

Copy page

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#json-rpc)  JSON-RPC

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#jsonrpcerrorresponse)  `JSONRPCErrorResponse`

interfaceJSONRPCErrorResponse{

[error](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Error](https://modelcontextprotocol.io/specification/2025-11-25/schema#error);

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?: [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

}

A response to a request that indicates an error occurred.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#jsonrpcmessage)  `JSONRPCMessage`

JSONRPCMessage: [JSONRPCRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcrequest) \| [JSONRPCNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcnotification) \| [JSONRPCResponse](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcresponse)

Refers to any valid JSON-RPC object that can be decoded off the wire, or encoded to be sent.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#jsonrpcnotification)  `JSONRPCNotification`

interfaceJSONRPCNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):string;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:{\[key:string\]:any};

}

A notification which does not expect a response.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#jsonrpcrequest)  `JSONRPCRequest`

interfaceJSONRPCRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):string;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:{\[key:string\]:any};

}

A request that expects a response.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#jsonrpcresultresponse)  `JSONRPCResultResponse`

interfaceJSONRPCResultResponse{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[result](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result);

}

A successful (non-error) response to a request.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#common-types)  Common Types

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#annotations)  `Annotations`

interfaceAnnotations{

[audience](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations-audience)?: [Role](https://modelcontextprotocol.io/specification/2025-11-25/schema#role)\[\];

[lastModified](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations-lastmodified)?:string;

[priority](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations-priority)?:number;

}

Optional annotations for the client. The client can use annotations to inform how objects are used or displayed

`Optional`audience [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations-audience)

audience?: [Role](https://modelcontextprotocol.io/specification/2025-11-25/schema#role)\[\]

Describes who the intended audience of this object or data is.

It can include multiple entries to indicate content useful for multiple audiences (e.g., `[“user”, “assistant”]`).

`Optional`lastModified [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations-lastmodified)

lastModified?:string

The moment the resource was last modified, as an ISO 8601 formatted string.

Should be an ISO 8601 formatted string (e.g., “2025-01-12T15:00:58Z”).

Examples: last activity timestamp in an open file, timestamp when the resource
was attached, etc.

`Optional`priority [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations-priority)

priority?:number

Describes how important this data is for operating the server.

A value of 1 means “most important,” and indicates that the data is
effectively required, while 0 means “least important,” and indicates that
the data is entirely optional.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#cursor)  `Cursor`

Cursor:string

An opaque token used to represent a cursor for pagination.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#emptyresult)  `EmptyResult`

EmptyResult: [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result)

A response that indicates success but carries no data.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#error)  `Error`

interfaceError{

[code](https://modelcontextprotocol.io/specification/2025-11-25/schema#error-code):number;

[data](https://modelcontextprotocol.io/specification/2025-11-25/schema#error-data)?:unknown;

[message](https://modelcontextprotocol.io/specification/2025-11-25/schema#error-message):string;

}

code [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#error-code)

code:number

The error type that occurred.

`Optional`data [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#error-data)

data?:unknown

Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).

message [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#error-message)

message:string

A short description of the error. The message SHOULD be limited to a concise single sentence.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#icon)  `Icon`

interfaceIcon{

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-mimetype)?:string;

[sizes](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-sizes)?:string\[\];

[src](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-src):string;

[theme](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-theme)?:“light”\|“dark”;

}

An optionally-sized icon that can be displayed in a user interface.

`Optional`mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-mimetype)

mimeType?:string

Optional MIME type override if the source MIME type is missing or generic.
For example: `“image/png”`, `“image/jpeg”`, or `“image/svg+xml”`.

`Optional`sizes [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-sizes)

sizes?:string\[\]

Optional array of strings that specify sizes at which the icon can be used.
Each string should be in WxH format (e.g., `“48x48”`, `“96x96”`) or `“any”` for scalable formats like SVG.

If not provided, the client should assume that the icon can be used at any size.

src [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-src)

src:string

A standard URI pointing to an icon resource. May be an HTTP/HTTPS URL or a `data:` URI with Base64-encoded image data.

Consumers SHOULD takes steps to ensure URLs serving icons are from the
same domain as the client/server or a trusted domain.

Consumers SHOULD take appropriate precautions when consuming SVGs as they can contain
executable JavaScript.

`Optional`theme [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon-theme)

theme?:“light”\|“dark”

Optional specifier for the theme this icon is designed for. `light` indicates
the icon is designed to be used with a light background, and `dark` indicates
the icon is designed to be used with a dark background.

If not provided, the client should assume the icon can be used with any theme.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#logginglevel)  `LoggingLevel`

LoggingLevel:

\|“debug”

\|“info”

\|“notice”

\|“warning”

\|“error”

\|“critical”

\|“alert”

\|“emergency”

The severity of a log message.

These map to syslog message severities, as specified in RFC-5424: [https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1](https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#progresstoken)  `ProgressToken`

ProgressToken:string\|number

A progress token, used to associate progress notifications with the original request.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#requestid)  `RequestId`

RequestId:string\|number

A uniquely identifying ID for a request in JSON-RPC.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#result)  `Result`

interfaceResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)?:{\[key:string\]:unknown};

\[key:string\]:unknown;

}

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#role)  `Role`

Role:“user”\|“assistant”

The sender or recipient of messages and data in a conversation.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#content)  Content

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#audiocontent)  `AudioContent`

interfaceAudioContent{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-annotations)?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations);

[data](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-data):string;

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-mimetype):string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“audio”;

}

Audio provided to or from an LLM.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-annotations)

annotations?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)

Optional annotations for the client.

data [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-data)

data:string

The base64-encoded audio data.

mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent-mimetype)

mimeType:string

The MIME type of the audio. Different providers may support different audio types.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#blobresourcecontents)  `BlobResourceContents`

interfaceBlobResourceContents{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-_meta)?:{\[key:string\]:unknown};

[blob](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-blob):string;

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-mimetype)?:string;

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-uri):string;

}

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from ResourceContents.\_meta

blob [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-blob)

blob:string

A base64-encoded string representing the binary data of the item.

`Optional`mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-mimetype)

mimeType?:string

The MIME type of this resource, if known.

Inherited from ResourceContents.mimeType

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents-uri)

uri:string

The URI of this resource.

Inherited from ResourceContents.uri

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#contentblock)  `ContentBlock`

ContentBlock:

\| [TextContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent)

\| [ImageContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent)

\| [AudioContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#audiocontent)

\| [ResourceLink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink)

\| [EmbeddedResource](https://modelcontextprotocol.io/specification/2025-11-25/schema#embeddedresource)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#embeddedresource)  `EmbeddedResource`

interfaceEmbeddedResource{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#embeddedresource-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#embeddedresource-annotations)?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations);

[resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [TextResourceContents](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents) \| [BlobResourceContents](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents);

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“resource”;

}

The contents of a resource, embedded into a prompt or tool call result.

It is up to the client how best to render embedded resources for the benefit
of the LLM and/or the user.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#embeddedresource-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#embeddedresource-annotations)

annotations?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)

Optional annotations for the client.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#imagecontent)  `ImageContent`

interfaceImageContent{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-annotations)?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations);

[data](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-data):string;

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-mimetype):string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“image”;

}

An image provided to or from an LLM.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-annotations)

annotations?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)

Optional annotations for the client.

data [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-data)

data:string

The base64-encoded image data.

mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#imagecontent-mimetype)

mimeType:string

The MIME type of the image. Different providers may support different image types.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resourcelink)  `ResourceLink`

interfaceResourceLink{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-annotations)?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations);

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-description)?:string;

[icons](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-icons)?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\];

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-mimetype)?:string;

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-name):string;

[size](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-size)?:number;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-title)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“resource\_link”;

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-uri):string;

}

A resource that the server is capable of reading, included in a prompt or tool call result.

Note: resource links returned by tools are not guaranteed to appear in the results of `resources/list` requests.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-_meta)

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-annotations)

annotations?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)

Optional annotations for the client.

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-annotations)

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-description)

description?:string

A description of what this resource represents.

This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [description](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-description)

`Optional`icons [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-icons)

icons?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\]

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- `image/png` \- PNG images (safe, universal compatibility)
- `image/jpeg` (and `image/jpg`) \- JPEG images (safe, universal compatibility)

Clients that support rendering icons SHOULD also support:

- `image/svg+xml` \- SVG images (scalable but requires security precautions)
- `image/webp` \- WebP images (modern, efficient format)

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [icons](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-icons)

`Optional`mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-mimetype)

mimeType?:string

The MIME type of this resource, if known.

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-mimetype)

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [name](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-name)

`Optional`size [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-size)

size?:number

The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.

This can be used by Hosts to display file sizes and estimate context window usage.

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [size](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-size)

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [title](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-title)

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcelink-uri)

uri:string

The URI of this resource.

Inherited from [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource). [uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-uri)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#textcontent)  `TextContent`

interfaceTextContent{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent-annotations)?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations);

[text](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent-text):string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“text”;

}

Text provided to or from an LLM.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent-annotations)

annotations?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)

Optional annotations for the client.

text [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#textcontent-text)

text:string

The text content of the message.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#textresourcecontents)  `TextResourceContents`

interfaceTextResourceContents{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-_meta)?:{\[key:string\]:unknown};

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-mimetype)?:string;

[text](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-text):string;

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-uri):string;

}

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from ResourceContents.\_meta

`Optional`mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-mimetype)

mimeType?:string

The MIME type of this resource, if known.

Inherited from ResourceContents.mimeType

text [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-text)

text:string

The text of the item. This must only be set if the item can actually be represented as text (not binary data).

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents-uri)

uri:string

The URI of this resource.

Inherited from ResourceContents.uri

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#completion/complete)  `completion/complete`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#completerequest)  `CompleteRequest`

interfaceCompleteRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“completion/complete”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [CompleteRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams);

}

A request from the client to the server, to ask for completion options.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#completerequestparams)  `CompleteRequestParams`

interfaceCompleteRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[argument](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams-argument):{name:string;value:string};

[context](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams-context)?:{arguments?:{\[key:string\]:string}};

[ref](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [PromptReference](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptreference) \| [ResourceTemplateReference](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplatereference);

}

Parameters for a `completion/complete` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from RequestParams.\_meta

argument [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams-argument)

argument:{name:string;value:string}

The argument’s information

Type Declaration

- name: string



The name of the argument

- value: string



The value of the argument to use for completion matching.


`Optional`context [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#completerequestparams-context)

context?:{arguments?:{\[key:string\]:string}}

Additional, optional context for completions

Type Declaration

- `Optional`arguments?: {\[key:string\]:string}



Previously-resolved variables in a URI template or prompt.


### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#completeresult)  `CompleteResult`

interfaceCompleteResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#completeresult-_meta)?:{\[key:string\]:unknown};

[completion](https://modelcontextprotocol.io/specification/2025-11-25/schema#completeresult-completion):{hasMore?:boolean;total?:number;values:string\[\]};

\[key:string\]:unknown;

}

The server’s response to a completion/complete request

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#completeresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

completion [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#completeresult-completion)

completion:{hasMore?:boolean;total?:number;values:string\[\]}

Type Declaration

- `Optional`hasMore?: boolean



Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.

- `Optional`total?: number



The total number of completion options available. This can exceed the number of values actually sent in the response.

- values: string\[\]



An array of completion values. Must not exceed 100 items.


### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#promptreference)  `PromptReference`

interfacePromptReference{

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptreference-name):string;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptreference-title)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“ref/prompt”;

}

Identifies a prompt.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptreference-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptreference-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from BaseMetadata.title

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resourcetemplatereference)  `ResourceTemplateReference`

interfaceResourceTemplateReference{

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“ref/resource”;

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplatereference-uri):string;

}

A reference to a resource or resource template definition.

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplatereference-uri)

uri:string

The URI or URI template of the resource.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#elicitation/create)  `elicitation/create`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#elicitrequest)  `ElicitRequest`

interfaceElicitRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“elicitation/create”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ElicitRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestparams);

}

A request from the server to elicit additional information from the user via the client.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#elicitrequestparams)  `ElicitRequestParams`

ElicitRequestParams: [ElicitRequestFormParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams) \| [ElicitRequestURLParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams)

The parameters for a request to elicit additional information from the user via the client.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#elicitresult)  `ElicitResult`

interfaceElicitResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitresult-_meta)?:{\[key:string\]:unknown};

[action](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitresult-action):“accept”\|“decline”\|“cancel”;

[content](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitresult-content)?:{\[key:string\]:string\|number\|boolean\|string\[\]};

\[key:string\]:unknown;

}

The client’s response to an elicitation request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

action [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitresult-action)

action:“accept”\|“decline”\|“cancel”

The user action in response to the elicitation.

- “accept”: User submitted the form/confirmed the action
- “decline”: User explicitly decline the action
- “cancel”: User dismissed without making an explicit choice

`Optional`content [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitresult-content)

content?:{\[key:string\]:string\|number\|boolean\|string\[\]}

The submitted form data, only present when action is “accept” and mode was “form”.
Contains values matching the requested schema.
Omitted for out-of-band mode responses.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#booleanschema)  `BooleanSchema`

interfaceBooleanSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:boolean;

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“boolean”;

}

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#elicitrequestformparams)  `ElicitRequestFormParams`

interfaceElicitRequestFormParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[message](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-message):string;

[mode](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-mode)?:“form”;

[requestedSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-requestedschema):{

$schema?:string;

properties:{\[key:string\]: [PrimitiveSchemaDefinition](https://modelcontextprotocol.io/specification/2025-11-25/schema#primitiveschemadefinition)};

required?:string\[\];

type:“object”;

};

[task](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-task)?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata);

}

The parameters for a request to elicit non-sensitive information from the user via a form in the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from TaskAugmentedRequestParams.\_meta

message [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-message)

message:string

The message to present to the user describing what information is being requested.

`Optional`mode [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-mode)

mode?:“form”

The elicitation mode.

requestedSchema [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-requestedschema)

requestedSchema:{

$schema?:string;

properties:{\[key:string\]: [PrimitiveSchemaDefinition](https://modelcontextprotocol.io/specification/2025-11-25/schema#primitiveschemadefinition)};

required?:string\[\];

type:“object”;

}

A restricted subset of JSON Schema.
Only top-level properties are allowed, without nesting.

`Optional`task [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequestformparams-task)

task?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata)

If specified, the caller is requesting task-augmented execution for this request.
The request will return a CreateTaskResult immediately, and the actual result can be
retrieved later via tasks/result.

Task augmentation is subject to capability negotiation - receivers MUST declare support
for task augmentation of specific request types in their capabilities.

Inherited from TaskAugmentedRequestParams.task

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#elicitrequesturlparams)  `ElicitRequestURLParams`

interfaceElicitRequestURLParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[elicitationId](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-elicitationid):string;

[message](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-message):string;

[mode](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-mode):“url”;

[task](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-task)?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata);

[url](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-url):string;

}

The parameters for a request to elicit information from the user via a URL in the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from TaskAugmentedRequestParams.\_meta

elicitationId [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-elicitationid)

elicitationId:string

The ID of the elicitation, which must be unique within the context of the server.
The client MUST treat this ID as an opaque value.

message [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-message)

message:string

The message to present to the user explaining why the interaction is needed.

mode [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-mode)

mode:“url”

The elicitation mode.

`Optional`task [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-task)

task?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata)

If specified, the caller is requesting task-augmented execution for this request.
The request will return a CreateTaskResult immediately, and the actual result can be
retrieved later via tasks/result.

Task augmentation is subject to capability negotiation - receivers MUST declare support
for task augmentation of specific request types in their capabilities.

Inherited from TaskAugmentedRequestParams.task

url [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitrequesturlparams-url)

url:string

The URL that the user should navigate to.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#enumschema)  `EnumSchema`

EnumSchema:

\| [SingleSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#singleselectenumschema)

\| [MultiSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#multiselectenumschema)

\| [LegacyTitledEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#legacytitledenumschema)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#legacytitledenumschema)  `LegacyTitledEnumSchema`

interfaceLegacyTitledEnumSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[enum](https://modelcontextprotocol.io/specification/2025-11-25/schema#):string\[\];

[enumNames](https://modelcontextprotocol.io/specification/2025-11-25/schema#legacytitledenumschema-enumnames)?:string\[\];

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“string”;

}

Use TitledSingleSelectEnumSchema instead.
This interface will be removed in a future version.

`Optional`enumNames [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#legacytitledenumschema-enumnames)

enumNames?:string\[\]

(Legacy) Display names for enum values.
Non-standard according to JSON schema 2020-12.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#multiselectenumschema)  `MultiSelectEnumSchema`

MultiSelectEnumSchema:

\| [UntitledMultiSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema)

\| [TitledMultiSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#numberschema)  `NumberSchema`

interfaceNumberSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:number;

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[maximum](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:number;

[minimum](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:number;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“number”\|“integer”;

}

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#primitiveschemadefinition)  `PrimitiveSchemaDefinition`

PrimitiveSchemaDefinition:

\| [StringSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#stringschema)

\| [NumberSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#numberschema)

\| [BooleanSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#booleanschema)

\| [EnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#enumschema)

Restricted schema definitions that only allow primitive types
without nested objects or arrays.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#singleselectenumschema)  `SingleSelectEnumSchema`

SingleSelectEnumSchema:

\| [UntitledSingleSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema)

\| [TitledSingleSelectEnumSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#stringschema)  `StringSchema`

interfaceStringSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[format](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:“uri”\|“email”\|“date”\|“date-time”;

[maxLength](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:number;

[minLength](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:number;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“string”;

}

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#titledmultiselectenumschema)  `TitledMultiSelectEnumSchema`

interfaceTitledMultiSelectEnumSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-default)?:string\[\];

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-description)?:string;

[items](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-items):{anyOf:{const:string;title:string}\[\]};

[maxItems](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-maxitems)?:number;

[minItems](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-minitems)?:number;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-title)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“array”;

}

Schema for multiple-selection enumeration with display titles for each option.

`Optional`default [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-default)

default?:string\[\]

Optional default value.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-description)

description?:string

Optional description for the enum field.

items [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-items)

items:{anyOf:{const:string;title:string}\[\]}

Schema for array items with enum options and display labels.

Type Declaration

- anyOf: {const:string;title:string}\[\]



Array of enum options with values and display labels.


`Optional`maxItems [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-maxitems)

maxItems?:number

Maximum number of items to select.

`Optional`minItems [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-minitems)

minItems?:number

Minimum number of items to select.

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledmultiselectenumschema-title)

title?:string

Optional title for the enum field.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#titledsingleselectenumschema)  `TitledSingleSelectEnumSchema`

interfaceTitledSingleSelectEnumSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-default)?:string;

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-description)?:string;

[oneOf](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-oneof):{const:string;title:string}\[\];

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-title)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“string”;

}

Schema for single-selection enumeration with display titles for each option.

`Optional`default [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-default)

default?:string

Optional default value.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-description)

description?:string

Optional description for the enum field.

oneOf [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-oneof)

oneOf:{const:string;title:string}\[\]

Array of enum options with values and display labels.

Type Declaration

- const: string



The enum value.

- title: string



Display label for this option.


`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#titledsingleselectenumschema-title)

title?:string

Optional title for the enum field.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#untitledmultiselectenumschema)  `UntitledMultiSelectEnumSchema`

interfaceUntitledMultiSelectEnumSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-default)?:string\[\];

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-description)?:string;

[items](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-items):{enum:string\[\];type:“string”};

[maxItems](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-maxitems)?:number;

[minItems](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-minitems)?:number;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-title)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“array”;

}

Schema for multiple-selection enumeration without display titles for options.

`Optional`default [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-default)

default?:string\[\]

Optional default value.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-description)

description?:string

Optional description for the enum field.

items [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-items)

items:{enum:string\[\];type:“string”}

Schema for the array items.

Type Declaration

- enum: string\[\]



Array of enum values to choose from.

- type: “string”


`Optional`maxItems [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-maxitems)

maxItems?:number

Maximum number of items to select.

`Optional`minItems [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-minitems)

minItems?:number

Minimum number of items to select.

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledmultiselectenumschema-title)

title?:string

Optional title for the enum field.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#untitledsingleselectenumschema)  `UntitledSingleSelectEnumSchema`

interfaceUntitledSingleSelectEnumSchema{

[default](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-default)?:string;

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-description)?:string;

[enum](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-enum):string\[\];

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-title)?:string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“string”;

}

Schema for single-selection enumeration without display titles for options.

`Optional`default [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-default)

default?:string

Optional default value.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-description)

description?:string

Optional description for the enum field.

enum [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-enum)

enum:string\[\]

Array of enum values to choose from.

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#untitledsingleselectenumschema-title)

title?:string

Optional title for the enum field.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#initialize)  `initialize`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#initializerequest)  `InitializeRequest`

interfaceInitializeRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“initialize”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [InitializeRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializerequestparams);

}

This request is sent from the client to the server when it first connects, asking it to begin initialization.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#initializerequestparams)  `InitializeRequestParams`

interfaceInitializeRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializerequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[capabilities](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ClientCapabilities](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities);

[clientInfo](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Implementation](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation);

[protocolVersion](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializerequestparams-protocolversion):string;

}

Parameters for an `initialize` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializerequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from RequestParams.\_meta

protocolVersion [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializerequestparams-protocolversion)

protocolVersion:string

The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#initializeresult)  `InitializeResult`

interfaceInitializeResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializeresult-_meta)?:{\[key:string\]:unknown};

[capabilities](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ServerCapabilities](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities);

[instructions](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializeresult-instructions)?:string;

[protocolVersion](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializeresult-protocolversion):string;

[serverInfo](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Implementation](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation);

\[key:string\]:unknown;

}

After receiving an initialize request from the client, the server sends this response.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializeresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

`Optional`instructions [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializeresult-instructions)

instructions?:string

Instructions describing how to use the server and its features.

This can be used by clients to improve the LLM’s understanding of available tools, resources, etc. It can be thought of like a “hint” to the model. For example, this information MAY be added to the system prompt.

protocolVersion [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#initializeresult-protocolversion)

protocolVersion:string

The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#clientcapabilities)  `ClientCapabilities`

interfaceClientCapabilities{

[elicitation](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-elicitation)?:{form?:object;url?:object};

[experimental](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-experimental)?:{\[key:string\]:object};

[roots](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-roots)?:{listChanged?:boolean};

[sampling](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-sampling)?:{context?:object;tools?:object};

[tasks](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-tasks)?:{

cancel?:object;

list?:object;

requests?:{

elicitation?:{create?:object};

sampling?:{createMessage?:object};

};

};

}

Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.

`Optional`elicitation [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-elicitation)

elicitation?:{form?:object;url?:object}

Present if the client supports elicitation from the server.

`Optional`experimental [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-experimental)

experimental?:{\[key:string\]:object}

Experimental, non-standard capabilities that the client supports.

`Optional`roots [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-roots)

roots?:{listChanged?:boolean}

Present if the client supports listing roots.

Type Declaration

- `Optional`listChanged?: boolean



Whether the client supports notifications for changes to the roots list.


`Optional`sampling [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-sampling)

sampling?:{context?:object;tools?:object}

Present if the client supports sampling from an LLM.

Type Declaration

- `Optional`context?: object



Whether the client supports context inclusion via includeContext parameter.
If not declared, servers SHOULD only use `includeContext: “none”` (or omit it).

- `Optional`tools?: object



Whether the client supports tool use via tools and toolChoice parameters.


`Optional`tasks [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#clientcapabilities-tasks)

tasks?:{

cancel?:object;

list?:object;

requests?:{

elicitation?:{create?:object};

sampling?:{createMessage?:object};

};

}

Present if the client supports task-augmented requests.

Type Declaration

- `Optional`cancel?: object



Whether this client supports tasks/cancel.

- `Optional`list?: object



Whether this client supports tasks/list.

- `Optional`requests?: {elicitation?:{create?:object};sampling?:{createMessage?:object}}



Specifies which request types can be augmented with tasks.



  - `Optional`elicitation?: {create?:object}



    Task support for elicitation-related requests.



    - `Optional`create?: object



      Whether the client supports task-augmented elicitation/create requests.
  - `Optional`sampling?: {createMessage?:object}



    Task support for sampling-related requests.



    - `Optional`createMessage?: object



      Whether the client supports task-augmented sampling/createMessage requests.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#implementation)  `Implementation`

interfaceImplementation{

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-description)?:string;

[icons](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-icons)?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\];

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-name):string;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-title)?:string;

[version](https://modelcontextprotocol.io/specification/2025-11-25/schema#):string;

[websiteUrl](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-websiteurl)?:string;

}

Describes the MCP implementation.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-description)

description?:string

An optional human-readable description of what this implementation does.

This can be used by clients or servers to provide context about their purpose
and capabilities. For example, a server might describe the types of resources
or tools it provides, while a client might describe its intended use case.

`Optional`icons [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-icons)

icons?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\]

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- `image/png` \- PNG images (safe, universal compatibility)
- `image/jpeg` (and `image/jpg`) \- JPEG images (safe, universal compatibility)

Clients that support rendering icons SHOULD also support:

- `image/svg+xml` \- SVG images (scalable but requires security precautions)
- `image/webp` \- WebP images (modern, efficient format)

Inherited from Icons.icons

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from BaseMetadata.title

`Optional`websiteUrl [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#implementation-websiteurl)

websiteUrl?:string

An optional URL of the website for this implementation.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#servercapabilities)  `ServerCapabilities`

interfaceServerCapabilities{

[completions](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-completions)?:object;

[experimental](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-experimental)?:{\[key:string\]:object};

[logging](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-logging)?:object;

[prompts](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-prompts)?:{listChanged?:boolean};

[resources](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-resources)?:{listChanged?:boolean;subscribe?:boolean};

[tasks](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-tasks)?:{

cancel?:object;

list?:object;

requests?:{tools?:{call?:object}};

};

[tools](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-tools)?:{listChanged?:boolean};

}

Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.

`Optional`completions [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-completions)

completions?:object

Present if the server supports argument autocompletion suggestions.

`Optional`experimental [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-experimental)

experimental?:{\[key:string\]:object}

Experimental, non-standard capabilities that the server supports.

`Optional`logging [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-logging)

logging?:object

Present if the server supports sending log messages to the client.

`Optional`prompts [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-prompts)

prompts?:{listChanged?:boolean}

Present if the server offers any prompt templates.

Type Declaration

- `Optional`listChanged?: boolean



Whether this server supports notifications for changes to the prompt list.


`Optional`resources [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-resources)

resources?:{listChanged?:boolean;subscribe?:boolean}

Present if the server offers any resources to read.

Type Declaration

- `Optional`listChanged?: boolean



Whether this server supports notifications for changes to the resource list.

- `Optional`subscribe?: boolean



Whether this server supports subscribing to resource updates.


`Optional`tasks [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-tasks)

tasks?:{

cancel?:object;

list?:object;

requests?:{tools?:{call?:object}};

}

Present if the server supports task-augmented requests.

Type Declaration

- `Optional`cancel?: object



Whether this server supports tasks/cancel.

- `Optional`list?: object



Whether this server supports tasks/list.

- `Optional`requests?: {tools?:{call?:object}}



Specifies which request types can be augmented with tasks.



  - `Optional`tools?: {call?:object}



    Task support for tool-related requests.



    - `Optional`call?: object



      Whether the server supports task-augmented tools/call requests.

`Optional`tools [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#servercapabilities-tools)

tools?:{listChanged?:boolean}

Present if the server offers any tools to call.

Type Declaration

- `Optional`listChanged?: boolean



Whether this server supports notifications for changes to the tool list.


## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#logging/setlevel)  `logging/setLevel`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#setlevelrequest)  `SetLevelRequest`

interfaceSetLevelRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“logging/setLevel”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [SetLevelRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#setlevelrequestparams);

}

A request from the client to the server, to enable or adjust logging.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#setlevelrequestparams)  `SetLevelRequestParams`

interfaceSetLevelRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#setlevelrequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[level](https://modelcontextprotocol.io/specification/2025-11-25/schema#setlevelrequestparams-level): [LoggingLevel](https://modelcontextprotocol.io/specification/2025-11-25/schema#logginglevel);

}

Parameters for a `logging/setLevel` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#setlevelrequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from RequestParams.\_meta

level [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#setlevelrequestparams-level)

level: [LoggingLevel](https://modelcontextprotocol.io/specification/2025-11-25/schema#logginglevel)

The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/message.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/cancelled)  `notifications/cancelled`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#cancellednotification)  `CancelledNotification`

interfaceCancelledNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/cancelled”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [CancelledNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams);

}

This notification can be sent by either side to indicate that it is cancelling a previously-issued request.

The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.

This notification indicates that the result will be unused, so any associated processing SHOULD cease.

A client MUST NOT attempt to cancel its `initialize` request.

For task cancellation, use the `tasks/cancel` request instead of this notification.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#cancellednotificationparams)  `CancelledNotificationParams`

interfaceCancelledNotificationParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams-_meta)?:{\[key:string\]:unknown};

[reason](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams-reason)?:string;

[requestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams-requestid)?: [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

}

Parameters for a `notifications/cancelled` notification.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from NotificationParams.\_meta

`Optional`reason [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams-reason)

reason?:string

An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.

`Optional`requestId [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#cancellednotificationparams-requestid)

requestId?: [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid)

The ID of the request to cancel.

This MUST correspond to the ID of a request previously issued in the same direction.
This MUST be provided for cancelling non-task requests.
This MUST NOT be used for cancelling tasks (use the `tasks/cancel` request instead).

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/initialized)  `notifications/initialized`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#initializednotification)  `InitializedNotification`

interfaceInitializedNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/initialized”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:NotificationParams;

}

This notification is sent from the client to the server after initialization has finished.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/tasks/status)  `notifications/tasks/status`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#taskstatusnotification)  `TaskStatusNotification`

interfaceTaskStatusNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/tasks/status”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [TaskStatusNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskstatusnotificationparams);

}

An optional notification from the receiver to the requestor, informing them that a task’s status has changed. Receivers are not required to send these notifications.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#taskstatusnotificationparams)  `TaskStatusNotificationParams`

TaskStatusNotificationParams:NotificationParams& [Task](https://modelcontextprotocol.io/specification/2025-11-25/schema#task)

Parameters for a `notifications/tasks/status` notification.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/message)  `notifications/message`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#loggingmessagenotification)  `LoggingMessageNotification`

interfaceLoggingMessageNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/message”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [LoggingMessageNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams);

}

JSONRPCNotification of a log message passed from server to client. If no logging/setLevel request has been sent from the client, the server MAY decide which messages to send automatically.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#loggingmessagenotificationparams)  `LoggingMessageNotificationParams`

interfaceLoggingMessageNotificationParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-_meta)?:{\[key:string\]:unknown};

[data](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-data):unknown;

[level](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-level): [LoggingLevel](https://modelcontextprotocol.io/specification/2025-11-25/schema#logginglevel);

[logger](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-logger)?:string;

}

Parameters for a `notifications/message` notification.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from NotificationParams.\_meta

data [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-data)

data:unknown

The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.

level [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-level)

level: [LoggingLevel](https://modelcontextprotocol.io/specification/2025-11-25/schema#logginglevel)

The severity of this log message.

`Optional`logger [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#loggingmessagenotificationparams-logger)

logger?:string

An optional name of the logger issuing this message.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/progress)  `notifications/progress`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#progressnotification)  `ProgressNotification`

interfaceProgressNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/progress”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ProgressNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams);

}

An out-of-band notification used to inform the receiver of a progress update for a long-running request.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#progressnotificationparams)  `ProgressNotificationParams`

interfaceProgressNotificationParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-_meta)?:{\[key:string\]:unknown};

[message](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-message)?:string;

[progress](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-progress):number;

[progressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-progresstoken): [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);

[total](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-total)?:number;

}

Parameters for a `notifications/progress` notification.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from NotificationParams.\_meta

`Optional`message [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-message)

message?:string

An optional message describing the current progress.

progress [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-progress)

progress:number

The progress thus far. This should increase every time progress is made, even if the total is unknown.

progressToken [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-progresstoken)

progressToken: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)

The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.

`Optional`total [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#progressnotificationparams-total)

total?:number

Total number of items to process (or total progress required), if known.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/prompts/list-changed)  `notifications/prompts/list_changed`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#promptlistchangednotification)  `PromptListChangedNotification`

interfacePromptListChangedNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/prompts/list\_changed”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:NotificationParams;

}

An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/resources/list-changed)  `notifications/resources/list_changed`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resourcelistchangednotification)  `ResourceListChangedNotification`

interfaceResourceListChangedNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/resources/list\_changed”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:NotificationParams;

}

An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/resources/updated)  `notifications/resources/updated`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resourceupdatednotification)  `ResourceUpdatedNotification`

interfaceResourceUpdatedNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/resources/updated”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ResourceUpdatedNotificationParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourceupdatednotificationparams);

}

A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a resources/subscribe request.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resourceupdatednotificationparams)  `ResourceUpdatedNotificationParams`

interfaceResourceUpdatedNotificationParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourceupdatednotificationparams-_meta)?:{\[key:string\]:unknown};

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourceupdatednotificationparams-uri):string;

}

Parameters for a `notifications/resources/updated` notification.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourceupdatednotificationparams-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from NotificationParams.\_meta

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourceupdatednotificationparams-uri)

uri:string

The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/roots/list-changed)  `notifications/roots/list_changed`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#rootslistchangednotification)  `RootsListChangedNotification`

interfaceRootsListChangedNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/roots/list\_changed”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:NotificationParams;

}

A notification from the client to the server, informing it that the list of roots has changed.
This notification should be sent whenever the client adds, removes, or modifies any root.
The server should then request an updated list of roots using the ListRootsRequest.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/tools/list-changed)  `notifications/tools/list_changed`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#toollistchangednotification)  `ToolListChangedNotification`

interfaceToolListChangedNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/tools/list\_changed”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:NotificationParams;

}

An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#notifications/elicitation/complete)  `notifications/elicitation/complete`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#elicitationcompletenotification)  `ElicitationCompleteNotification`

interfaceElicitationCompleteNotification{

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“notifications/elicitation/complete”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitationcompletenotification-params):{elicitationId:string};

}

An optional notification from the server to the client, informing it of a completion of a out-of-band elicitation request.

params [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#elicitationcompletenotification-params)

params:{elicitationId:string}

Type Declaration

- elicitationId: string



The ID of the elicitation that completed.


Overrides [JSONRPCNotification](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcnotification). [params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#ping)  `ping`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#pingrequest)  `PingRequest`

interfacePingRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“ping”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:RequestParams;

}

A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tasks)  `tasks`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#createtaskresult)  `CreateTaskResult`

interfaceCreateTaskResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#createtaskresult-_meta)?:{\[key:string\]:unknown};

[task](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Task](https://modelcontextprotocol.io/specification/2025-11-25/schema#task);

\[key:string\]:unknown;

}

A response to a task-augmented request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createtaskresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#relatedtaskmetadata)  `RelatedTaskMetadata`

interfaceRelatedTaskMetadata{

[taskId](https://modelcontextprotocol.io/specification/2025-11-25/schema#relatedtaskmetadata-taskid):string;

}

Metadata for associating messages with a task.
Include this in the `_meta` field under the key `io.modelcontextprotocol/related-task`.

taskId [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#relatedtaskmetadata-taskid)

taskId:string

The task identifier this message is associated with.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#task)  `Task`

interfaceTask{

[createdAt](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-createdat):string;

[lastUpdatedAt](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-lastupdatedat):string;

[pollInterval](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-pollinterval)?:number;

[status](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-status): [TaskStatus](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskstatus);

[statusMessage](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-statusmessage)?:string;

[taskId](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-taskid):string;

[ttl](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-ttl):number\|null;

}

Data associated with a task.

createdAt [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-createdat)

createdAt:string

ISO 8601 timestamp when the task was created.

lastUpdatedAt [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-lastupdatedat)

lastUpdatedAt:string

ISO 8601 timestamp when the task was last updated.

`Optional`pollInterval [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-pollinterval)

pollInterval?:number

Suggested polling interval in milliseconds.

status [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-status)

status: [TaskStatus](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskstatus)

Current task state.

`Optional`statusMessage [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-statusmessage)

statusMessage?:string

Optional human-readable message describing the current task state.
This can provide context for any status, including:

- Reasons for “cancelled” status
- Summaries for “completed” status
- Diagnostic information for “failed” status (e.g., error details, what went wrong)

taskId [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-taskid)

taskId:string

The task identifier.

ttl [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#task-ttl)

ttl:number\|null

Actual retention duration from creation in milliseconds, null for unlimited.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#taskmetadata)  `TaskMetadata`

interfaceTaskMetadata{

[ttl](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata-ttl)?:number;

}

Metadata for augmenting a request with task execution.
Include this in the `task` field of the request parameters.

`Optional`ttl [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata-ttl)

ttl?:number

Requested duration in milliseconds to retain task from creation.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#taskstatus)  `TaskStatus`

TaskStatus:“working”\|“input\_required”\|“completed”\|“failed”\|“cancelled”

The status of a task.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tasks/get)  `tasks/get`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#gettaskrequest)  `GetTaskRequest`

interfaceGetTaskRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tasks/get”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskrequest-params):{taskId:string};

}

A request to retrieve the state of a task.

params [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskrequest-params)

params:{taskId:string}

Type Declaration

- taskId: string



The task identifier to query.


Overrides [JSONRPCRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcrequest). [params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#gettaskresult)  `GetTaskResult`

GetTaskResult: [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result)& [Task](https://modelcontextprotocol.io/specification/2025-11-25/schema#task)

The response to a tasks/get request.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tasks/result)  `tasks/result`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#gettaskpayloadrequest)  `GetTaskPayloadRequest`

interfaceGetTaskPayloadRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tasks/result”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskpayloadrequest-params):{taskId:string};

}

A request to retrieve the result of a completed task.

params [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskpayloadrequest-params)

params:{taskId:string}

Type Declaration

- taskId: string



The task identifier to retrieve results for.


Overrides [JSONRPCRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcrequest). [params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#gettaskpayloadresult)  `GetTaskPayloadResult`

interfaceGetTaskPayloadResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskpayloadresult-_meta)?:{\[key:string\]:unknown};

\[key:string\]:unknown;

}

The response to a tasks/result request.
The structure matches the result type of the original request.
For example, a tools/call task would return the CallToolResult structure.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#gettaskpayloadresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tasks/list)  `tasks/list`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listtasksrequest)  `ListTasksRequest`

interfaceListTasksRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tasks/list”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:PaginatedRequestParams;

}

A request to retrieve a list of tasks.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listtasksresult)  `ListTasksResult`

interfaceListTasksResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtasksresult-_meta)?:{\[key:string\]:unknown};

[nextCursor](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtasksresult-nextcursor)?:string;

[tasks](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Task](https://modelcontextprotocol.io/specification/2025-11-25/schema#task)\[\];

\[key:string\]:unknown;

}

The response to a tasks/list request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtasksresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from PaginatedResult.\_meta

`Optional`nextCursor [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtasksresult-nextcursor)

nextCursor?:string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tasks/cancel)  `tasks/cancel`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#canceltaskrequest)  `CancelTaskRequest`

interfaceCancelTaskRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tasks/cancel”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#canceltaskrequest-params):{taskId:string};

}

A request to cancel a task.

params [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#canceltaskrequest-params)

params:{taskId:string}

Type Declaration

- taskId: string



The task identifier to cancel.


Overrides [JSONRPCRequest](https://modelcontextprotocol.io/specification/2025-11-25/schema#jsonrpcrequest). [params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#canceltaskresult)  `CancelTaskResult`

CancelTaskResult: [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result)& [Task](https://modelcontextprotocol.io/specification/2025-11-25/schema#task)

The response to a tasks/cancel request.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#prompts/get)  `prompts/get`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#getpromptrequest)  `GetPromptRequest`

interfaceGetPromptRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“prompts/get”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [GetPromptRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams);

}

Used by the client to get a prompt provided by the server.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#getpromptrequestparams)  `GetPromptRequestParams`

interfaceGetPromptRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[arguments](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams-arguments)?:{\[key:string\]:string};

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams-name):string;

}

Parameters for a `prompts/get` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from RequestParams.\_meta

`Optional`arguments [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams-arguments)

arguments?:{\[key:string\]:string}

Arguments to use for templating the prompt.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptrequestparams-name)

name:string

The name of the prompt or prompt template.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#getpromptresult)  `GetPromptResult`

interfaceGetPromptResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptresult-_meta)?:{\[key:string\]:unknown};

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptresult-description)?:string;

[messages](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [PromptMessage](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptmessage)\[\];

\[key:string\]:unknown;

}

The server’s response to a prompts/get request from the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#getpromptresult-description)

description?:string

An optional description for the prompt.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#promptmessage)  `PromptMessage`

interfacePromptMessage{

[content](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#contentblock);

[role](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Role](https://modelcontextprotocol.io/specification/2025-11-25/schema#role);

}

Describes a message returned as part of a prompt.

This is similar to `SamplingMessage`, but also supports the embedding of
resources from the MCP server.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#prompts/list)  `prompts/list`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listpromptsrequest)  `ListPromptsRequest`

interfaceListPromptsRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“prompts/list”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:PaginatedRequestParams;

}

Sent from the client to request a list of prompts and prompt templates the server has.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listpromptsresult)  `ListPromptsResult`

interfaceListPromptsResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#listpromptsresult-_meta)?:{\[key:string\]:unknown};

[nextCursor](https://modelcontextprotocol.io/specification/2025-11-25/schema#listpromptsresult-nextcursor)?:string;

[prompts](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Prompt](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt)\[\];

\[key:string\]:unknown;

}

The server’s response to a prompts/list request from the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listpromptsresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from PaginatedResult.\_meta

`Optional`nextCursor [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listpromptsresult-nextcursor)

nextCursor?:string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#prompt)  `Prompt`

interfacePrompt{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-_meta)?:{\[key:string\]:unknown};

[arguments](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-arguments)?: [PromptArgument](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument)\[\];

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-description)?:string;

[icons](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-icons)?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\];

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-name):string;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-title)?:string;

}

A prompt or prompt template that the server offers.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`arguments [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-arguments)

arguments?: [PromptArgument](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument)\[\]

A list of arguments to use for templating the prompt.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-description)

description?:string

An optional description of what this prompt provides

`Optional`icons [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-icons)

icons?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\]

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- `image/png` \- PNG images (safe, universal compatibility)
- `image/jpeg` (and `image/jpg`) \- JPEG images (safe, universal compatibility)

Clients that support rendering icons SHOULD also support:

- `image/svg+xml` \- SVG images (scalable but requires security precautions)
- `image/webp` \- WebP images (modern, efficient format)

Inherited from Icons.icons

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#prompt-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from BaseMetadata.title

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#promptargument)  `PromptArgument`

interfacePromptArgument{

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-description)?:string;

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-name):string;

[required](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-required)?:boolean;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-title)?:string;

}

Describes an argument that a prompt can accept.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-description)

description?:string

A human-readable description of the argument.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

`Optional`required [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-required)

required?:boolean

Whether this argument must be provided.

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#promptargument-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from BaseMetadata.title

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resources/list)  `resources/list`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listresourcesrequest)  `ListResourcesRequest`

interfaceListResourcesRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“resources/list”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:PaginatedRequestParams;

}

Sent from the client to request a list of resources the server has.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listresourcesresult)  `ListResourcesResult`

interfaceListResourcesResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcesresult-_meta)?:{\[key:string\]:unknown};

[nextCursor](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcesresult-nextcursor)?:string;

[resources](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Resource](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource)\[\];

\[key:string\]:unknown;

}

The server’s response to a resources/list request from the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcesresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from PaginatedResult.\_meta

`Optional`nextCursor [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcesresult-nextcursor)

nextCursor?:string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resource)  `Resource`

interfaceResource{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-annotations)?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations);

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-description)?:string;

[icons](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-icons)?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\];

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-mimetype)?:string;

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-name):string;

[size](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-size)?:number;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-title)?:string;

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-uri):string;

}

A known resource that the server is capable of reading.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-annotations)

annotations?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)

Optional annotations for the client.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-description)

description?:string

A description of what this resource represents.

This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.

`Optional`icons [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-icons)

icons?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\]

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- `image/png` \- PNG images (safe, universal compatibility)
- `image/jpeg` (and `image/jpg`) \- JPEG images (safe, universal compatibility)

Clients that support rendering icons SHOULD also support:

- `image/svg+xml` \- SVG images (scalable but requires security precautions)
- `image/webp` \- WebP images (modern, efficient format)

Inherited from Icons.icons

`Optional`mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-mimetype)

mimeType?:string

The MIME type of this resource, if known.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

`Optional`size [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-size)

size?:number

The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.

This can be used by Hosts to display file sizes and estimate context window usage.

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from BaseMetadata.title

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resource-uri)

uri:string

The URI of this resource.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resources/read)  `resources/read`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#readresourcerequest)  `ReadResourceRequest`

interfaceReadResourceRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“resources/read”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ReadResourceRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourcerequestparams);

}

Sent from the client to the server, to read a specific resource URI.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#readresourcerequestparams)  `ReadResourceRequestParams`

interfaceReadResourceRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourcerequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourcerequestparams-uri):string;

}

Parameters for a `resources/read` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourcerequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from ResourceRequestParams.\_meta

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourcerequestparams-uri)

uri:string

The URI of the resource. The URI can use any protocol; it is up to the server how to interpret it.

Inherited from ResourceRequestParams.uri

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#readresourceresult)  `ReadResourceResult`

interfaceReadResourceResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourceresult-_meta)?:{\[key:string\]:unknown};

[contents](https://modelcontextprotocol.io/specification/2025-11-25/schema#): ( [TextResourceContents](https://modelcontextprotocol.io/specification/2025-11-25/schema#textresourcecontents) \| [BlobResourceContents](https://modelcontextprotocol.io/specification/2025-11-25/schema#blobresourcecontents))\[\];

\[key:string\]:unknown;

}

The server’s response to a resources/read request from the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#readresourceresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resources/subscribe)  `resources/subscribe`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#subscriberequest)  `SubscribeRequest`

interfaceSubscribeRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“resources/subscribe”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [SubscribeRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#subscriberequestparams);

}

Sent from the client to request resources/updated notifications from the server whenever a particular resource changes.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#subscriberequestparams)  `SubscribeRequestParams`

interfaceSubscribeRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#subscriberequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#subscriberequestparams-uri):string;

}

Parameters for a `resources/subscribe` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#subscriberequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from ResourceRequestParams.\_meta

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#subscriberequestparams-uri)

uri:string

The URI of the resource. The URI can use any protocol; it is up to the server how to interpret it.

Inherited from ResourceRequestParams.uri

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resources/templates/list)  `resources/templates/list`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listresourcetemplatesrequest)  `ListResourceTemplatesRequest`

interfaceListResourceTemplatesRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“resources/templates/list”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:PaginatedRequestParams;

}

Sent from the client to request a list of resource templates the server has.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listresourcetemplatesresult)  `ListResourceTemplatesResult`

interfaceListResourceTemplatesResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcetemplatesresult-_meta)?:{\[key:string\]:unknown};

[nextCursor](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcetemplatesresult-nextcursor)?:string;

[resourceTemplates](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [ResourceTemplate](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate)\[\];

\[key:string\]:unknown;

}

The server’s response to a resources/templates/list request from the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcetemplatesresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from PaginatedResult.\_meta

`Optional`nextCursor [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listresourcetemplatesresult-nextcursor)

nextCursor?:string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resourcetemplate)  `ResourceTemplate`

interfaceResourceTemplate{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-annotations)?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations);

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-description)?:string;

[icons](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-icons)?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\];

[mimeType](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-mimetype)?:string;

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-name):string;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-title)?:string;

[uriTemplate](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-uritemplate):string;

}

A template description for resources available on the server.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-annotations)

annotations?: [Annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#annotations)

Optional annotations for the client.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-description)

description?:string

A description of what this template is for.

This can be used by clients to improve the LLM’s understanding of available resources. It can be thought of like a “hint” to the model.

`Optional`icons [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-icons)

icons?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\]

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- `image/png` \- PNG images (safe, universal compatibility)
- `image/jpeg` (and `image/jpg`) \- JPEG images (safe, universal compatibility)

Clients that support rendering icons SHOULD also support:

- `image/svg+xml` \- SVG images (scalable but requires security precautions)
- `image/webp` \- WebP images (modern, efficient format)

Inherited from Icons.icons

`Optional`mimeType [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-mimetype)

mimeType?:string

The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from BaseMetadata.title

uriTemplate [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#resourcetemplate-uritemplate)

uriTemplate:string

A URI template (according to RFC 6570) that can be used to construct resource URIs.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#resources/unsubscribe)  `resources/unsubscribe`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#unsubscriberequest)  `UnsubscribeRequest`

interfaceUnsubscribeRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“resources/unsubscribe”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [UnsubscribeRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#unsubscriberequestparams);

}

Sent from the client to request cancellation of resources/updated notifications from the server. This should follow a previous resources/subscribe request.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#unsubscriberequestparams)  `UnsubscribeRequestParams`

interfaceUnsubscribeRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#unsubscriberequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#unsubscriberequestparams-uri):string;

}

Parameters for a `resources/unsubscribe` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#unsubscriberequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from ResourceRequestParams.\_meta

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#unsubscriberequestparams-uri)

uri:string

The URI of the resource. The URI can use any protocol; it is up to the server how to interpret it.

Inherited from ResourceRequestParams.uri

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#roots/list)  `roots/list`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listrootsrequest)  `ListRootsRequest`

interfaceListRootsRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“roots/list”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:RequestParams;

}

Sent from the server to request a list of root URIs from the client. Roots allow
servers to ask for specific directories or files to operate on. A common example
for roots is providing a set of repositories or directories a server should operate
on.

This request is typically used when the server needs to understand the file system
structure or access specific locations that the client has permission to read from.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listrootsresult)  `ListRootsResult`

interfaceListRootsResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#listrootsresult-_meta)?:{\[key:string\]:unknown};

[roots](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Root](https://modelcontextprotocol.io/specification/2025-11-25/schema#root)\[\];

\[key:string\]:unknown;

}

The client’s response to a roots/list request from the server.
This result contains an array of Root objects, each representing a root directory
or file that the server can operate on.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listrootsresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#root)  `Root`

interfaceRoot{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#root-_meta)?:{\[key:string\]:unknown};

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#root-name)?:string;

[uri](https://modelcontextprotocol.io/specification/2025-11-25/schema#root-uri):string;

}

Represents a root directory or file that the server can operate on.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#root-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#root-name)

name?:string

An optional name for the root. This can be used to provide a human-readable
identifier for the root, which may be useful for display purposes or for
referencing the root in other parts of the application.

uri [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#root-uri)

uri:string

The URI identifying the root. This _must_ start with file:// for now.
This restriction may be relaxed in future versions of the protocol to allow
other URI schemes.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#sampling/createmessage)  `sampling/createMessage`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#createmessagerequest)  `CreateMessageRequest`

interfaceCreateMessageRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“sampling/createMessage”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [CreateMessageRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams);

}

A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#createmessagerequestparams)  `CreateMessageRequestParams`

interfaceCreateMessageRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[includeContext](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-includecontext)?:“none”\|“thisServer”\|“allServers”;

[maxTokens](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-maxtokens):number;

[messages](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [SamplingMessage](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessage)\[\];

[metadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-metadata)?:object;

[modelPreferences](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-modelpreferences)?: [ModelPreferences](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences);

[stopSequences](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:string\[\];

[systemPrompt](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-systemprompt)?:string;

[task](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-task)?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata);

[temperature](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:number;

[toolChoice](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-toolchoice)?: [ToolChoice](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolchoice);

[tools](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-tools)?: [Tool](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool)\[\];

}

Parameters for a `sampling/createMessage` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from TaskAugmentedRequestParams.\_meta

`Optional`includeContext [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-includecontext)

includeContext?:“none”\|“thisServer”\|“allServers”

A request to include context from one or more MCP servers (including the caller), to be attached to the prompt.
The client MAY ignore this request.

Default is “none”. Values “thisServer” and “allServers” are soft-deprecated. Servers SHOULD only use these values if the client
declares ClientCapabilities.sampling.context. These values may be removed in future spec releases.

maxTokens [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-maxtokens)

maxTokens:number

The requested maximum number of tokens to sample (to prevent runaway completions).

The client MAY choose to sample fewer tokens than the requested maximum.

`Optional`metadata [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-metadata)

metadata?:object

Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.

`Optional`modelPreferences [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-modelpreferences)

modelPreferences?: [ModelPreferences](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences)

The server’s preferences for which model to select. The client MAY ignore these preferences.

`Optional`systemPrompt [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-systemprompt)

systemPrompt?:string

An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.

`Optional`task [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-task)

task?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata)

If specified, the caller is requesting task-augmented execution for this request.
The request will return a CreateTaskResult immediately, and the actual result can be
retrieved later via tasks/result.

Task augmentation is subject to capability negotiation - receivers MUST declare support
for task augmentation of specific request types in their capabilities.

Inherited from TaskAugmentedRequestParams.task

`Optional`toolChoice [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-toolchoice)

toolChoice?: [ToolChoice](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolchoice)

Controls how the model uses tools.
The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
Default is `{ mode: “auto” }`.

`Optional`tools [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessagerequestparams-tools)

tools?: [Tool](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool)\[\]

Tools that the model may use during generation.
The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#createmessageresult)  `CreateMessageResult`

interfaceCreateMessageResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessageresult-_meta)?:{\[key:string\]:unknown};

[content](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [SamplingMessageContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessagecontentblock) \| [SamplingMessageContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessagecontentblock)\[\];

[model](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessageresult-model):string;

[role](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Role](https://modelcontextprotocol.io/specification/2025-11-25/schema#role);

[stopReason](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessageresult-stopreason)?:string;

\[key:string\]:unknown;

}

The client’s response to a sampling/createMessage request from the server.
The client should inform the user before returning the sampled message, to allow them
to inspect the response (human in the loop) and decide whether to allow the server to see it.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessageresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

model [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessageresult-model)

model:string

The name of the model that generated the message.

`Optional`stopReason [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#createmessageresult-stopreason)

stopReason?:string

The reason why sampling stopped, if known.

Standard values:

- “endTurn”: Natural end of the assistant’s turn
- “stopSequence”: A stop sequence was encountered
- “maxTokens”: Maximum token limit was reached
- “toolUse”: The model wants to use one or more tools

This field is an open string to allow for provider-specific stop reasons.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#modelhint)  `ModelHint`

interfaceModelHint{

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelhint-name)?:string;

}

Hints to use for model selection.

Keys not declared here are currently left unspecified by the spec and are up
to the client to interpret.

`Optional`name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelhint-name)

name?:string

A hint for a model name.

The client SHOULD treat this as a substring of a model name; for example:

- `claude-3-5-sonnet` should match `claude-3-5-sonnet-20241022`
- `sonnet` should match `claude-3-5-sonnet-20241022`, `claude-3-sonnet-20240229`, etc.
- `claude` should match any Claude model

The client MAY also map the string to a different provider’s model name or a different model family, as long as it fills a similar niche; for example:

- `gemini-1.5-flash` could match `claude-3-haiku-20240307`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#modelpreferences)  `ModelPreferences`

interfaceModelPreferences{

[costPriority](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-costpriority)?:number;

[hints](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-hints)?: [ModelHint](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelhint)\[\];

[intelligencePriority](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-intelligencepriority)?:number;

[speedPriority](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-speedpriority)?:number;

}

The server’s preferences for model selection, requested of the client during sampling.

Because LLMs can vary along multiple dimensions, choosing the “best” model is
rarely straightforward. Different models excel in different areas—some are
faster but less capable, others are more capable but more expensive, and so
on. This interface allows servers to express their priorities across multiple
dimensions to help clients make an appropriate selection for their use case.

These preferences are always advisory. The client MAY ignore them. It is also
up to the client to decide how to interpret these preferences and how to
balance them against other considerations.

`Optional`costPriority [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-costpriority)

costPriority?:number

How much to prioritize cost when selecting a model. A value of 0 means cost
is not important, while a value of 1 means cost is the most important
factor.

`Optional`hints [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-hints)

hints?: [ModelHint](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelhint)\[\]

Optional hints to use for model selection.

If multiple hints are specified, the client MUST evaluate them in order
(such that the first match is taken).

The client SHOULD prioritize these hints over the numeric priorities, but
MAY still use the priorities to select from ambiguous matches.

`Optional`intelligencePriority [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-intelligencepriority)

intelligencePriority?:number

How much to prioritize intelligence and capabilities when selecting a
model. A value of 0 means intelligence is not important, while a value of 1
means intelligence is the most important factor.

`Optional`speedPriority [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#modelpreferences-speedpriority)

speedPriority?:number

How much to prioritize sampling speed (latency) when selecting a model. A
value of 0 means speed is not important, while a value of 1 means speed is
the most important factor.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#samplingmessage)  `SamplingMessage`

interfaceSamplingMessage{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessage-_meta)?:{\[key:string\]:unknown};

[content](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [SamplingMessageContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessagecontentblock) \| [SamplingMessageContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessagecontentblock)\[\];

[role](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Role](https://modelcontextprotocol.io/specification/2025-11-25/schema#role);

}

Describes a message issued to or received from an LLM API.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#samplingmessage-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#toolchoice)  `ToolChoice`

interfaceToolChoice{

[mode](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolchoice-mode)?:“none”\|“required”\|“auto”;

}

Controls tool selection behavior for sampling requests.

`Optional`mode [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolchoice-mode)

mode?:“none”\|“required”\|“auto”

Controls the tool use ability of the model:

- “auto”: Model decides whether to use tools (default)
- “required”: Model MUST use at least one tool before completing
- “none”: Model MUST NOT use any tools

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#toolresultcontent)  `ToolResultContent`

interfaceToolResultContent{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-_meta)?:{\[key:string\]:unknown};

[content](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-content): [ContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#contentblock)\[\];

[isError](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-iserror)?:boolean;

[structuredContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-structuredcontent)?:{\[key:string\]:unknown};

[toolUseId](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-tooluseid):string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tool\_result”;

}

The result of a tool use, provided by the user back to the assistant.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-_meta)

\_meta?:{\[key:string\]:unknown}

Optional metadata about the tool result. Clients SHOULD preserve this field when
including tool results in subsequent sampling requests to enable caching optimizations.

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

content [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-content)

content: [ContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#contentblock)\[\]

The unstructured result content of the tool use.

This has the same format as CallToolResult.content and can include text, images,
audio, resource links, and embedded resources.

`Optional`isError [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-iserror)

isError?:boolean

Whether the tool use resulted in an error.

If true, the content typically describes the error that occurred.
Default: false

`Optional`structuredContent [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-structuredcontent)

structuredContent?:{\[key:string\]:unknown}

An optional structured result object.

If the tool defined an outputSchema, this SHOULD conform to that schema.

toolUseId [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolresultcontent-tooluseid)

toolUseId:string

The ID of the tool use this result corresponds to.

This MUST match the ID from a previous ToolUseContent.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#toolusecontent)  `ToolUseContent`

interfaceToolUseContent{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-_meta)?:{\[key:string\]:unknown};

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-id):string;

[input](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-input):{\[key:string\]:unknown};

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-name):string;

[type](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tool\_use”;

}

A request from the assistant to call a tool.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-_meta)

\_meta?:{\[key:string\]:unknown}

Optional metadata about the tool use. Clients SHOULD preserve this field when
including tool uses in subsequent sampling requests to enable caching optimizations.

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

id [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-id)

id:string

A unique identifier for this tool use.

This ID is used to match tool results to their corresponding tool uses.

input [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-input)

input:{\[key:string\]:unknown}

The arguments to pass to the tool, conforming to the tool’s input schema.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolusecontent-name)

name:string

The name of the tool to call.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tools/call)  `tools/call`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#calltoolrequest)  `CallToolRequest`

interfaceCallToolRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tools/call”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [CallToolRequestParams](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams);

}

Used by the client to invoke a tool provided by the server.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#calltoolrequestparams)  `CallToolRequestParams`

interfaceCallToolRequestParams{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-_meta)?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown};

[arguments](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-arguments)?:{\[key:string\]:unknown};

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-name):string;

[task](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-task)?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata);

}

Parameters for a `tools/call` request.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-_meta)

\_meta?:{progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken);\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Type Declaration

- \[key: string\]:unknown

- `Optional`progressToken?: [ProgressToken](https://modelcontextprotocol.io/specification/2025-11-25/schema#progresstoken)



If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.


Inherited from TaskAugmentedRequestParams.\_meta

`Optional`arguments [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-arguments)

arguments?:{\[key:string\]:unknown}

Arguments to use for the tool call.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-name)

name:string

The name of the tool.

`Optional`task [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolrequestparams-task)

task?: [TaskMetadata](https://modelcontextprotocol.io/specification/2025-11-25/schema#taskmetadata)

If specified, the caller is requesting task-augmented execution for this request.
The request will return a CreateTaskResult immediately, and the actual result can be
retrieved later via tasks/result.

Task augmentation is subject to capability negotiation - receivers MUST declare support
for task augmentation of specific request types in their capabilities.

Inherited from TaskAugmentedRequestParams.task

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#calltoolresult)  `CallToolResult`

interfaceCallToolResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-_meta)?:{\[key:string\]:unknown};

[content](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-content): [ContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#contentblock)\[\];

[isError](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-iserror)?:boolean;

[structuredContent](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-structuredcontent)?:{\[key:string\]:unknown};

\[key:string\]:unknown;

}

The server’s response to a tool call.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from [Result](https://modelcontextprotocol.io/specification/2025-11-25/schema#result). [\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#result-_meta)

content [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-content)

content: [ContentBlock](https://modelcontextprotocol.io/specification/2025-11-25/schema#contentblock)\[\]

A list of content objects that represent the unstructured result of the tool call.

`Optional`isError [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-iserror)

isError?:boolean

Whether the tool call ended in an error.

If not set, this is assumed to be false (the call was successful).

Any errors that originate from the tool SHOULD be reported inside the result
object, with `isError` set to true, _not_ as an MCP protocol-level error
response. Otherwise, the LLM would not be able to see that an error occurred
and self-correct.

However, any errors in _finding_ the tool, an error indicating that the
server does not support tool calls, or any other exceptional conditions,
should be reported as an MCP error response.

`Optional`structuredContent [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#calltoolresult-structuredcontent)

structuredContent?:{\[key:string\]:unknown}

An optional JSON object that represents the structured result of the tool call.

## [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tools/list)  `tools/list`

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listtoolsrequest)  `ListToolsRequest`

interfaceListToolsRequest{

[id](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [RequestId](https://modelcontextprotocol.io/specification/2025-11-25/schema#requestid);

[jsonrpc](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“2.0”;

[method](https://modelcontextprotocol.io/specification/2025-11-25/schema#):“tools/list”;

[params](https://modelcontextprotocol.io/specification/2025-11-25/schema#)?:PaginatedRequestParams;

}

Sent from the client to request a list of tools the server has.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#listtoolsresult)  `ListToolsResult`

interfaceListToolsResult{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtoolsresult-_meta)?:{\[key:string\]:unknown};

[nextCursor](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtoolsresult-nextcursor)?:string;

[tools](https://modelcontextprotocol.io/specification/2025-11-25/schema#): [Tool](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool)\[\];

\[key:string\]:unknown;

}

The server’s response to a tools/list request from the client.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtoolsresult-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

Inherited from PaginatedResult.\_meta

`Optional`nextCursor [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#listtoolsresult-nextcursor)

nextCursor?:string

An opaque token representing the pagination position after the last returned result.
If present, there may be more results available.

Inherited from PaginatedResult.nextCursor

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#tool)  `Tool`

interfaceTool{

[\_meta](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-_meta)?:{\[key:string\]:unknown};

[annotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-annotations)?: [ToolAnnotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations);

[description](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-description)?:string;

[execution](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-execution)?: [ToolExecution](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolexecution);

[icons](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-icons)?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\];

[inputSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-inputschema):{

$schema?:string;

properties?:{\[key:string\]:object};

required?:string\[\];

type:“object”;

};

[name](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-name):string;

[outputSchema](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-outputschema)?:{

$schema?:string;

properties?:{\[key:string\]:object};

required?:string\[\];

type:“object”;

};

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-title)?:string;

}

Definition for a tool the client can call.

`Optional`\_meta [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-_meta)

\_meta?:{\[key:string\]:unknown}

See [General fields: `_meta`](https://modelcontextprotocol.io/specification/2025-11-25/basic/index#meta) for notes on `_meta` usage.

`Optional`annotations [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-annotations)

annotations?: [ToolAnnotations](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations)

Optional additional tool information.

Display name precedence order is: title, annotations.title, then name.

`Optional`description [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-description)

description?:string

A human-readable description of the tool.

This can be used by clients to improve the LLM’s understanding of available tools. It can be thought of like a “hint” to the model.

`Optional`execution [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-execution)

execution?: [ToolExecution](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolexecution)

Execution-related properties for this tool.

`Optional`icons [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-icons)

icons?: [Icon](https://modelcontextprotocol.io/specification/2025-11-25/schema#icon)\[\]

Optional set of sized icons that the client can display in a user interface.

Clients that support rendering icons MUST support at least the following MIME types:

- `image/png` \- PNG images (safe, universal compatibility)
- `image/jpeg` (and `image/jpg`) \- JPEG images (safe, universal compatibility)

Clients that support rendering icons SHOULD also support:

- `image/svg+xml` \- SVG images (scalable but requires security precautions)
- `image/webp` \- WebP images (modern, efficient format)

Inherited from Icons.icons

inputSchema [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-inputschema)

inputSchema:{

$schema?:string;

properties?:{\[key:string\]:object};

required?:string\[\];

type:“object”;

}

A JSON Schema object defining the expected parameters for the tool.

name [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-name)

name:string

Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn’t present).

Inherited from BaseMetadata.name

`Optional`outputSchema [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-outputschema)

outputSchema?:{

$schema?:string;

properties?:{\[key:string\]:object};

required?:string\[\];

type:“object”;

}

An optional JSON Schema object defining the structure of the tool’s output returned in
the structuredContent field of a CallToolResult.

Defaults to JSON Schema 2020-12 when no explicit $schema is provided.
Currently restricted to type: “object” at the root level.

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#tool-title)

title?:string

Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
even by those unfamiliar with domain-specific terminology.

If not provided, the name should be used for display (except for Tool,
where `annotations.title` should be given precedence over using `name`,
if present).

Inherited from BaseMetadata.title

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#toolannotations)  `ToolAnnotations`

interfaceToolAnnotations{

[destructiveHint](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-destructivehint)?:boolean;

[idempotentHint](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-idempotenthint)?:boolean;

[openWorldHint](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-openworldhint)?:boolean;

[readOnlyHint](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-readonlyhint)?:boolean;

[title](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-title)?:string;

}

Additional properties describing a Tool to clients.

NOTE: all properties in ToolAnnotations are **hints**.
They are not guaranteed to provide a faithful description of
tool behavior (including descriptive properties like `title`).

Clients should never make tool use decisions based on ToolAnnotations
received from untrusted servers.

`Optional`destructiveHint [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-destructivehint)

destructiveHint?:boolean

If true, the tool may perform destructive updates to its environment.
If false, the tool performs only additive updates.

(This property is meaningful only when `readOnlyHint == false`)

Default: true

`Optional`idempotentHint [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-idempotenthint)

idempotentHint?:boolean

If true, calling the tool repeatedly with the same arguments
will have no additional effect on its environment.

(This property is meaningful only when `readOnlyHint == false`)

Default: false

`Optional`openWorldHint [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-openworldhint)

openWorldHint?:boolean

If true, this tool may interact with an “open world” of external
entities. If false, the tool’s domain of interaction is closed.
For example, the world of a web search tool is open, whereas that
of a memory tool is not.

Default: true

`Optional`readOnlyHint [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-readonlyhint)

readOnlyHint?:boolean

If true, the tool does not modify its environment.

Default: false

`Optional`title [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations-title)

title?:string

A human-readable title for the tool.

### [​](https://modelcontextprotocol.io/specification/2025-11-25/schema\#toolexecution)  `ToolExecution`

interfaceToolExecution{

[taskSupport](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolexecution-tasksupport)?:“forbidden”\|“optional”\|“required”;

}

Execution-related properties for a tool.

`Optional`taskSupport [Permalink](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolexecution-tasksupport)

taskSupport?:“forbidden”\|“optional”\|“required”

Indicates whether this tool supports task-augmented execution.
This allows clients to handle long-running operations through polling
the task system.

- “forbidden”: Tool does not support task-augmented execution (default when absent)
- “optional”: Tool may support task-augmented execution
- “required”: Tool requires task-augmented execution

Default: “forbidden”

Was this page helpful?

YesNo

[Pagination](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/pagination)

Ctrl+I

[github](https://github.com/modelcontextprotocol)

Assistant

Responses are generated using AI and may contain mistakes.