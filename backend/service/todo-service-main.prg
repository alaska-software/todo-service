//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Implements todo service main entry point
/// </summary>
///
///
/// <remarks>
/// </remarks>
///
///
/// <copyright>
/// Copyright Alaska Software 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////
#include "Common.ch"

PROCEDURE Main
  LOCAL n
  LOCAL oCmd, oGrp
  LOCAL aParameters
  LOCAL cServiceName

  SET CHARSET TO ANSI

  aParameters := Array( PCount() )
  FOR n:=1 TO PCount()
    aParameters[n]:=PValue(n)
  NEXT n

  XppRtFileLogger():startup()

  cServiceName := ConfigManager():Application:Service:Name

  // service control option setup
  oCmd := ArgumentProcessor():addCommand("service")
  oCmd:addOption("status","service status details",{||WscAdapter():status( cServiceName )} )
  oCmd:addOption("user:","user account under which service runs",{|cUser|WscAdapter():setUser( cUser )},100)
  oCmd:addOption("password:","password of user account",{|cPwd|WscAdapter():setPassword( cPwd )},100)

  oGrp := oCmd:addGroup("action")
  oGrp:addOption("start","start service",{||WscAdapter():start(cServiceName)})
  oGrp:addOption("stop","stop service",{||WscAdapter():stop(cServiceName)})
  oGrp:addOption("install","install service",{||WscAdapter():install( cServiceName )})
  oGrp:addOption("uninstall","uninstall service",{||WscAdapter():uninstall( cServiceName )})

  // recover manager options setup
  oCmd := ArgumentProcessor():addCommand("rm")
  oCmd:addOption("reset","reset state",{||RMAdapter():reset( TodoService() )} )
  oCmd:addOption("recover","run recovery only",{||RMAdapter():recovery( TodoService())} )

  // primary usage options
  oGrp := ArgumentProcessor():addGroup("run")
  oGrp:addOption("exe","run as console process",{||TodoService():runAsConsoleProcess()})
  oGrp:addOption("svc","run service process",{||TodoService():runAsServiceProcess()})
  IF !TodoService():startup(aParameters)
    RETURN
  ENDIF

  ArgumentProcessor():process( aParameters )

  IF !TodoService():shutdown()
    RETURN
  ENDIF

RETURN


PROCEDURE AppSys
RETURN

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




