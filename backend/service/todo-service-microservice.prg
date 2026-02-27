//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Implements the TodoService microservice. This service provides REST API
/// endpoints for managing todo items through the TodoEditHandler.
/// </summary>
///
///
/// <remarks>
/// This microservice uses the Microservice base class which provides:
/// - Automated webhandler and endpoint configuration
/// - Process health monitoring and recovery
/// - Worker pool management
/// - CPU allocation and scaling
/// <para/>
/// The service lifecycle methods can be overridden to customize behavior:
/// - :beforeRun() prepares external resources before starting the service
/// - :afterRun() performs cleanup after the service stops
/// - :onRestart() handles service restart after abnormal shutdown
/// - :onRecover() handles critical state after multiple restart attempts
/// <para/>
/// Configuration is loaded from the service.exe.config file.
/// </remarks>
///
///
/// <copyright>
/// Copyright Alaska Software 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////

#include "common.ch"
#include "web.ch"

CLASS TodoService FROM Microservice
  EXPORTED:

  CLASS METHOD beforeRun()
  CLASS METHOD afterRun()

  CLASS METHOD onRestart()
  CLASS METHOD onRecover()
ENDCLASS

/// <summary>
/// Prepares the service before running. Called after onStartup() and before run().
/// Override this method to test or prepare external resources (files, databases,
/// connections) required for the service to work properly.
/// </summary>
/// <param name="aParameters">Command line parameters passed to the service</param>
/// <returns value="lContinue">Returns .T. to continue with run(), .F. to abort</returns>
/// <remarks>
/// Must call SUPER:beforeRun() to ensure proper endpoint and worker configuration.
/// If .F. is returned, service shutdown is initiated and :run() is not executed.
/// </remarks>
///
CLASS METHOD TodoService:beforeRun(aParameters)
  /* Add custom resource preparation here if needed */
RETURN SUPER:beforeRun(aParameters)


/// <summary>
/// Performs cleanup after the service stops. Called after run() and before onShutdown().
/// Override this method for housekeeping of external resources allocated by the service
/// (e.g., closing database connections).
/// </summary>
/// <returns value="lContinue">Returns .T. to continue shutdown, .F. to exit immediately</returns>
/// <remarks>
/// Must call SUPER:afterRun() to ensure proper microservice subsystem cleanup.
/// </remarks>
///
CLASS METHOD TodoService:afterRun()
  /* Add custom cleanup here if needed */
RETURN SUPER:afterRun()


/// <summary>
/// Handles service restart notification. Called during startup if an abnormal shutdown
/// was detected. Executes before the health manager starts.
/// </summary>
/// <param name="oState">State object containing state text and recover counter</param>
/// <returns value="self"/>
/// <remarks>
/// When oState:RecoverCounter is greater than 1, a simple restart may not fix the issue.
/// Consider implementing dedicated recovery strategies for such cases.
/// </remarks>
///
CLASS METHOD TodoService:onRestart(oState)
  UNUSED(oState)
  XppRtFileLogger():warning(FormatMessage("Processing restart for(%1)",::classname()))
RETURN .T.

/// <summary>
/// Handles critical state notification. Called after multiple restart attempts have
/// failed to fix the problem, as defined by the RecoverManager recover-threshold.
/// </summary>
/// <param name="oState">State object containing state text and recover counter</param>
/// <returns value="lReset">Returns .T. to reset the recover counter, .F. otherwise</returns>
/// <remarks>
/// Typically used to inform about critical state or trigger external monitoring alerts.
/// The recover threshold is configured in the RecoverManager section of the config file.
/// </remarks>
///
CLASS METHOD TodoService:onRecover(oState)
  UNUSED(oState)
  XppRtFileLogger():warning(FormatMessage("Processing recover for(%1)",::classname()))
RETURN .T.



