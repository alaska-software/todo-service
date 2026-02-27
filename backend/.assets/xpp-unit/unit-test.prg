//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Implements the core features of the Xbase++ unit testing
/// framework
/// </summary>
///
///
/// <remarks>
/// </remarks>
///
///
/// <copyright>
/// Alaska Software, (c) 2016. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////

#include "class.ch"
#include "dll.ch"
#pragma library("adac20b")

STATIC DLLFUNCTION OutputDebugStringA( cString ) USING STDCALL FROM kernel32.dll

#define CRLF (Chr(13)+Chr(10))


/// <summary>
/// Function similar to sprintf, however it just receives
/// a %1 - %n indicator as a placeholder for the 2nd - nTh parameters
/// to be stuffed into the string
/// </summary>
/// <para name="cTxt">string to be formatted</para>
/// <para>All other parameters can be of any type, amount of parameters unlimited</para>
/// <returns>cString</returns>
FUNCTION StrFormat(cTxt)
  LOCAL n,xRepl,xSeek
  FOR n:=2 TO PCount()
    xRepl := Var2Char( PValue(n) )
    xSeek := "%"+AllTrim(Str(n-1))
    cTxt := StrTran(cTxt,xSeek,xRepl)
  NEXT n
RETURN(cTxt)

FUNCTION StrFormatA(cTxt, aVal )
  LOCAL n,xRepl,xSeek
  FOR n:=1 TO LEn(aVal)
    xRepl := Var2Char( aVal[n] )
    xSeek := "%"+AllTrim(Str(n))
    cTxt := StrTran(cTxt,xSeek,xRepl)
  NEXT n
RETURN(cTxt)

FUNCTION LogDate( dDate )
  LOCAL cD := DToS( dDate )
 RETURN( SubStr(cD,1,4)+"-"+SubStr(cD,5,2)+"-"+SubStr(cD,7,2) )

#define MS_PER_HOUR   (60*60000)
#define MS_PER_MINUTE (60000)
#define MS_PER_SECOND (1000)

FUNCTION LogTime()
  LOCAL nT := MilliSeconds()
  LOCAL nH,nM,nS
  LOCAL cT

  nH := Int( nT / MS_PER_HOUR )
  nT := nT - ( nH * MS_PER_HOUR )
  nM := Int( nT / MS_PER_MINUTE )
  nT := nT - ( nM * MS_PER_MINUTE )
  nS := Int( nT / MS_PER_SECOND )
  nT := nT - ( nS * MS_PER_SECOND )

  cT := StrZero(nH,2)+":"+StrZero(nM,2)+":"+StrZero(nS,2)+","+StrZero(nT,3)
RETURN(cT)


FUNCTION XppUnitTestErrorHandler(oE)
  oE:cargo := DataObject():New()
  oE:cargo:Line   := ProcLine(2)
  oE:cargo:Entity := ProcName(2)
RETURN(oE)


CLASS GenericTestSuite
  PROTECTED:
  VAR _Groups
  VAR _Listener
  VAR _Flags
  EXPORTED:
  INLINE METHOD Init(oFlags, oListener)
    ::_Listener := oListener
    ::_Flags    := oFlags

    ::_Groups := {}
    ::Setup()
  RETURN
  DEFERRED METHOD Setup()

  INLINE METHOD AddGroup(cName)
    LOCAL oS := ClassObject(cName)
    IF(ValType(oS)!="O")
      ::_Listener:Failure("No classobject for group:"+Var2Char(cName))
      QUIT
    ENDIF

    AAdd(::_Groups,oS)
    Measure():addGroup()
  RETURN


  INLINE METHOD Run()
    LOCAL oFlags := ::_Flags
    LOCAL co
    LOCAL n, nS
    LOCAL nElapsed, cElapsed

    nS := MilliSeconds()
    ::Log("BEGIN-SUITE "+::ClassName())

    FOR n:=1 TO Len(::_Groups)
      co := ::_Groups[n]

      IF(!::_Flags:isGroupAllowed( co:className() ))
        LOOP
      ENDIF

      // if one group fails we will still continue with other groups
      ::RunInstanceOf(co,oFlags)
    NEXT n

    nElapsed :=  MilliSeconds() - nS
    IF(nElapsed<1)
      cElapsed := "<1ms"
    ELSE
      cElapsed := AllTrim(Str(nElapsed,,0))+"ms"
    ENDIF
    ::Log( "END-SUITE "+::ClassName()+" ("+cElapsed+")" )


  RETURN

  METHOD RunInstanceOf()
  METHOD Log()
