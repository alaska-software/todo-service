//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Implements the todo item states dictionary. Provides workflow state
/// definitions as reference data for REST API responses.
/// </summary>
///
///
/// <remarks>
/// Dictionaries in the REST helper context serve as lookup tables that map
/// ID tokens to human-readable values. Instead of returning just "IP" in a
/// response, the dictionary allows UI clients to display "In Progress" to
/// users and provide proper selection options in edit mode.
/// <para/>
/// This dictionary is included in REST API envelope responses using the
/// RestHandler's :addDictionary() method, allowing UI components to render
/// state selectors, status badges, and workflow controls without hardcoding
/// values.
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

CLASS TodoItemStates
  PROTECTED:
  CLASS VAR Dict

  EXPORTED:
  CLASS METHOD getAll()
  CLASS METHOD getById()
ENDCLASS


/// <summary>
/// Returns all state definitions as an array of dictionary elements.
/// </summary>
/// <returns value="aDict">Array of objects with {id, name} structure</returns>
/// <remarks>
/// Used by TodoEditHandler to include states in the REST envelope's
/// dictionaries section. This enables UI clients to resolve state IDs
/// to display names and render selection controls.
/// </remarks>
///
CLASS METHOD TodoItemStates:getAll()
  IF IsNull(::Dict)
    ::Dict := {}
    AAdd( ::Dict, newDictionaryElement( "NE", "New" ) )
    AAdd( ::Dict, newDictionaryElement( "PE", "Pending" ) )
    AAdd( ::Dict, newDictionaryElement( "IP", "In Progress" ) )
    AAdd( ::Dict, newDictionaryElement( "DO", "Done" ) )
  ENDIF
RETURN ::Dict


/// <summary>
/// Retrieves a specific state definition by its ID.
/// </summary>
/// <param name="cState">State ID to lookup</param>
/// <returns value="oState">State object with {id, name}, or NIL if not found</returns>
/// <remarks>
/// Used for validation and lookup operations.
/// </remarks>
///
CLASS METHOD TodoItemStates:getById(cState)
  LOCAL nPos
  IF IsNull(::Dict)
    ::getAll()
  ENDIF
  nPos := AScan( ::Dict, {|o|o:id==cState})
  IF nPos==0
    RETURN NIL
  ENDIF
RETURN ::Dict[nPos]


