//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// The purpose of the runner is to run all tests.
/// </summary>
///
///
/// <remarks>
/// A runner knows at least one suite, a suite knows at least one group
/// and a group has at least 0 or more tests. A test may have one or more
/// asserts/checks.
/// </remarks>
///
///
/// <copyright>
/// Alaska Software, (c) 2016. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////

/// <returns>
/// returns array of classobjectes derived from GenericTestSuite
/// </returns>
FUNCTION QuerySuites()
RETURN QueryInheritedFrom( GenericTestSuite() )

/// <returns>
/// returns array of classobjectes derived from GenericTestGroup
/// </returns>
FUNCTION QueryGroups()
RETURN QueryInheritedFrom( GenericTestGroup() )

/// <summary>
/// Queries the runtime for class objects derived from oFromClass.
/// </summary>
/// <remarks>
/// - ReadStatus is filtered out as classobject creation leads to runtime error
/// - AutomatedTestSuite is filtered out as this is an internal utility class
/// </remarks>
/// <returns>
/// returns array of classobjectes derived from GenericTestGroup
/// </returns>
FUNCTION QueryInheritedFrom( oFromClass )
   LOCAL aClassNames
   LOCAL oClass, n
   LOCAL aSuites := {}
   aClassNames := SymbolInfo( SYMBOL_CLASSFUNC )
   FOR n:=1 TO Len( aClassNames )
     IF(aClassNames[n] $ { "READSTATUS", "AUTOMATEDTESTSUITE" })
       LOOP
     ENDIF
     oClass := ClassObject( aClassNames[n] )
     IF(oClass:isDerivedFrom( oFromClass ) .AND. oClass != oFromClass )
       AAdd( aSuites, oClass )
     ENDIF
   NEXT n
RETURN( aSuites )

CLASS AutomatedTestSuite FROM GenericTestSuite
  EXPORTED:
  METHOD setup()
ENDCLASS

METHOD AutomatedTestSuite:setup()
  LOCAL n
  LOCAL aGroups
  aGroups := QueryGroups()
  FOR n:=1 TO Len(aGroups)
    ::addGroup( aGroups[n]:classname() )
  NEXT n
RETURN(SELF)