ENDCLASS

// we should move that to listener - the same applies to group level log method
METHOD GenericTestSuite:Log(cMsg, cLevel)
  IF(ValType(cMsg)!="C")
    cMsg := Var2char(cMsg)
  ENDIF
  IF(Empty(cLevel))
    cLevel := "INFO"
  ENDIF
  ::_Listener:Verbose( LogDate( DATE() )+" "+LogTime()+" " + cLevel + " ["+Lower(AppName())+"] " +cMsg)
RETURN

METHOD GenericTestSuite:RunInstanceOf(co)
  LOCAL o
  o := co:New(::_Listener, ::_Flags)
  o:Run()
RETURN


/// <summary>
/// Implements generic base of all unit-tests
/// </summary>
CLASS GenericTestGroup
  PROTECTED:
  VAR _Cases
  VAR _FailedTests
  VAR _FailedEntity
  VAR _Categories
  VAR _TimerStart
  VAR _Timer
  VAR _Listener
  VAR _Flags
  VAR _Started
  VAR _Finished
  METHOD processRuntimeError()
  METHOD raiseClearText()
  METHOD raiseExpectation()
  METHOD compareArray()
  METHOD compareObject()
  METHOD compareCodeblock()
  EXPORTED:
  METHOD failure()
  METHOD assert()
  METHOD assertButContinue()
  METHOD checkTrue()
  METHOD checkFalse()
  METHOD checkEqual()
  METHOD checkGreater()
  METHOD checkLesser()
  METHOD checkGreaterOrEqual
  METHOD checkLesserOrEqual
  METHOD checkSame()
  METHOD checkIntEqual()
  METHOD checkNumericEqual()
  METHOD checkStrEqual()
  METHOD checkStrNoCaseEqual()
  METHOD checkStrLeftEqual()
  METHOD checkType()
  METHOD init()
  METHOD doRun()

  INLINE METHOD CheckPoint(cMsg)
   IF(!Empty(GetEnv("CHECKPOINTS")))
     MsgBox(cMsg,"CheckPoint message, hit any key to continue")
   ENDIF
  RETURN

  // legacy
  INLINE METHOD Trace(cMsg)
    ::log(cMsg, "TRACE" )
  RETURN

  // legacy
  INLINE METHOD TracePoint(cMsg)
    ::log(cMsg, "TRACE" )
  RETURN

  INLINE METHOD Log(cMsg, cLevel)
      IF(ValType(cMsg)!="C")
        cMsg := Var2char(cMsg)
      ENDIF
      IF(Empty(cLevel))
        cLevel := "INFO"
      ENDIF
      ::_Listener:Verbose( LogDate( DATE() )+" "+LogTime()+" " + cLevel + " ["+Lower(AppName())+"] " +cMsg)
  RETURN

  INLINE METHOD cleanUp()
    DbCloseAll()
  RETURN(NIL)

  INLINE METHOD Run()
    LOCAL n, oE
    LOCAL bOldEH
    LOCAL lRun
    LOCAL aCalculatedCases
    LOCAL cStage := "n/a"
    LOCAL sPassed
    LOCAL nMS, nMSS

    // always config to have at least the methods for testing
    ::config()

    // check if there is at least on test we should execute
    lRun := .F.
    FOR n:=1 TO Len(::_Cases)
      IF(::_Flags:isTestAllowed( ::_Cases[n] ))
        lRun := .T.
        EXIT
      ENDIF
    NEXT n

    IF(!lRun)
      RETURN
    ENDIF

    /* preserve calculated test cases and see of setup does configure specific ones
     * if not we will use calcualted cases as a backup otherwise we overwrite it
     */
    aCalculatedCases := ::_Cases
    ::_Cases := {}

    bOldEH := ErrorBlock( {|oE|XppUnitTestErrorHandler(oE), _Break(oE)} )
    BEGIN SEQUENCE
      cStage := "setup"

      ::setup()
      IF(Empty(::_Cases))
        ::_Cases := aCalculatedCases
      ENDIF

      FOR n:=1 TO Len(::_Cases)

        cStage := ::_Cases[n]
        IF( !::_Flags:isTestAllowed( ::_Cases[n] ))
          LOOP
        ENDIF

  // skip to be ignored test
