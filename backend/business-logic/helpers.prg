//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// A collection of small helper functions
/// </summary>
///
///
/// <remarks>
/// </remarks>
///
///
/// <copyright>
/// Alaska Software Inc. (c) 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////

#include "Common.ch"

/// <summary>
/// Helper to create the iso formatted data
/// </summary>
///
FUNCTION IsoDate( dDate, cTime )
RETURN DToC( dDate, "yyyy-mm-dd" ) +"T"+ cTime


/// <summary>
/// Helper to convert VFP date format to iso date format
/// VFP: 20220102090003 -> ISO:2022-01-02T09:00:03
/// </summary>
FUNCTION ConvertVfpDateToIsoDate( cVfpDate )
  LOCAL cIsoDate
  LOCAL cTime
  IF Empty(cVfpDate)
    RETURN ""
  ENDIF
  cTime    := Substr(cVfpDate,9,2)+":"+Substr(cVfpDate,11,2)+":"+Substr(cVfpDate,13,2)
  cIsoDate := DToC( SToD(cVfpDate), "yyyy-mm-dd" ) +"T" + cTime
RETURN cIsoDate


/// <summary>
/// Helper to convert Iso date format to VFP date format
/// ISO:2022-01-02T09:00:03 -> VFP: 20220102090003
/// </summary>
FUNCTION ConvertIsoDateToVfpDate( cIsoDate )
  LOCAL cVfpDate
  IF Empty(cIsoDate)
    RETURN ""
  ENDIF
  cVfpDate := StrTran(cIsoDate,"-","")
  cVfpDate := StrTran(cVfpDate,"T","")
  cVfpDate := StrTran(cVfpDate,":","")
RETURN cVfpDate



FUNCTION newDictionaryElement(cId, cName)
  LOCAL oV
  STATIC oP := NIL
  IF IsNull(oP)
    oP:=DataObject():new()
    oP:id   := ""
    oP:name := ""
  ENDIF
  oV      := oP:copy()
  oV:id   := cId
  oV:name := cName
RETURN oV

FUNCTION newTodoItem(cId, cCreated, cText, cChanged, cPriority)
  LOCAL oTodoItem
  oTodoItem := DataObject():new()
  oTodoItem:id      := cId
  oTodoItem:created := cCreated
  oTodoItem:text    := cText
  oTodoItem:changed := cChanged
  oTodoItem:state   := IIF( Empty(cChanged), "NE", "DO" )
  oTodoItem:priority:= cPriority
RETURN oTodoItem


