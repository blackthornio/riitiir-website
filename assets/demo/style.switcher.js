$( function() {
    "use strict";

	$.fn.alterClass = function ( removals, additions ) {
	
	var self = this;
	
	if ( removals.indexOf( '*' ) === -1 ) {
		// Use native jQuery methods if there is no wildcard matching
		self.removeClass( removals );
		return !additions ? self : self.addClass( additions );
	}
 
	var patt = new RegExp( '\\s' + 
			removals.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) + 
			'\\s', 'g' );
 
	self.each( function ( i, it ) {
		var cn = ' ' + it.className + ' ';
		while ( patt.test( cn ) ) {
			cn = cn.replace( patt, ' ' );
		}
		it.className = $.trim( cn );
	});
 
	return !additions ? self : self.addClass( additions );

	}

	var styleSwitcherButton = $("#style-switcher .panel-button"),
		swatchButton = $('.switcher'),
		fontSwitcher = $('#font_switcher'),
		page = $('body'),
		switchStylesheet = $('#switchable-stylesheet'),
		switchNav = $('#nav_switcher'),
		nav = $('nav');

	// Style Switcher Open/Close
	styleSwitcherButton.click(function() {
		var styleSwitcher = $("#style-switcher");
	    styleSwitcher.toggleClass("close-style-switcher", "open-style-switcher", 1000);
	    styleSwitcher.toggleClass("open-style-switcher", "close-style-switcher", 1000);
	    return false;
	});

	// Color Skins
	swatchButton.click(function() {
		var t = $(this),
	    	title = t.prop('title');
	    page.alterClass( 'solid-* pastel-* metallic-*', '' )
		page.addClass(title);
		return false;
	});

	// Change Fonts
	fontSwitcher.on('change',function() {
		page.removeClass('contemporary retro classical');
		page.addClass( fontSwitcher.val() );
	});

	// Change Navigation Color
	switchNav.on('change',function() {
		nav.removeClass('navbar-default navbar-inverse');
		nav.addClass( switchNav.val() );
	});

});