#define IGN_TOKEN "ignore"
        IF(Left(Lower(::_Cases[n]),Len(IGN_TOKEN))==IGN_TOKEN)
          ::Log("  "+::_Cases[n], "IGNORE" )
          LOOP
        ENDIF

        oE      := NIL
        nMSS    := MicroSeconds()
        sPassed := ::doRun( ::_Cases[n], @oE )
        nMS := MicroSeconds() - nMSS
        nMS := nMS / 1000

        IF(sPassed=="pass")
          ::Log("  "+::_Cases[n] + " ("+AllTRim(Str( nMS,10,3 ))+"ms)", "PASS" )
        ELSEIF(sPassed=="fail")
          ::Log("  "+::_Cases[n], "FAIL" )
          ::_Listener:flushMessages()
        ELSEIF(sPassed=="error")
          ::Log("  "+::_Cases[n], "ERROR" )
          ::processRuntimeError(oE, cStage)
          ::_Listener:setFatal()
        ENDIF
        ::cleanUp()

      NEXT n

    RECOVER USING oE
      ErrorBlock( bOldEH )
      IF(oE:DESCRIPTION!="test-abort")
        sPassed := "error"
      ENDIF
     ::_Listener:endTest(.T.)
    END SEQUENCE
    ErrorBlock( bOldEH )


    cStage := "teardown"
    ::teardown()

  RETURN

  INLINE METHOD AddCase(cMethod,cCategory)
    ::_AddCase(cMethod,cCategory)
    Measure():addTest()
  RETURN

  INLINE METHOD _DelCase(cMethod)
    LOCAL nP
    nP  := AScan(::_Cases,{|x|Lower(x)==Lower(cMethod)})
    IF(nP!=0)
      ARemove(::_Cases,nP)
      RETURN(.T.)
    ENDIF
  RETURN(.F.)

  INLINE METHOD _AddCase(cMethod,cCategory)
    LOCAL nP

    // default category
    IF(ValType(cCategory)!="C")
      cCategory := ""
    ENDIF

    // entry exists overwrite cat
    nP := AScan(::_Cases,{|x|Lower(x)==Lower(cMethod)})
    IF(nP!=0)
      ::_Categories[nP] := cCategory
      RETURN(.F.)
    ENDIF

    // add entry
    AAdd(::_Cases,cMethod)
    AAdd(::_Categories,AllTrim(cCategory))
  RETURN(.T.)

  INLINE METHOD AddCasesByReflection()
    LOCAL aMethods
    LOCAL n
    aMethods := ::classDescribe( CLASS_DESCR_METHODS )
    FOR n:= 1 TO Len(aMethods)
      IF(aMethods[n][CLASS_METHOD_ATTR]!=CLASS_EXPORTED)
        LOOP
      ENDIF
      IF(Lower(Left(aMethods[n][CLASS_METHOD_NAME],4))=="test")
        ::_AddCase( aMethods[n][CLASS_METHOD_NAME] )
        Measure():addTest()
      ENDIF
      IF(Lower(Left(aMethods[n][CLASS_METHOD_NAME],6))=="ignore")
        ::_AddCase( aMethods[n][CLASS_METHOD_NAME] )
        Measure():addTest()
        Measure():addIgnore()
      ENDIF
    NEXT n
  RETURN

  INLINE METHOD config()
    ::AddCasesByReflection()
  RETURN

  INLINE METHOD Setup()
    ::_Started := MilliSeconds()
    ::Log("BEGIN-GROUP "+::ClassName())
  RETURN

  INLINE METHOD TearDown()
    LOCAL nElapsed, cElapsed
    ::_Finished := MilliSeconds()
    IF(Len(::_FailedTests)>0)
      ::Log("## A total of "+AllTrim(Str(Len(::_FailedTests)))+" assertions failed")
      ::Log("##         in "+AllTrim(Str(Len(::_FailedEntity)))+" test entities!")
    ENDIF
    nElapsed :=  ::_Finished-::_Started
    IF(nElapsed<1)
      cElapsed := "<1ms"
    ELSE
      cElapsed := AllTrim(Str(nElapsed,,0))+"ms"
    ENDIF
    ::Log( "END-GROUP "+::ClassName()+" ("+cElapsed+")" )
  RETURN

  /*
   * timer support maybe we move that out top a helper class
   */
  INLINE METHOD StartTimer(cName,xValue)
    ::_TimerStart := MilliSeconds()
    IF(PCount()>1)
      cName += " cargo["+Var2Char(xValue)+"]"
    ENDIF
    ::_Timer      := { { ::_TimerStart , cName } }
  RETURN

  INLINE METHOD AssertTimeFrame(nMax, cMsg)
    LOCAL nCurrent := MilliSeconds()
    ::Assert( (nCurrent - ATail(::_Timer)[1]) < nMax, cMsg )
  RETURN

  INLINE METHOD AssertTimeTotal(nMax, cMsg)
    LOCAL nCurrent := MilliSeconds()
    ::Assert( (nCurrent - ::_TimerStart) < nMax, cMsg )
  RETURN

  INLINE METHOD BookmarkTimer(cComment,xValue)
    LOCAL nCurrent := MilliSeconds()
    IF(PCount()>1)
      cComment += " cargo["+Var2Char(xValue)+"]"
    ENDIF
    AAdd( ::_Timer, { nCurrent , cComment } )
  RETURN

  INLINE METHOD EndTimer()
    // $TODO dump timer details
    AEVal( ::_Timer, {|a|::Log( Var2Char(a[1])+":"+a[2])} )
    ::_Timer := {}
  RETURN

