//////////////////////////////////////////////////////////////////////
///
/// <summary>
/// Implements commands for Xbase++ unit testing
/// </summary>
///
///
/// <remarks>
/// These macros are only working if used inside a method implementation
/// derived from the GenericTestGroup class of the Xbase++ unit testing
/// framework.
/// </remarks>
///
///
/// <copyright>
/// Alaska Software, (c) 2016-2017. All rights reserved.
/// </copyright>
///
//////////////////////////////////////////////////////////////////////

#ifndef _UNIT_TEST_CH
#define _UNIT_TEST_CH

// boolean result testing
#command CHECK_TRUE( <foo1> )    =>  ::checkTrue( <foo1>, #<foo1> )
#command CHECK_FALSE( <foo1> )   =>  ::checkFalse( <foo1>, #<foo1> )

// generic value comparison (arrays, objects and codeblocks are by content)
#command CHECK_EQUAL( <expected>, <actual> ) => ::checkEqual( <expected>, <actual> )

// relational comparison only for char, date, numeric
#command CHECK_GREATER( <value>, <reference> ) => ::checkGreater( <value>, <reference> )
#command CHECK_LESSER( <value>, <reference> ) => ::checkLesser( <value>, <reference> )
#command CHECK_GREATER_OR_EQUAL( <calculated>, <reference> ) => ::checkGreaterOrEqual( <calculated>, <reference> )
#command CHECK_LESSER_OR_EQUAL( <calculated>, <reference> ) => ::checkLesserOrEqual( <calculated>, <reference> )

// same array, objects ort codeblock
#command CHECK_SAME( <expected>, <actual> )  => ::checkSame(  <expected>, <actual> )

// numeric helpers with proper sub-type enforcement
#command CHECK_INT_EQUAL( <expected>, <actual> )                 => ::checkIntEqual( <expected>, <actual> )
#command CHECK_NUMERIC_EQUAL( <expected>, <actual>, <decimals> ) => ::checkNumericEqual( <expected>, <actual>, <decimals> )

// specialized string comparison
#command CHECK_STR_EQUAL( <expected>, <actual> ) => ::checkStrEqual( <expected>, <actual> )
#command CHECK_STR_NOCASE_EQUAL( <expected>, <actual> ) => ::checkStrNoCaseEqual( <expected>, <actual> )
#command CHECK_STR_LEFT_EQUAL(<expected>, <actual>[, <len>] ) => ::checkStrLeftEqual( <expected>, <actual>, <len> )

// val-type testing
#command CHECK_LOGICAL_TYPE(<exp>)   => ::checkType( <exp>, "L", "logical" )
#command CHECK_CHAR_TYPE(<exp>)      => ::checkType( <exp>, "C", "character" )
#command CHECK_DATE_TYPE(<exp>)      => ::checkType( <exp>, "D", "date" )
#command CHECK_NUMERIC_TYPE(<exp>)   => ::checkType( <exp>, "N", "numeric" )
#command CHECK_ARRAY_TYPE(<exp>)     => ::checkType( <exp>, "A", "array" )
#command CHECK_OBJECT_TYPE(<exp>)    => ::checkType( <exp>, "O", "object" )
#command CHECK_CODEBLOCK_TYPE(<exp>) => ::checkType( <exp>, "B", "codeblock" )
#command CHECK_UNDEFINED_TYPE(<exp>) => ::checkType( <exp>, "U", "undefined" )


/*
 * Auxilary helpers
 */
// raise failure with message
#command FAILURE( <msg> ) =>  ::failure( <msg> )

// log message always
#command TRACE( <msg> ) =>  ::trace( <msg> )

// log message and expression, but only if expression evaluates to true
#command CHECKPOINT( <foo1> [, <msg,...>] ) =>  ::assertButContinue( <foo1>, #<foo1>, <msg> )


/* deprecated asi internal use only
 */
#command ASSERT( <foo1> [, <msg,...>] ) =>  ::assert( <foo1>, #<foo1>, <msg> )

#endif
