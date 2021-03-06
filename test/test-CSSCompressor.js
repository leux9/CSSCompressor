munit( 'CSSCompressor', { priority: 1.0 }, {

	// Add basic existance tests to ensure api stays consistent through versions
	// THESE TESTS CANNOT CHANGE (without heavy consideration)
	init: function( assert ) {
		var compressor = new CSSCompressor();

		assert.isObject( 'settings', compressor.settings );
		assert.isObject( 'stats', compressor.stats );
		assert.isFunction( 'log', compressor.log );
		assert.isFunction( 'compress', compressor.compress );
		assert.isFunction( 'value', compressor.value );
	},

	// Same concept, make sure sub objects stay consistent through versions
	// THESE TESTS CANNOT CHANGE (without heavy consideration)
	'static': function( assert ) {
		assert.isFunction( 'compress', CSSCompressor.compress );
		assert.isFunction( 'Settings', CSSCompressor.Settings );
		assert.isFunction( 'Stats', CSSCompressor.Stats );
		assert.isObject( 'Tables', CSSCompressor.tables );

		// Priority Levels
		assert.isNumber( 'Priority Highest', CSSCompressor.PRIORITY_HIGHEST );
		assert.isNumber( 'Priority Higher', CSSCompressor.PRIORITY_HIGHER );
		assert.isNumber( 'Priority High', CSSCompressor.PRIORITY_HIGH );
		assert.isNumber( 'Priority Default', CSSCompressor.PRIORITY_DEFAULT );
		assert.isNumber( 'Priority Low', CSSCompressor.PRIORITY_LOW );
		assert.isNumber( 'Priority Lower', CSSCompressor.PRIORITY_LOWER );
		assert.isNumber( 'Priority Lowest', CSSCompressor.PRIORITY_LOWEST );
	},

	// Logging
	log: function( assert ) {
		var compressor = new CSSCompressor(), position = new CSSTree.Position( 24 ), match;

		// Basic existance tests
		assert.exists( "For testing, ensure _logs exists", compressor._logs );
		assert.exists( "For testing, ensure _keys exists", compressor._keys );
		assert.deepEqual( "Empty Log Start", compressor.log(), [] );

		// Pure Message
		match = {
			key: 'Test',
			message: 'Just a message',
			positions: []
		};
		compressor._logs = [];
		compressor._keys = [ 'Test' ];
		compressor.log( "Just a message" );
		assert.deepEqual( "Pure Message Passing", compressor.log(), [ match ] );

		// Key & Message
		match = {
			key: 'Test2',
			message: 'Just a message',
			positions: []
		};
		compressor._logs = [];
		compressor.log( "Test2", "Just a message" );
		assert.deepEqual( "Key & Message Passing", compressor.log(), [ match ] );

		// Key, Message & Position
		match = {
			key: 'Test3',
			message: 'Just a message',
			positions: [ position ]
		};
		compressor._logs = [];
		compressor.log( "Test3", "Just a message", position );
		assert.deepEqual( "Key, Message & Position Passing", compressor.log(), [ match ] );

		// Message & Position
		match = {
			key: 'Test4',
			message: 'Just a message',
			positions: [ position ]
		};
		compressor._logs = [];
		compressor._keys = [ 'Test4' ];
		compressor.log( "Just a message", position );
		assert.deepEqual( "Message & Position Passing", compressor.log(), [ match ] );
	},

	// Static compression access
	compress: function( assert ) {
		var compressor = new CSSCompressor( CSSCompressor.MODE_NONE );

		compressor.settings.update({ format: CSSCompressor.FORMAT_NONE });
		compressor.compress( "#a{color:black}" );
		assert.equal( 'No Compression', compressor.css, "#a{color:black}" );

		compressor.settings.update({ "Color to Hex": true, "Shrink Hex": true });
		compressor.compress();
		assert.equal( 'Compression Success', compressor.css, "#a{color:#000}" );
	},

});