ENDCLASS

METHOD GenericTestGroup:Init(oListener, oFlags)
  ::_Cases       := {}
  ::_Categories  := {}
  ::_FailedTests := {}
  ::_FailedEntity:= {}
  ::_Listener    := oListener
  ::_Flags       := oFlags
RETURN


METHOD GenericTestGroup:doRun(cMessage, oE)
  LOCAL bOldEH
  LOCAL sStatus
  LOCAL nErrCnt

  sStatus := "fail"
  bOldEH := ErrorBlock( {|oErr|XppUnitTestErrorHandler(oErr), _Break(oErr)} )
  BEGIN SEQUENCE
    ::_Listener:startTest()
    nErrCnt := Measure():failed
    SELF:&(cMessage)()
    ::_Listener:endTest(.F.)
    IF(nErrCnt==Measure():failed)
      sStatus := "pass"
      ::_Listener:endTest(.F.)
    ELSE
      sStatus := "fail"
      ::_Listener:endTest(.T.)
    ENDIF
  RECOVER USING oE
    ErrorBlock( bOldEH )
    IF(oE:DESCRIPTION!="test-abort")
      sStatus := "error"
    ENDIF
    ::_Listener:endTest(.T.)
  END SEQUENCE
  ErrorBlock( bOldEH )

RETURN(sStatus)

/*
 * assert helpers
 */
#define CALLSTACK_POS (2)
METHOD GenericTestGroup:processRuntimeError(oE, cStage)
   ::_Listener:output(" Failure at:"+oE:cargo:entity+":"+AllTrim(Var2Char(oE:cargo:line))+" Stage("+AllTrim(Upper(cStage))+") Thread("+AllTrim(Str(ThreadId(),,0))+")")
   ::_Listener:output("  Operation:"+oE:operation )
   ::_Listener:output("Description:"+oE:description )
   ::_Listener:output("  SubSystem:"+oE:subSystem )
   ::_Listener:output("   OS Error:"+Var2Char(oE:osCode) )
RETURN(SELF)

METHOD GenericTestGroup:raiseClearText(cMsg, xExp )
   Measure():addFailure()
   ::_Listener:postMessage("Failure at:"+ProcName(CALLSTACK_POS)+":"+Var2Char(ProcLine(CALLSTACK_POS))+" Thread("+AllTrim(Str(ThreadId(),,0))+")")
   ::_Listener:postMessage("   Message:"+cMsg )
   IF(PCount()>1)
     ::_Listener:postMessage("Expression:"+Var2Char(xExp) )
   ENDIF
   ULError():RaiseCleartext("test-abort")
RETURN(SELF)

