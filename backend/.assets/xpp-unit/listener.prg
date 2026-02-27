//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Implements different listeners
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
/// Listener interface to be implement by any listener
/// </summary>
CLASS ITestListener
  DEFERRED METHOD endTest
  DEFERRED METHOD startTest
ENDCLASS

FUNCTION Measure()
  STATIC oM := NIL
  IF(ValType(oM)=="O")
    RETURN(oM)
  ENDIF
  oM := _Measure():New()
RETURN(oM)

CLASS _Measure
  PROTECTED:
  VAR _TestCount
  VAR _GroupCount
  VAR _IgnoreCount
  VAR _FailureCount
  VAR _CheckCount
  EXPORTED:
  METHOD init()
  METHOD addTest()
  METHOD addGroup()
  METHOD addIgnore()
  METHOD addFailure()
  METHOD addCheck()
  ACCESS METHOD tests
  ACCESS METHOD groups
  ACCESS METHOD ignored
  ACCESS METHOD failed
  ACCESS METHOD checks
ENDCLASS

ACCESS METHOD _Measure:tests
RETURN(::_TestCount)

ACCESS METHOD _Measure:groups
RETURN(::_GroupCount)

ACCESS METHOD _Measure:ignored
RETURN(::_IgnoreCount)

ACCESS METHOD _Measure:failed
RETURN(::_FailureCount)

ACCESS METHOD _Measure:checks
RETURN(::_CheckCount)


METHOD _Measure:init()
  ::_TestCount    := 0
  ::_GroupCount   := 0
  ::_IgnoreCount  := 0
  ::_FailureCount := 0
  ::_CheckCount   := 0
RETURN(SELF)


METHOD _Measure:addTest()
  ::_TestCount++
RETURN

METHOD _Measure:addGroup()
  ::_GroupCount++
RETURN

METHOD _Measure:addIgnore()
  ::_IgnoreCount++
RETURN

METHOD _Measure:addFailure()
  ::_FailureCount++
RETURN

METHOD _Measure:addCheck()
  ::_CheckCount++
RETURN


CLASS ConsoleListener FROM ITestListener
  PROTECTED:
  VAR _StartTime
  VAR _TestCount
  VAR _CheckCount
  VAR _GroupCount
  VAR _Run
  VAR _Ignored
  VAR _Failed
  VAR _Mode
  VAR _Fatal
  VAR _Messages
  EXPORTED:
  METHOD init()
  METHOD LineFeed()
  METHOD Output()
  METHOD OutputContext()
  METHOD OutputResultExpectation()

  METHOD postMessage()
  METHOD flushMessages()

  METHOD Verbose()
  METHOD Failure()
  METHOD isFatal()
  METHOD setFatal()
  METHOD isFailed()
  METHOD Report()

  METHOD startTest()
  METHOD endTest()
ENDCLASS

METHOD ConsoleListener:init()
  ::_TestCount := 0
  ::_CheckCount:= 0
  ::_GroupCount:= 0
  ::_Run       := 0
  ::_Ignored   := 0
  ::_Failed    := 0
  ::_Fatal     := .F.
  ::_StartTime := MilliSeconds()
  ::_Messages  := {}
RETURN(SELF)

METHOD ConsoleListener:Verbose()
  LOCAL n
  IF(!CommandLineFlags():isVerbose())
    RETURN
  ENDIF
  FOR n:=1 TO PCount()
    OutStd(Var2Char(PValue(n)))
  NEXT n
  ::LineFeed()
RETURN

// $TODO us them in testgroup
METHOD ConsoleListener:OutputContext()
  ::_Listener:Output("Error:T"+StrZero(ThreadId(),2)+":"+ProcName(2)+":"+Var2Char(ProcLine(2)))
RETURN(SELF)

METHOD ConsoleListener:OutputResultExpectation(xExpected,xResult)
  ::_Listener:Output("  excpected:"+Var2Char(xExpected))
  ::_Listener:Output("    but was:"+Var2Char(xResult))
RETURN(SELF)

METHOD ConsoleListener:LineFeed()
  OutStd(Chr(13)+Chr(10))
RETURN

METHOD ConsoleListener:Output()
  LOCAL n
  FOR n:=1 TO PCount()
    OutStd(Var2Char(PValue(n)))
  NEXT n
  ::LineFeed()
RETURN

METHOD ConsoleListener:postMessage(cTxt)
  AAdd( ::_Messages, cTxt )
RETURN

METHOD ConsoleListener:flushMessages()
  LOCAL n,nL
  nL := Len(::_Messages)
  FOR n:=1 TO nL
    ::Output( ::_Messages[n] )
  NEXT
  ::_Messages := {}
RETURN

METHOD ConsoleListener:Failure()
  LOCAL n
  FOR n:=1 TO PCount()
    OutStd(Var2Char(PValue(n)))
  NEXT n
  ::LineFeed()
  ::_Failed++
RETURN

METHOD ConsoleListener:isFailed()
RETURN(::_Failed>0)

METHOD ConsoleListener:isFatal()
RETURN(::_Fatal)

METHOD ConsoleListener:setFatal()
  ::_Fatal := .T.
RETURN

METHOD ConsoleListener:Report
  LOCAL cMsg
  LOCAL nElapsed
  LOCAL nTestCount

  IF(!CommandLineFlags():isVerbose())
    ::LineFeed()
  ENDIF

  IF(::isFatal())
    cMsg := "ERROR (runtime-error, "
  ELSEIF(::isFailed())
    cMsg := StrFormat( "FAILED (%1 failed, " , ::_Failed )
  ELSE
    cMsg := "OK ("
  ENDIF

  nElapsed := MilliSeconds() - ::_StartTime

  // patch test count according to filters
  IF( CommandLineFlags():getTestAllowedCount()>0 )
    nTestCount := CommandLineFlags():getTestAllowedCount()
  ELSE
    nTestCount := Measure():tests
  ENDIF

  // OK (2 tests, 2 ran, 0 checks, 0 ignored, 0 filtered out)
  cMsg += StrFormat("%1 tests, %2 ran, %3 checks, %4 ignored, %5 filtered, %6 ms)",nTestCount , ::_Run, Measure():checks, Measure():ignored, 0, nElapsed)
  OutStd(cMsg)
RETURN

METHOD ConsoleListener:startTest()
  IF(!CommandLineFlags():isVerbose())
    OutStd(".")
  ENDIF
  ::_Run++
RETURN

METHOD ConsoleListener:endTest(lFailed, oE)
  UNUSED(oE)
  IF(lFailed)
    IF(!CommandLineFlags():isVerbose())
      OutStd("!")
    ENDIF
    ::_Failed++
  ELSE
    IF(!CommandLineFlags():isVerbose())
      OutStd(".")
    ENDIF
  ENDIF
RETURN