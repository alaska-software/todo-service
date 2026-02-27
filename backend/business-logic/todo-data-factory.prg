//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Factory class for creating and managing the todo items database structure.
/// Provides methods for database initialization, cleanup, and sample data setup.
/// </summary>
///
///
/// <remarks>
/// This factory is typically used in two scenarios:
/// 1. Initial setup - Creates the database files and populates sample data
///    for development and testing purposes
/// 2. Unit testing - Provides clean database creation/destruction for test
///    isolation
/// <para/>
/// The factory creates tables using the FOXCDX database engine, which combines
/// FoxPro DBF format with CDX indexing.
/// </remarks>
///
///
/// <copyright>
/// Alaska Software Inc. (c) 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////
#include "todo-data-manager.ch"

CLASS TodoDataFactory
  EXPORTED:
  CLASS METHOD create()
  CLASS METHOD destroy()
  CLASS METHOD rebuild()
  CLASS METHOD addInitRecords()
ENDCLASS


/// <summary>
/// Creates the todo items database table and index structure.
/// </summary>
/// <returns value="self"/>
/// <remarks>
/// Creates a new DBF table with the following fields:
/// - id (autoinc) - Auto-incrementing primary key
/// - created (timestamp) - Creation timestamp
/// - text (memo) - Todo item description
/// - changed (timestamp) - Last modified timestamp
/// - state (char 2) - Workflow state ID
/// - priority (char 2) - Priority level ID
/// <para/>
/// Creates a single index on the id field, excluding deleted records.
/// Files are created in the current working directory.
/// </remarks>
///
CLASS METHOD TodoDataFactory:create()
  LOCAL aStruct
  FIELD id

  // ensure that zero workspace is clean
  IF DbRequest()
    DbCloseArea()
  ENDIF

  // setup table
  aStruct := {}
  AAdd( aStruct, {"id"       ,"S",1,1} )
  AAdd( aStruct, {"created"  ,"T",0,0} )
  AAdd( aStruct, {"text"     ,"M",4,0} )
  AAdd( aStruct, {"changed"  ,"T",4,0} )
  AAdd( aStruct, {"state"    ,"C",2,0} )
  AAdd( aStruct, {"priority" ,"C",2,0} )
  DbCreate( TODO_DATA, aStruct, "FOXCDX")

  // use table and create index
  USE (TODO_DATA) EXCLUSIVE
  INDEX ON id TAG id TO (TODO_DATA) FOR !Deleted()
  USE

RETURN SELF


/// <summary>
/// Removes all database files from disk.
/// </summary>
/// <returns value="self"/>
/// <remarks>
/// Deletes the table file (.dbf), index file (.cdx), and memo file (.fpt).
/// Primarily used in unit tests to ensure a clean state between test runs.
/// </remarks>
///
CLASS METHOD TodoDataFactory:destroy()
   FErase( TODO_DATA_TABLE )
   FErase( TODO_DATA_INDEX )
   FErase( TODO_DATA_MEMO )
RETURN SELF


/// <summary>
/// Rebuilds all indexes for the todo items table.
/// </summary>
/// <returns value="self"/>
/// <remarks>
/// Reconstructs index files to optimize performance and repair any
/// corruption. Useful for database maintenance operations.
/// </remarks>
///
CLASS METHOD TodoDataFactory:rebuild()
  LOCAL oTDM
  oTDM := TodoDataManager():open()
  OrdListRebuild()
  oTDM:close()
RETURN SELF


/// <summary>
/// Populates the database with sample todo items for development and testing.
/// </summary>
/// <returns value="self"/>
/// <remarks>
/// Creates a representative set of todo items demonstrating various states,
/// priorities, and timestamps. Used during initial setup to provide immediate
/// data for testing the REST API and UI development.
/// <para/>
/// Should only be called after :create() has set up the database structure.
/// </remarks>
///
CLASS METHOD TodoDataFactory:addInitRecords()
  LOCAL oTDM, oTodoItem

  oTDM := TodoDataManager():open()

  oTodoItem := newTodoItem("", "2025-04-02T09:00:00", "Read RESTful API Design by Matthias Biehl", "", "A+")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-03-12T11:00:00", "Prepare for the conference on 5-6 May", "", "A+")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-04-25T11:30:00", "Call mom", "", "A+")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-04-15T23:30:00", "Send a present to my dentist", "2025-04-16T13:05:00", "BB")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-01-15T21:17:08", "Find out how and when to use deepObject in swagger parameter serialization", "2025-04-16T13:00:00", "AA")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-04-10T21:17:08", "Make an appointment for passport", "", "AA")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-04-10T21:17:08", "Apply a U.S. visa", "", "CC")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-04-22T08:56:14", "Buy healthy food for the office", "2025-04-23T18:15:56", "C-")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-04-22T08:56:14", "Pick up flowers", "", "BB")
  oTDM:add(oTodoItem)

  oTodoItem := newTodoItem("", "2025-04-22T08:56:14", "Book a hotel in Rome", "", "BB")
  oTDM:add(oTodoItem)

  oTDM:close()
RETURN SELF