METHOD GenericTestGroup:raiseExpectation(xExpected,xResult, cMsg)
   Measure():addFailure()
   IF(ValType(cMsg)=="C")
   ::_Listener:postMessage("   Message: "+cMsg )
   ENDIF
   ::_Listener:postMessage("Failure at:"+ProcName(CALLSTACK_POS)+":"+Var2Char(ProcLine(CALLSTACK_POS))+" Thread("+AllTrim(Str(ThreadId(),,0))+")")
   ::_Listener:postMessage(" excpected:"+Var2Char(xExpected) + IIF( cMsg!=NIL , " " + Var2Char(cMsg) , "" ) )
   ::_Listener:postMessage("   but was:"+Var2Char(xResult))
   ULError():RaiseCleartext("test-abort")
RETURN(SELF)

METHOD GenericTestGroup:compareArray(a1, a2)
  LOCAL n
  IF(Len(a1)!=Len(a2))
    RETURN(.F.)
  ENDIF
  FOR n:=1 TO Len(a1)
    IF(!::checkEqual(a1[n], a2[n]) )
      RETURN(.F.)
    ENDIF
  NEXT n
RETURN(.T.)

METHOD GenericTestGroup:compareObject(o1,o2)
  LOCAL n
  IF(Len(o1)!=Len(o2))
    RETURN(.F.)
  ENDIF
  FOR n:=1 TO Len(o1)
    IF( !::checkEqual(o1[n], o2[n]))
      RETURN(.F.)
    ENDIF
  NEXT n
RETURN(.T.)

METHOD GenericTestGroup:compareCodeblock(cb1,cb2)
  LOCAL c1,c2
  c1 := Var2Char(cb1)
  c2 := Var2Char(cb2)
RETURN(c1==c2)

METHOD GenericTestGroup:failure(cMsg)
  ::raiseClearText( cMsg )
RETURN

/*
 * asserts/checks
 */
METHOD GenericTestGroup:assert(lExp,cExp, cMsg)
   LOCAL n, aPara:={}
   Measure():addCheck()
   IF(ValType(lExp)!="L")
     ::raiseClearText("no logical result for expression:", cExp )
   ENDIF

   IF(!lExp)
     FOR n:=4 TO PCount()
       AAdd(aPara,PValue(n))
     NEXT n
     cMsg := StrFormatA( cMsg, aPara )
     ::raiseExpectation(.T., lExp, cMsg )
   ENDIF
RETURN

#undef  CALLSTACK_POS
#define CALLSTACK_POS 1
METHOD GenericTestGroup:assertButContinue(lExp,cExp, cMsg)
   LOCAL n, aPara:={}
   Measure():addCheck()

   IF(ValType(lExp)!="L")
     Measure():addFailure()
     ::_Listener:postMessage("Assert hit:"+ProcName(CALLSTACK_POS)+":"+Var2Char(ProcLine(CALLSTACK_POS))+" Thread("+AllTrim(Str(ThreadId(),,0))+")")
     ::_Listener:postMessage("Expression:"+Var2Char(cExp) )
     ::_Listener:postMessage("   Message:"+Var2Char(cMsg) )
     RETURN(.F.)
   ENDIF

   IF(!lExp)
     FOR n:=4 TO PCount()
       AAdd(aPara,PValue(n))
     NEXT n
     cMsg := StrFormatA( cMsg, aPara )
     Measure():addFailure()
     ::_Listener:postMessage("Assert hit:"+ProcName(CALLSTACK_POS)+":"+Var2Char(ProcLine(CALLSTACK_POS))+" Thread("+AllTrim(Str(ThreadId(),,0))+")")
     ::_Listener:postMessage("Expression:"+Var2Char(cExp) )
     ::_Listener:postMessage("   Message:"+Var2Char(cMsg) )
     RETURN(.F.)
   ENDIF
RETURN(lExp)

METHOD GenericTestGroup:checkTrue( lExp, cExp )
   Measure():addCheck()
   IF(ValType(lExp)!="L")
     ::raiseClearText("not a logical expression result", cExp )
   ENDIF

   IF(!lExp)
     ::raiseExpectation(.T., lExp )
   ENDIF
RETURN

METHOD GenericTestGroup:checkFalse( lExp, cExp )
   Measure():addCheck()
   IF(ValType(lExp)!="L")
     ::raiseClearText("not a logical expression result", cExp )
   ENDIF

   IF(lExp)
     ::raiseExpectation(.T., lExp )
   ENDIF
