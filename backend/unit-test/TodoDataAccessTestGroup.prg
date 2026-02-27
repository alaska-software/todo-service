//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// This group collects all tests for the TodoDataManger
/// </summary>
///
///
/// <remarks>
/// - since the TodoDataManager does not enforce typed interface and does
///   no validation. We do not test that here.
/// </remarks>
///
///
/// <copyright>
/// Alaska Software Inc. (c) 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////
#include "..\.assets\xpp-unit\unit-test.ch"

CLASS TodoDataAccessTestGroup FROM GenericTestGroup
   PROTECTED:
   VAR TDM

   METHOD createEmptyDataFiles()
   METHOD destroyDataFiles()


   EXPORTED:
   METHOD setup()
   METHOD tearDown()

   METHOD testUseData()
   METHOD testAddItem()
   METHOD testAddItems()
   METHOD testGetExistingItem()
   METHOD testGetNonExistingItem()
   METHOD testGetAllItems()
   METHOD testDelItem()
   METHOD testUpdateItem()
ENDCLASS

METHOD TodoDataAccessTestGroup:createEmptyDataFiles()
  LOCAL oTDM
  TodoDataFactory():create()
  oTDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( oTDM )
  oTDM:close()
RETURN SELF

METHOD TodoDataAccessTestGroup:destroyDataFiles()
  LOCAL oTDM
  TodoDataManager():destroy()
  oTDM := TodoDataManager():open()
  CHECK_EQUAL( NIL, oTDM )
RETURN SELF


METHOD TodoDataAccessTestGroup:setup()
   SUPER
   IF !("foxdbe" $ dbelist())
     DbeLoad("foxdbe")
   ENDIF
   IF !("cdxdbe" $ dbelist())
     DbeLoad("cdxdbe")
   ENDIF
   IF !("foxcdx" $ dbelist())
     DbeBuild("foxcdx","foxdbe","cdxdbe")
   ENDIF
RETURN


/// <remarks>
/// We always try to remove the test data
/// </remarks>
///
METHOD TodoDataAccessTestGroup:tearDown()
  IF ValType(::TDM)=="O"
    ::TDM:close()
    ::TDM := NIL
  ENDIF
  //TodoDataManager():destroy()
  SUPER
RETURN

METHOD TodoDataAccessTestGroup:testUseData()
  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )

  ::TDM:close()
  ::TDM := NIL
RETURN SELF


METHOD TodoDataAccessTestGroup:testAddItem()
  LOCAL oData

  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  // prep and ensure empty table
  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )
  CHECK_EQUAL( 0, RecCount() )

  // prep data, add and test for success
  oData := CreateTodoDataObject( "Hello world one at all" )
  ::TDM:add( oData )

  CHECK_EQUAL( 1, RecCount() )
  CHECK_EQUAL( .F., Eof() )

  ::TDM:close()
  ::TDM := NIL
RETURN SELF


METHOD TodoDataAccessTestGroup:testAddItems()
  LOCAL oData

  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  // prep and ensure empty table
  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )
  CHECK_EQUAL( 0, RecCount() )

  // add entry #1
  oData := CreateTodoDataObject( "Hello world #1" )
  ::TDM:add( oData )
  CHECK_EQUAL( 1, RecCount() )
  CHECK_EQUAL( .F., Eof() )

  // add entry #2
  oData := CreateTodoDataObject( "Hello world #2" )
  ::TDM:add( oData )
  CHECK_EQUAL( 2, RecCount() )
  CHECK_EQUAL( .F., Eof() )

  GO 1
  CHECK_EQUAL( "Hello world #1", FIELD->text )
  GO 2
  CHECK_EQUAL( "Hello world #2", FIELD->text )

  ::TDM:close()
  ::TDM := NIL

RETURN SELF


METHOD TodoDataAccessTestGroup:testGetExistingItem()
  LOCAL oData

  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  // prep and ensure empty table
  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )
  CHECK_EQUAL( 0, RecCount() )

  // prep data, add and test for success
  oData := CreateTodoDataObject( "Find me with id#1" )
  ::TDM:add( oData )
  oData := CreateTodoDataObject( "Find me with id#2" )
  ::TDM:add( oData )

  CHECK_EQUAL( 2, RecCount() )

  oData := ::TDM:getById(2)
  CHECK_OBJECT_TYPE( oData )
  CHECK_EQUAL( 2, oData:id )

  oData := ::TDM:getById(1)
  CHECK_OBJECT_TYPE( oData )
  CHECK_EQUAL( 1, oData:id )

  ::TDM:close()
  ::TDM := NIL

