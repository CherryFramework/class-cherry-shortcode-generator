/**
 * Shortcode generator
 */
( function( $ ) {
	'use strict';

	function genereateShortcode( target ) {

		var mask               = target.data( 'input_mask' ),
			shortcode          = target.data( 'shortcode' ),
			sType              = target.data( 'type' ),
			attName,
			val,
			result;

		result = '[' + shortcode;

		$( '*[id^=' + mask + ']', target ).each( function() {

			val     = $(this).val();
			attName = $( this ).attr( 'name' );
			attName = attName.replace( /\[\]/g, '' );

			console.log( attName );
			console.log( val );

			if ( null !== val ) {
				result += ' ' + attName + '="' + val + '"';
			}

		});

		result += ']';

		if ( 'single' !== sType ) {
			result += '[/' + shortcode + ']'
		}

		return result;
	}

	$( window ).load( function() {
		$('.cherry-sg-open').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#name',
			callbacks: {
				open: function() {

					var shortcode,
						resultShortcode = $( '#generated-shortcode', this.content ),
						target          = this.content;

					// Init UI elements
					$( window ).trigger( 'cherry-ui-elements-init', { 'target': target } );
					shortcode = genereateShortcode( this.content );

					resultShortcode.val( shortcode );

					this.content.on( 'change blur', function() {
						shortcode = genereateShortcode( target );
						resultShortcode.val( shortcode );
					});

					this.content.on( 'click', '.cherry-switcher-wrap', function() {
						shortcode = genereateShortcode( target );
						resultShortcode.val( shortcode );
					});

				}
			}
		});

	});

}( jQuery ) );
