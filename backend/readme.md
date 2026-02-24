# simple todo microservice
#### revision 0.16, May 2023

## Implementation
The todo microservice uses the Alaska Software MSA to get the following features:

- integrated service install/uninstall start/stop/status
- service health watching cpu/memory
- service runtime error tracking and automated/preemptive service restart
- automated cross origin mgmt. Defaults to open backend
- REST API, mapping of routes to class and method.
- Type mapping, automated input/output type conversion for your REST interfaces

## Todo service
Implements REST API related to view and edit of todo items. Uses the RestHandler to map input/output interfaces
in the :onRegister() callback.

| Method | Path            | Description                     | Map                             |
|--------|-----------------|---------------------------------|---------------------------------|
| GET    | /todoitems      | Get all items                   | /TodoEditHandler/getTodoItems    |
| GET    | /todoitems/::id | Get a specific todo item by id  | /TodoEditHandler/getTodoItemById |
| DELETE | /todoitems/::id | Delete a single todo item by id | /TodoEditHandler/deleteTodoItem  |
| PUT    | /todoitems/::id | Update an existing todo item    | /TodoEditHandler/updateTodoItem  |
| POST   | /todoitems      | Create a new todo item          | /TodoEditHandler/createTodoItem  |

## Type maps
The handler defines in :onRegister() two type maps to have automatic input/output parameter validation

|Name| Type                                                   |
|-------|--------------------------------------------------------|
|todoitem| awaits json object which get transformed to dataobject |
|id| is required to be of numeric type                      |


## Infrastructure
The Xbase++ MSA is a framework for microservices development, deployment and execution. The
todo-item service makes implicit usage of Configuration Management, Process Resilience and
Health Monitoring. It uses explicitly the RestHandler for rest routing and type conversion.

## Config
By default MSA looks for todo-service.exe.config where the exe is located. There is the
basic config as shown below.

            <?xml version="1.0" encoding="iso-8859-1" standalone="yes"?>
            <config>

              <service name="todo-service" />

              <RecoverManager ResetTimeframe="10" RecoverThreshold="3" />

              <!-- default false disabled default watchdog and allows overwrite -->
              <HealthManager>
                <CpuLimitWatchDog limit="50" />
                <MemoryLimitWatchdog limit="100" />
              </HealthManager>

              <Endpoint name="any" ip="*" port="9100" >
                <WebHandler class="TodoEditHandler" />
              </Endpoint>

            </config>

Notes:
- the service name is the name used to register the service under the windows service manager
  as well as a service registry if used.
- This is a simple service configuration, see MSA documentation for more options/features.

## Development
This service was created based on the rest-msa template of the Xbase++ Workbench. The basic
structure is that the service exe is a target, the business logic goes into a dll for better
testing and re-use in a different context. There is also a unit-test which tests the
business logic dll. The interfaces exposed by the todo-service can be tested
using a Postman collection, using curl from the commandline or via the try feature
of the swagger editor.

- Use -exe to start the microservice on the command line. Use that for debugging of your service
- Enable disable dedicated loggers to understand the workflow
- Use logging
- Move the business logic into a separate dll.
- Write unit -test for the interfaces of your business logic dll
- Use dll-name.dll.config as the dll specific configuration do not
  start to mix configuration data from your dll into the service.exe.config
- Use postman to create your test cases, export them and store the Postman collection with
  your unit tests.