RETURN

METHOD GenericTestGroup:checkEqual(xExp1,xExp2)
  LOCAL cVT
  Measure():addCheck()
  cVT := ValType(xExp1)+ValType(xExp2)
  IF(cVT[1]!=cVT[2] .AND. cVT!="CM" .AND. cVT!="MC")
     ::raiseExpectation(Var2Char(ValType(xExp1)), Var2Char(ValType(xExp2)), "not equal, different types" )
  ENDIF

  IF(ValType(xExp1)=="A")
     IF(!::compareArray(xExp1,xExp2))
       ::raiseExpectation(xExp1, xExp2, "arrays have different content" )
     ENDIF
     RETURN(.T.)
  ENDIF
  IF(ValType(xExp1)=="O")
     IF(!::compareObject(xExp1,xExp2))
       ::raiseExpectation(xExp1, xExp2, "objects are different in state" )
     ENDIF
     RETURN(.T.)
  ENDIF
  IF(ValType(xExp1)=="B" .AND. !::compareCodeblock(xExp1,xExp2))
     ::raiseExpectation(xExp1, xExp2, "objects are different in state" )
  ENDIF

  IF(!(xExp1==xExp2))
     ::raiseExpectation(xExp1, xExp2 )
  ENDIF
RETURN(.T.)

METHOD GenericTestGroup:checkGreater(xExp1,xExp2)
  LOCAL cVT
  Measure():addCheck()
  cVT := ValType(xExp1)+ValType(xExp2)
  IF(cVT[1]!=cVT[2] .AND. cVT!="CM" .AND. cVT!="MC")
     ::raiseExpectation(Var2Char(ValType(xExp1)), Var2Char(ValType(xExp2)), "greater not possible, different types" )
  ENDIF

  IF(ValType(xExp1)=="A" .OR. ValType(xExp1)=="O" .OR. ValType(xExp1)=="B")
     ::raiseExpectation(xExp1, xExp2, "Type not supported for operation greater" )
  ENDIF

  IF(!(xExp1>xExp2))
     ::raiseExpectation( "> "+Var2Char(xExp2), xExp1 )
  ENDIF
RETURN

METHOD GenericTestGroup:checkLesser(xExp1,xExp2)
  LOCAL cVT
  Measure():addCheck()
  cVT := ValType(xExp1)+ValType(xExp2)
  IF(cVT[1]!=cVT[2] .AND. cVT!="CM" .AND. cVT!="MC")
     ::raiseExpectation(Var2Char(ValType(xExp1)), Var2Char(ValType(xExp2)), "lesser not possible, different types" )
  ENDIF

  IF(ValType(xExp1)=="A" .OR. ValType(xExp1)=="O" .OR. ValType(xExp1)=="B")
     ::raiseExpectation(xExp1, xExp2, "Type not supported for operation lesser" )
  ENDIF

  IF(!(xExp1<xExp2))
     ::raiseExpectation( "< "+Var2Char(xExp2), xExp1 )
  ENDIF
RETURN

METHOD GenericTestGroup:checkGreaterOrEqual(xExp1,xExp2)
  LOCAL cVT
  Measure():addCheck()
  cVT := ValType(xExp1)+ValType(xExp2)
  IF(cVT[1]!=cVT[2] .AND. cVT!="CM" .AND. cVT!="MC")
     ::raiseExpectation(Var2Char(ValType(xExp1)), Var2Char(ValType(xExp2)), "operation not possible, different types" )
  ENDIF

  IF(ValType(xExp1)=="A" .OR. ValType(xExp1)=="O" .OR. ValType(xExp1)=="B")
     ::raiseExpectation(xExp1, xExp2, "Type not supported for operation greater or equal" )
  ENDIF

  IF(!(xExp1>=xExp2))
     ::raiseExpectation(xExp2, xExp1, ">=" )
  ENDIF
RETURN

