//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Implements the todo item priorities dictionary. Provides priority level
/// definitions as reference data for REST API responses.
/// </summary>
///
///
/// <remarks>
/// Dictionaries in the REST helper context serve as lookup tables that map
/// ID tokens to human-readable values. Instead of returning just "AA" in a
/// response, the dictionary allows UI clients to display "high" to users and
/// provide proper selection options in edit mode.
/// <para/>
/// This dictionary is included in REST API envelope responses using the
/// RestHandler's :addDictionary() method, allowing UI components to render
/// dropdowns, radio buttons, and labels without hardcoding values.
/// <para/>
/// Uses lazy initialization with class variable caching for efficient
/// access across all instances.
/// </remarks>
///
///
/// <copyright>
/// Alaska Software Inc. (c) 2025. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////


CLASS TodoItemPriorities
  PROTECTED:
  CLASS VAR Dict

  EXPORTED:
  CLASS METHOD getAll()
  CLASS METHOD getById()
ENDCLASS


/// <summary>
/// Returns all priority definitions as an array of dictionary elements.
/// </summary>
/// <returns value="aDict">Array of objects with {id, name} structure</returns>
/// <remarks>
/// Used by TodoEditHandler to include priorities in the REST envelope's
/// dictionaries section. This enables UI clients to resolve priority IDs
/// to display names and render selection controls.
/// </remarks>
///
CLASS METHOD TodoItemPriorities:getAll()
  IF IsNull(::Dict)
    ::Dict := {}
    AAdd( ::Dict, newDictionaryElement( "A+", "highest" ) )
    AAdd( ::Dict, newDictionaryElement( "AA", "high" ) )
    AAdd( ::Dict, newDictionaryElement( "BB", "middle" ) )
    AAdd( ::Dict, newDictionaryElement( "CC", "low" ) )
    AAdd( ::Dict, newDictionaryElement( "C-", "lowest" ) )
  ENDIF
RETURN ::Dict


/// <summary>
/// Retrieves a specific priority definition by its ID.
/// </summary>
/// <param name="cPriority">Priority ID to lookup</param>
/// <returns value="oPriority">Priority object with {id, name}, or NIL if not found</returns>
/// <remarks>
/// Used for validation and lookup operations.
/// </remarks>
///
CLASS METHOD TodoItemPriorities:getById(cPriority)
  LOCAL nPos
  IF IsNull(::Dict)
    ::getAll()
  ENDIF
  nPos := AScan( ::Dict, {|o|o:id==cPriority})
  IF nPos==0
    RETURN NIL
  ENDIF
RETURN ::Dict[nPos]



