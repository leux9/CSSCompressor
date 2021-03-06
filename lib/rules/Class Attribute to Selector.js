/**
 * 
 * Class Attribute to Selector
 * 
 * @author: Corey Hart <http://www.codenothing.com>
 * @description: Converts class attributes to class selectors
 * 
 * @before:
 *     [class='example'] {
 *         color: red;
 *     }
 * 
 * @after:
 *     .example {
 *         color: red;
 *     }
 * 
 */

var CSSCompressor = global.CSSCompressor,
	rclassattr = /^\[class=('|")?([a-z0-9_\- ]+)('|")?\]$/i;

CSSCompressor.rule({

	name: 'Class Attribute to Selector',
	type: CSSCompressor.RULE_TYPE_BLOCK,
	group: 'Selector',
	description: "Converts class attributes to class selectors",

	callback: function( branch, compressor ) {
		if ( ! branch.selector || ! branch.parts || ! branch.parts.length ) {
			return;
		}

		branch.parts.forEach(function( part, index ) {
			var newsubs = [], m, old, compare;

			if ( CSSCompressor.isArray( part ) ) {
				part.forEach(function( subpart ) {
					if ( ( m = rclassattr.exec( subpart ) ) ) {
						old = subpart;

						// Handle multiple classes defined
						if ( m[ 2 ].indexOf( ' ' ) > -1 ) {
							subpart = [];
							m[ 2 ].split( ' ' ).forEach(function( name ) {
								subpart.push( '.' + name );
							});
						}
						else {
							subpart = '.' + m[ 2 ];
						}

						// Logging
						compare = CSSCompressor.isArray( subpart ) ? subpart.join( '' ) : subpart;
						compressor.log(
							"Converting class attribute to selector '" + old + "' => '" + compare + "'",
							branch.position
						);
					}

					if ( CSSCompressor.isArray( subpart ) ) {
						newsubs = newsubs.concat( subpart );
					}
					else {
						newsubs.push( subpart );
					}
				});

				branch.parts[ index ] = newsubs;
			}
			else {
				if ( ( m = rclassattr.exec( part ) ) ) {
					old = part;

					// Handle multiple classes defined
					if ( m[ 2 ].indexOf( ' ' ) > -1 ) {
						part = [];
						m[ 2 ].split( ' ' ).forEach(function( name ) {
							part.push( '.' + name );
						});
					}
					else {
						part = '.' + m[ 2 ];
					}

					// Logging
					compare = CSSCompressor.isArray( part ) ? part.join( '' ) : part;
					compressor.log(
						"Converting class attribute to selector '" + old + "' => '" + compare + "'",
						branch.position
					);
				}

				branch.parts[ index ] = part;
			}
		});
	}

});