METHOD GenericTestGroup:checkLesserOrEqual(xExp1,xExp2)
  LOCAL cVT
  Measure():addCheck()
  cVT := ValType(xExp1)+ValType(xExp2)
  IF(cVT[1]!=cVT[2] .AND. cVT!="CM" .AND. cVT!="MC")
     ::raiseExpectation(Var2Char(ValType(xExp1)), Var2Char(ValType(xExp2)), "operation not possible, different types" )
  ENDIF

  IF(ValType(xExp1)=="A" .OR. ValType(xExp1)=="O" .OR. ValType(xExp1)=="B")
     ::raiseExpectation(xExp1, xExp2, "Type not supported for operation lesser or equal" )
  ENDIF

  IF(!(xExp1<=xExp2))
     ::raiseExpectation(xExp2, xExp1, "<=" )
  ENDIF
RETURN


METHOD GenericTestGroup:checkSame(xExp1,xExp2)
  Measure():addCheck()
  IF(ValType(xExp1)!="A" .AND. ValType(xExp2)!="O")
     ::raiseClearText("only array or objects type is allowed" )
  ENDIF
  IF(ValType(xExp1)!=ValType(xExp2))
     ::raiseExpectation(Var2Char(ValType(xExp1)), Var2Char(ValType(xExp2)), "not equal, different types" )
  ENDIF
  IF(!(xExp1==xExp2))
     ::raiseExpectation(xExp1, xExp2 )
  ENDIF
RETURN


METHOD GenericTestGroup:checkIntEqual(nExp1,nExp2)
  Measure():addCheck()
  IF(ValType(nExp1)!="N" .OR. ValType(nExp2)!="N")
     ::raiseClearText("only numeric type is allowed" )
  ENDIF
  IF(!(Int(nExp1)==Int(nExp2)))
     ::raiseExpectation(nExp1, nExp2 )
  ENDIF
RETURN

METHOD GenericTestGroup:checkNumericEqual(nExp1,nExp2, nDec)
  Measure():addCheck()
  IF(ValType(nExp1)!="N" .OR. ValType(nExp2)!="N")
     ::raiseClearText("only numeric type is allowed" )
  ENDIF
  IF(ValType(nDec)!="N")
    nDec := 4
  ENDIF

  nExp1 := Round(nExp1,nDec)
  nExp2 := Round(nExp2,nDec)
  IF(!(nExp1==nExp2))
     ::raiseExpectation(nExp1, nExp2 )
  ENDIF
RETURN


METHOD GenericTestGroup:checkStrEqual(cExp1,cExp2)
  Measure():addCheck()
  IF( (ValType(cExp1)!="C" .AND. ValType(cExp1)!="M") .OR.;
      (ValType(cExp2)!="C" .AND. ValType(cExp2)!="M") )
     ::raiseClearText("only char/memo type is allowed" )
  ENDIF
  IF(!(cExp1==cExp2))
     ::raiseExpectation( cExp1, cExp2 )
  ENDIF
RETURN

METHOD GenericTestGroup:checkStrNoCaseEqual(cExp1,cExp2)
  Measure():addCheck()
  IF( (ValType(cExp1)!="C" .AND. ValType(cExp1)!="M") .OR.;
      (ValType(cExp2)!="C" .AND. ValType(cExp2)!="M") )
     ::raiseClearText("only char/memo type is allowed" )
  ENDIF
  cExp1 := Lower(cExp1)
  cExp2 := Lower(cExp2)
  IF(!(cExp1==cExp2))
     ::raiseExpectation( cExp1, cExp2 )
  ENDIF
RETURN

METHOD GenericTestGroup:checkStrLeftEqual(cExp1,cExp2,nCount)
  Measure():addCheck()
  IF( (ValType(cExp1)!="C" .AND. ValType(cExp1)!="M") .OR.;
      (ValType(cExp2)!="C" .AND. ValType(cExp2)!="M") )
     ::raiseClearText("only char/memo type is allowed" )
  ENDIF
  IF(ValTyp(nCount)!="N")
    nCount := Len( cExp1 )
  ENDIF
  cExp1 := Left(cExp1,nCount)
  cExp2 := Left(cExp2,nCount)
  IF(!(cExp1==cExp2))
     ::raiseExpectation( cExp1, cExp2 )
  ENDIF
RETURN

METHOD GenericTestGroup:checkType(xExp, cType, cText)
  Measure():addCheck()
  IF(ValType(xExp)!=cType)
     ::raiseClearText("expected "+cText+" type but actual type is ("+ValType(xExp)+")")
  ENDIF
RETURN
