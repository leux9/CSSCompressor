/**
 * 
 * Font Weight Conversion
 * 
 * @author: Corey Hart <http://www.codenothing.com>
 * @description: Converts font weight strings to their numeric counterparts
 * 
 * @before:
 *     .example {
 *         font-weight: normal;
 *     }
 * 
 * @after:
 *     .example {
 *         font-weight: 400;
 *     }
 * 
 */

var CSSCompressor = global.CSSCompressor,
	rfontweightprop = /^font-weight|font$/,
	table = CSSCompressor.tables[ 'Font Weight Conversion' ] = {
		normal: '400',
		bold: '700'
	};

CSSCompressor.rule({

	name: 'Font Weight Conversion',
	type: CSSCompressor.RULE_TYPE_RULE,
	group: 'Font',
	description: "Converts font weight strings to their numeric counterparts",

	callback: function( rule, branch, compressor ) {
		if ( ! rfontweightprop.exec( rule.property ) || ! rule.parts || ! rule.parts.length ) {
			return;
		}

		rule.parts.forEach(function( part, index ) {
			if ( table[ part.toLowerCase() ] ) {
				rule.parts[ index ] = table[ part.toLowerCase() ];

				compressor.log(
					"Compressing font weight property '" + part + "' => '" + rule.parts[ index ] + "'",
					rule.position
				);
			}
		});
	}

});
