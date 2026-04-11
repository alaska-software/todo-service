# Simple Todo Microservice
#### revision 1.1, Nov. 2025

## Implementation
The todo microservice uses the Alaska Software MSA to get the following features:

- integrated service install/uninstall start/stop/status
- service health watching cpu/memory
- service runtime error tracking and automated/preemptive service restart
- automated cross origin mgmt. Defaults to open backend
- REST API, mapping of routes to class and method.
- Type mapping, automated input/output type conversion for your REST interfaces

# Build and Run
- `cd todo-service\backend` to navigate to the project directory
- `xppam PROJECT -install` to install all dependencies/assets
- `pbuild -a` to build the project
- `cd run` to navigate to the run directory
- `create-table.exe` to create the test data
- `todo-service.exe -exe` to start the service. Allow access through the firewall.
- Try out `curl http://localhost:9100/todoitems` or `curl http://localhost:9100/todoitems/1`
- Try out Postman collection located at `unit-test/TodoItemService.postman_collection.json`
- Run `todo-service.exe` without arguments for more options

## Todo service
Implements REST API related to view and edit of todo items. Uses the RestHandler to map input/output interfaces
in the :onRegister() callback.

| Method | Path            | Description                     | Handler Method                   |
|--------|-----------------|---------------------------------|----------------------------------|
| GET    | /todoitems      | Get all items                   | TodoEditHandler:getTodoItems()    |
| GET    | /todoitems/{id} | Get a specific todo item by id  | TodoEditHandler:getTodoItemById() |
| POST   | /todoitems      | Create a new todo item          | TodoEditHandler:createTodoItem()  |
| PUT    | /todoitems/{id} | Update an existing todo item    | TodoEditHandler:updateTodoItem()  |
| DELETE | /todoitems/{id} | Delete a single todo item by id | TodoEditHandler:deleteTodoItem()  |

## Type Maps
The handler defines in `:onRegister()` two type maps to have automatic input/output parameter validation:

| Name      | Type                                                     |
|-----------|----------------------------------------------------------|
| todoitem  | Awaits JSON object which gets transformed to data object |
| id        | Required to be of numeric type                           |


## Infrastructure
The Xbase++ MSA is a framework for microservices development, deployment and execution. The
todo-item service makes implicit usage of Configuration Management, Process Resilience and
Health Monitoring. It uses explicitly the RestHandler for rest routing and type conversion.

## Configuration
By default, MSA looks for `todo-service.exe.config` where the exe is located. The basic configuration is shown below:

```xml
<?xml version="1.0" encoding="iso-8859-1" standalone="yes"?>
<config>

  <service name="todo-service" firewall-control="auto" />

  <RecoverManager ResetTimeframe="10" RecoverThreshold="3" />

  <!-- default false disabled default watchdog and allows overwrite -->
  <HealthManager>
    <CpuLimitWatchDog limit="50" />
    <MemoryLimitWatchdog limit="100" />
  </HealthManager>

  <Endpoint name="any" ip="*" port="9100" status="true" >
    <WebHandler class="TodoEditHandler" />
  </Endpoint>

</config>
```

**Notes:**
- The service name is used to register the service under the Windows Service Manager as well as a service registry if used
- Configuration file is located at `service/todo-service.exe.config`
- This is a simple service configuration; see MSA documentation for more options/features

## Development
This service was created based on the rest-msa template of the Xbase++ Workbench. The basic structure is:

- **Service executable** (`service/`) - Main service target
- **Business logic DLL** (`business-logic/`) - Contains `todo-manager.dll` for better testing and reuse in different contexts
- **Unit tests** (`unit-test/`) - Tests the business logic DLL
- **Database creation** (`create-table.prg`) - Utility to create test data

The interfaces exposed by the todo-service can be tested using:
- Postman collection at `unit-test/TodoItemService.postman_collection.json`
- curl from the command line
- Swagger editor (see `service/swagger-todo-service.json`)

**WorkArea Container**: The `wa-container` (`business-logic/wa-container.prg`) is a WorkArea container able to move a used workarea between threads, avoiding the need to open/close DBF tables and indices for each thread/request.

## Best Practices
- Use `-exe` flag to start the microservice on the command line for debugging your service
- Enable/disable dedicated loggers to understand the workflow
- Use logging appropriately
- Move the business logic into a separate DLL (as done with `todo-manager.dll`)
- Write unit tests for the interfaces of your business logic DLL
- Use `dll-name.dll.config` as the DLL-specific configuration; do not mix configuration data from your DLL into the `service.exe.config`
- Use Postman to create your test cases, export them, and store the Postman collection with your unit tests