RETURN SELF


METHOD TodoDataAccessTestGroup:testGetNonExistingItem()
  LOCAL oData

  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  // prep and ensure empty table
  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )
  CHECK_EQUAL( 0, RecCount() )

  // prep data, add and test for success
  oData := CreateTodoDataObject( "Do not Find me with id#1" )
  ::TDM:add( oData )
  oData := CreateTodoDataObject( "Do not Find me with id#2" )
  ::TDM:add( oData )
  CHECK_EQUAL( 2, RecCount() )

  oData := ::TDM:getById(3)
  CHECK_EQUAL( NIL, oData )

  ::TDM:close()
  ::TDM := NIL

RETURN SELF


METHOD TodoDataAccessTestGroup:testGetAllItems()
  LOCAL oData, aoData

  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  // prep and ensure empty table
  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )
  CHECK_EQUAL( 0, RecCount() )

  // prep data, add and test for success
  oData := CreateTodoDataObject( "Hello world #1" )
  ::TDM:add( oData )
  oData := CreateTodoDataObject( "Hello world #2" )
  ::TDM:add( oData )
  CHECK_EQUAL( 2, RecCount() )

  aoData := ::TDM:getAll()
  CHECK_ARRAY_TYPE( aoData )
  CHECK_EQUAL( 2, Len( aoData ) )
  CHECK_EQUAL( "Hello world #1", aoData[1]:text )
  CHECK_EQUAL( "Hello world #2", aoData[2]:text )

  ::TDM:close()
  ::TDM := NIL

RETURN SELF


METHOD TodoDataAccessTestGroup:testDelItem()
  LOCAL oData, aoData

  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  // prep and ensure empty table
  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )
  CHECK_EQUAL( 0, RecCount() )

  // prep data, add and test for success
  oData := CreateTodoDataObject( "Hello world #1" )
  ::TDM:add( oData )
  oData := CreateTodoDataObject( "Hello world #2" )
  ::TDM:add( oData )
  CHECK_EQUAL( 2, RecCount() )

  // delete entry and removed data
  oData := ::TDM:deleteById(2)
  CHECK_OBJECT_TYPE( oData )
  CHECK_EQUAL( 2, oData:id )

  // check set
  aoData := ::TDM:getAll()
  CHECK_ARRAY_TYPE( aoData )
  CHECK_EQUAL( 1, Len( aoData ) )

  ::TDM:close()
  ::TDM := NIL

RETURN SELF


METHOD TodoDataAccessTestGroup:testUpdateItem()
  LOCAL oData, oUpdatedData

  // invariant
  CHECK_EQUAL( NIL, ::TDM )

  // prep and ensure empty table
  ::createEmptyDataFiles()
  ::TDM := TodoDataManager():open()
  CHECK_OBJECT_TYPE( ::TDM )
  CHECK_EQUAL( 0, RecCount() )

  // prep data, add and test for success
  oData := CreateTodoDataObject( "Hello world one version 1" )
  ::TDM:add( oData )
  CHECK_EQUAL( 1, RecCount() )
  CHECK_EQUAL( .F., Eof() )

  oData := ::TDM:getById(1)
  CHECK_OBJECT_TYPE( oData )
  CHECK_EQUAL( 1, oData:id )

  oData:text := "Hello world one version 2"
  oUpdatedData := ::TDM:updateById( 1, oData )
  CHECK_OBJECT_TYPE( oUpdatedData )

  oData := ::TDM:getById(1)
  CHECK_OBJECT_TYPE( oData )
  CHECK_EQUAL( 1, oData:id )
  CHECK_EQUAL( "Hello world one version 2", oData:text )

  ::TDM:close()
  ::TDM := NIL

RETURN SELF


/// <summary>
/// tiny helper to create sample data for one entry
/// </summary>
FUNCTION CreateTodoDataObject( cText )
  LOCAL oData
  oData         := DataObject():new()
  oData:id      := 0
  oData:created := IsoDate( Date(), Time() )
  oData:text    := cText
  oData:changed := ""
  oData:state   := "NE"
  oData:priority:= "BB"
RETURN oData

