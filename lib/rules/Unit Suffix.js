/**
 * 
 * Unit Suffix
 * 
 * @author: Corey Hart <http://www.codenothing.com>
 * @description: Removes unecessary suffix from zero unit values
 * 
 * @before:
 *     .example {
 *         margin: 0px;
 *     }
 * 
 * @after:
 *     .example {
 *         margin: 0;
 *     }
 * 
 */

var CSSCompressor = global.CSSCompressor,
	runit = /^(\+|\-)?0(\%|[a-z]{2})$/i;

CSSCompressor.rule({

	name: 'Unit Suffix',
	type: CSSCompressor.RULE_TYPE_VALUE,
	group: 'Numeric',
	description: "Removes unecessary suffix from zero unit values",

	callback: function( value, position, compressor ) {
		var m = runit.exec( value );

		if ( m ) {
			compressor.log(
				"Removing unecesary trailing zeroes '" + value + "' => '0'",
				position
			);

			return '0';
		}
	}

});
