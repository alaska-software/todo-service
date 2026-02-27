//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Command line utility to create empty tables and indexes for sample. The
/// utlity only creates the files if there are not already there.
/// </summary>
///
///
/// <copyright>
/// Alaska Software Inc. (c) 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////

#include "Common.ch"

/// <summary>
/// Helper to ensure that proper database engines are loaded and ready to use
/// </summary>
PROCEDURE DbeSys
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

/* This is our main procedure
 */
PROCEDURE Main
  LOCAL oTDM, oE

  SET CHARSET TO ANSI

  ? "Create Database for TodoEditService "+Var2Char(Date())

  BEGIN TRY
    oTDM := TodoDataManager():open()
  RECOVER USING oE
    oTDM := NIL
  END

  IF IsNull(oTDM)
    ? "  creating tables and indexes"
    TodoDataFactory():create()
    TodoDataFactory():addInitRecords()
  ELSE
    ? "  Nothing done, tables and indexes already exist!"
  ENDIF
  ? "## OK"
RETURN
