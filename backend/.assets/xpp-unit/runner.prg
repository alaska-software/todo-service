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

/// <summary>
/// No UI just stdout, anything else needs to be provided by the
/// test or suite.
/// </summary>
///
PROCEDURE appsys
RETURN

/// <summary>
/// Parsers command line and maintaines option states
/// </summary>
CLASS CommandLineFlags
  PROTECTED:
  CLASS VAR _Verbose
  CLASS VAR _Groups
  CLASS VAR _Tests
  CLASS VAR _Categories
  CLASS METHOD usage()
  CLASS METHOD test()
  EXPORTED:
  CLASS METHOD setup()
  CLASS METHOD processParameter()
  CLASS METHOD isVerbose()
  CLASS METHOD isGroupAllowed()
  CLASS METHOD isTestAllowed()
  CLASS METHOD isCategoryAllowed()
  CLASS METHOD getTestAllowedCount()
ENDCLASS


/// <param name="aParameters">Array of command line parameters as passed to main</param>
/// <param name="oListener">The listener is the output channel of the runner</param>
CLASS METHOD CommandLineFlags:setup(aParameters, oListener)
   LOCAL lError

   ::_Verbose    := .F.
   ::_Groups     := {}
   ::_Tests      := {}
   ::_Categories := {}

   IF(Empty(aParameters))
     RETURN
   ENDIF

   lError := .F.
   AEval( aParameters, {|xPara|::processParameter(xPara,@lError)} )
   IF(lError)
     ::usage(oListener)
   ENDIF

RETURN

CLASS METHOD CommandLineFlags:usage(oListener)
  oListener:output( "Xbase++ Unit-Test runner options:")
  oListener:output( "   /v verbose, print each test name as it runs.")
  oListener:output( "   /g:group only run tests whose group name contains name")
  oListener:output( "   /n:name only run tests whose name contains name")
  oListener:output( "   /c:category only run tests who belong to category")
  oListener:output( " ")
  oListener:output( "   You can specify multiple /g|/n|/c options")
  QUIT
RETURN(SELF)

/// <summary>
/// processes a single command line parameter and sets the option. lError
/// needs to be passed by reference as it reflects the error state.
/// </summary>
CLASS METHOD CommandLineFlags:processParameter(cPara, lError )
  LOCAL cValue

  IF cPara[1] != "-" .AND. cPara[1] != "/"
     lError := .T.
     RETURN self
  ENDIF

  cPara := SubStr( cPara, 2 )

  cPara := Lower( AllTrim( cPara ) )
  IF    (cPara=="v")
    ::_Verbose := .T.
  ELSEIF(cPara="g:")
    cValue := Lower(AllTrim(SubStr(cPara,3)))
    AAdd( ::_Groups, cValue )
  ELSEIF(cPara="n:")
    cValue := Lower(AllTrim(SubStr(cPara,3)))
    AAdd( ::_Tests, cValue )
  ELSEIF(cPara="c:")
    cValue := Lower(AllTrim(SubStr(cPara,3)))
    AAdd( ::_Categories, cValue )
  ELSE
    lError := .T.
  ENDIF
RETURN(SELF)

CLASS METHOD CommandLineFlags:getTestAllowedCount()
RETURN(Len(::_Tests))

CLASS METHOD CommandLineFlags:isVerbose()
RETURN(::_Verbose)


CLASS METHOD CommandLineFlags:test( aG, cG )
  LOCAL nP
  IF(Empty(aG))
    RETURN(.T.)
  ENDIF
  cG := Lower(AllTrim( cG ) )
  nP := AScan( aG, {|x|x==cG})
RETURN(nP!=0)


CLASS METHOD CommandLineFlags:isGroupAllowed(cGroup)
RETURN(::test(::_Groups, cGroup ))


CLASS METHOD CommandLineFlags:isTestAllowed(cTest)
RETURN(::test(::_Tests, cTest ))


CLASS METHOD CommandLineFlags:isCategoryAllowed(cCat)
RETURN(::test(::_Categories, cCat ))


/// <summary>
/// The runner simple looks first for a given test-suite. If not found he uses
/// the internal automated test suite which is able to find all groups and their
/// tests bound to that process.
/// </summary>
///
/// <remarks>
/// Suites are only required if you need to establish an order in that groups shall
/// be executed. This makes sense in such case at which you are testing first basic
/// features and then more complex features which relay in the avaialbility and correctness
/// of the basic features. In such cases setup a Suite and add the groups in the specific
/// order.
/// </remarks>
///
PROCEDURE MAIN()
  LOCAL oSuite
  LOCAL oListener
  LOCAL oCB
  LOCAL aSuites
  LOCAL n, aP

  oListener := ConsoleListener():New()

  aP := Array( PCount() )
  FOR n:=1 TO PCount()
    aP[n] := PValue(n)
  NEXT n
  CommandLineFlags():setup(aP, oListener)
  aSuites   := QuerySuites()

  IF(Empty(aSuites))
    aSuites := { AutomatedTestSuite() }
  ENDIF

  oCB := ErrorBlock({|oE|_Break(oE)})
  BEGIN SEQUENCE
    FOR n:=1 TO Len(aSuites)
      oSuite := aSuites[n]:New(CommandLineFlags(), oListener)
      oSuite:Run()
    NEXT n
  END SEQUENCE
  ErrorBlock(oCB)

  IF(oListener:isFatal())
    ErrorLevel(2)
  ELSEIF(oListener:isFailed())
    ErrorLevel(1)
  ENDIF
  oListener:Report()
RETURN