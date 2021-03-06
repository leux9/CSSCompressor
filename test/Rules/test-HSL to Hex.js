munit( 'Rule Compression.HSL to Hex', function( assert ) {
	var rule = CSSCompressor.rule[ 'HSL to Hex' ].callback;

	testRule( assert, 'HSL to Hex', [

		{
			name: 'Basic',
			actual: 'hsl(312,54%,68%)',
			expected: '#d981c8'
		},

		{
			name: 'Basic Spacing',
			actual: 'hsl( 116, 34%, 43% )',
			expected: '#4d9348'
		},

		{
			name: 'No Saturation',
			actual: 'hsl( 116, 0%, 43% )',
			expected: '#6e6e6e'
		},

		{
			name: 'Invalid Hue',
			actual: 'hsl( 416, 15%, 43% )',
			expected: undefined
		},

		{
			name: 'Invalid Saturation',
			actual: 'hsl( 116, 105%, 43% )',
			expected: undefined
		},

		{
			name: 'Invalid Lightness',
			actual: 'hsl( 116, 10%, 435% )',
			expected: undefined
		}

	]);
});
