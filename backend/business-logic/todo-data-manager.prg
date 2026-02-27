//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Data access layer for todo items. Uses the WorkArea container pattern to
/// optimize database access in multithreaded environments by avoiding repeated
/// table open/close operations.
/// </summary>
///
/// <remarks>
/// Usage pattern: Call :open() to get an instance, perform operations, then
/// call :close(). The WorkArea container handles workspace management and
/// thread-safe access. See todo-edit-handler.prg for examples.
/// <para/>
/// Converts between VFP timestamp format (used in DBF) and ISO date format
/// (used in REST API responses).
/// </remarks>
///
/// <copyright>
/// Alaska Software Inc. (c) 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////
#include "dac.ch"
#include "todo-data-manager.ch"


CLASS TodoDataManager FROM WAContainer
  PROTECTED:
  METHOD fromWorkarea()
  METHOD toWorkarea()
  METHOD setupPrototype()

  EXPORTED:
  CLASS METHOD use()
  METHOD getDefault()

  METHOD getAll()
  METHOD getById()
  METHOD add()
  METHOD updateById()
  METHOD deleteById()
ENDCLASS


/// <summary>
/// Converts current workarea record to data object with ISO date format.
/// </summary>
METHOD TodoDataManager:fromWorkarea()
  LOCAL oData
  oData := ::createDataobject()
  oData:id      := FIELD->id
  oData:created := ConvertVfpDateToIsoDate( FIELD->created )
  oData:text    := FIELD->text
  oData:changed := ConvertVfpDateToIsoDate( FIELD->changed )
  oData:state   := FIELD->state
  oData:priority:= FIELD->priority
RETURN oData


/// <summary>
/// Writes data object to current workarea record, converting ISO dates to VFP format.
/// </summary>
METHOD TodoDataManager:toWorkarea(oData)
  FIELD->created:= ConvertIsoDateToVfpDate( oData:created )
  FIELD->changed:= ConvertIsoDateToVfpDate( oData:changed )
  FIELD->text   := oData:text
  FIELD->state  := oData:state
  FIELD->priority := oData:priority
RETURN NIL


/// <summary>
/// Initializes the data object prototype with default structure.
/// </summary>
METHOD TodoDataManager:setupPrototype()
  ::_Prototype         := DataObject():new()
  ::_Prototype:id      := 0
  ::_Prototype:created := ""
  ::_Prototype:text    := ""
  ::_Prototype:changed := ""
  ::_Prototype:state   := ""
  ::_Prototype:priority:= ""
RETURN


/// <summary>
/// Opens the todo database table with indexes.
/// </summary>
CLASS METHOD TodoDataManager:use()
  USE (TODO_DATA) INDEX (TODO_DATA) NEW ALIAS todo
RETURN


/// <summary>
/// Returns all non-deleted items as an array of data objects.
/// </summary>
METHOD TodoDataManager:getAll()
  LOCAL aoData := {}

  ::pushWorkarea()

  SELECT ID AS id, ConvertVfpDateToIsoDate(CREATED) AS created, TEXT AS text, ConvertVfpDateToIsoDate(CHANGED) AS changed, STATE AS state, PRIORITY AS priority ;
         FROM (Alias());
         WHERE !Deleted();
         INTO OBJECTS aoData

  ::popWorkarea()

RETURN aoData


/// <summary>
/// Retrieves a todo item by ID.
/// </summary>
/// <returns value="oData">Data object or NIL if not found</returns>
METHOD TodoDataManager:getById(nId)
  LOCAL oData

  ::pushWorkarea()
  OrdSetFocus("id")

  oData := NIL
  IF DbSeek(nId)
    SCATTER FIELDS id,created,text,changed,state,priority NAME oData
    oData:created := ConvertVfpDateToIsoDate( oData:created )
    oData:changed := ConvertVfpDateToIsoDate( oData:changed )
  ENDIF
  ::popWorkarea()
RETURN oData


/// <summary>
/// Returns a default todo item with current timestamp and default state/priority.
/// </summary>
METHOD TodoDataManager:getDefault()
  LOCAL oData
  oData := ::createDataObject()
  oData:created := IsoDate( Date(), Time() )
  oData:state   := "NE"
  oData:priority:= "BB"
RETURN oData


/// <summary>
/// Adds a new todo item to the database.
/// </summary>
/// <returns value="oCreatedTodoItem">The created item with assigned ID</returns>
METHOD TodoDataManager:add(oData)
  LOCAL oCreatedTodoItem

  ::pushWorkarea()
  APPEND BLANK
  ::toWorkarea( oData )
  COMMIT
  oCreatedTodoItem := ::fromWorkarea()
  ::popWorkarea()

RETURN oCreatedTodoItem


/// <summary>
/// Updates an existing todo item by ID.
/// </summary>
/// <returns value="oUpdatedTodoItem">Updated item or NIL if not found</returns>
/// <remarks>
/// The id parameter locates the record; the id in oData is ignored to support
/// copy operations between items.
/// </remarks>
METHOD TodoDataManager:updateById(nId, oData)
  LOCAL oUpdatedTodoItem

  ::pushWorkarea()
  OrdSetFocus("id")

  IF DbSeek(nId)
    DbRLock()
    ::toWorkarea( oData )
    oUpdatedTodoItem := ::fromWorkarea()
    DbRUnlock()
  ENDIF
  ::popWorkarea()

RETURN oUpdatedTodoItem


/// <summary>
/// Deletes a todo item by ID.
/// </summary>
/// <returns value="oData">Deleted item or NIL if not found</returns>
METHOD TodoDataManager:deleteById(nId)
  LOCAL oData

  ::pushWorkarea()
  OrdSetFocus("id")

  oData := NIL
  IF DbSeek(nId)
    DbRLock()
    oData := ::fromWorkarea()
    DbDelete()
    DbRUnlock()
  ENDIF
  ::popWorkarea()
RETURN oData




