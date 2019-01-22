// Import JS
import '../lib/barba';
import '../lib/bootstrap.bundle';
import '../lib/bootstrap.jasny';
import '../lib/modernizr';
import '../lib/retina';
import '../lib/flowtype';
import '../lib/isotope.pkgd';
import '../lib/smooth-scroll.polyfills';

// Import CSS
import '../../css/lib/bootstrap.min.css';
import '../../css/lib/bootstrap-grid.min.css';
import '../../css/lib/bootstrap-reboot.min.css';
import '../../css/lib/bootstrap.jasny.min.css';
import '../../css/lib/fontawesome.all.min.css';
import '../../css/lib/animate.min.css';
import '../../css/lib/style.min.css';
'use strict';

(function ($, window, document) {

	// Global Vars
	var menu = $('#header-container');
	var origOffsetY = menu.offset().top;
	
	// Sticky Header
	function stickyHeader() {
		function scroll() {
			if ($(window).scrollTop() <= origOffsetY) {
				$('#header-container').removeClass('sticky');
				$('.jumbotron').removeClass('menu-padding');
			} else {
				$('#header-container').addClass('sticky');
				$('.jumbotron').addClass('menu-padding');
			}
		}
		document.onscroll = scroll;
	}
	stickyHeader();
	
	// Transition Navbar
	function navbarTrans() {
		$(document).on('scroll',function(){
			if($(document).scrollTop() > 220){
				$('#trans-menu').removeClass('large').addClass('small');
				$('.trans-logo').removeClass('active').addClass('hidden');
				$('.regular-logo').removeClass('hidden').addClass('active');
			} 
			else{
				$('#trans-menu').removeClass('small').addClass('large');
				$('.trans-logo').removeClass('hidden').addClass('active');
				$('.regular-logo').removeClass('active').addClass('hidden');
			}
		});
	}
	navbarTrans();

	// Navbar Dropdown
	function navbarDropdown() {
		function is_touch_device() {
			return 'ontouchstart' in window /* Works on most browsers */ || navigator.maxTouchPoints; /* Works on IE10/11 and Surface */
		}
		if(!is_touch_device() && $('.navbar-toggle:hidden')){
			$('.dropdown-menu', this).css('margin-top',0);
			$('.dropdown').hover(function(){ 
				$('.dropdown-toggle#dropdown-main', this).trigger('click');
				// Uncomment below to make the parent item clickable.
				$('.dropdown-toggle#dropdown-main', this).toggleClass('disabled'); 
			});			
		}
		if(is_touch_device()) {
			$('<a href="#" data-toggle="dropdown" id="dropdown-arrow" aria-haspopup="true" class="dropdown-toggle visible-xs"><i class="glyphicon glyphicon-chevron-down"></i></a>').insertAfter('.dropdown-toggle#dropdown-main');
			$('.dropdown-toggle#dropdown-main', this).toggleClass('disabled');
		}
	}
	navbarDropdown();

	// Flowtype
	function flowtypeJS() {
		$('body').flowtype({
			minimum   : 320,
			maximum   : 2560,
			minFont   : 14,
			maxFont   : 72,
			fontRatio : 81
		});
	}
	flowtypeJS();

	// Height to Viewport
	function setHeight() {
		var windowHeight = $(window).innerHeight();
		var headerHeight = $('#header-container').innerHeight();
		$('.jumbotron').css('min-height', windowHeight - headerHeight);
		$('.jumbotron .slider').css('min-height', windowHeight - headerHeight);
	}
	setHeight();
	// Window Resize			
	$(window).resize(function() {
		setHeight();
	});
			
	// To Top Button
	function toTop() {
		var offset = 0;
		$(window).scroll(function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.totop').addClass('fadeIn').removeClass('fadeOut');
			} else {
				jQuery('.totop').addClass('fadeOut').removeClass('fadeIn');
			}
		});
	}
	toTop();
	
	// Facebook API
	function FacebookAPI() {
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) { return; }
			js = d.createElement(s); js.id = id;
			js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
	FacebookAPI();
	
	// Twitter API
	function twitterAPI() {
		!function(d,s,id){
			var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
			if(!d.getElementById(id)){
				js=d.createElement(s); js.id=id;
				js.src=p+'://platform.twitter.com/widgets.js';
				fjs.parentNode.insertBefore(js,fjs);
			}
		}(document,'script','twitter-wjs');
	}
	twitterAPI();
	
	// Detect External Links
	function externalLinkage() {
		$('a').click(function() {
			var href = $(this).attr('href');
			if ((href.match(/^https?\:/i)) && (!href.match(document.domain))) {
				var extLink = href.replace(/^https?\:\/\//i, '');
				return extLink;
			}
		});
	}
	externalLinkage();

	// Smooth Scroll
	var scroll = new SmoothScroll('a[href*="#"]', {
		// Selectors
		ignore: '[data-scroll-ignore]',
		header: '[data-scroll-header]',
		topOnEmptyHash: true,
		// Speed & Easing
		speed: 750,
		clip: true,
		easing: 'easeInOutCubic',
		// History
		updateURL: false,
		popstate: true,
	});

	// Start RevSlider
	function startSlider() {
		if($('.rev_slider').length > 0) {
			var slider = $('.rev_slider'),
				id = $(slider).attr('id'),
				revapi = 'revapi' + id.split('rev_slider_')[1].split('_')[0],
				revapiSlider = eval(revapi);
			revapiSlider.revstart();
			console.log('Slider '+revapi+' started.');
			console.log(revapiSlider);
		}
	}
	// Kill RevSlider
	function killSlider() {
		if($('.rev_slider').length > 0) {
			var slider = $('.rev_slider'),
				id = $(slider).attr('id'),
				revapi = 'revapi' + id.split('rev_slider_')[1].split('_')[0],
				revapiSlider = eval(revapi);
			revapiSlider.revkill();
			console.log('Slider '+revapi+' killed.');
			revapiSlider = null;
			console.log('Slider is now '+revapiSlider+'.');
		}
	}

	// BarbaJS
	var FadeTransition = Barba.BaseTransition.extend({
		start: function() {
			Promise
			.all([this.newContainerLoading, this.fadeOut()])
			.then(this.fadeIn.bind(this));
		},
		fadeOut: function() {
			return $(this.oldContainer).animate({ opacity: 0 }).promise();
		},
		fadeIn: function() {
			var _this = this;
			var $el = $(this.newContainer);
			$(this.oldContainer).hide();
			$el.css({
				visibility : 'visible',
				opacity : 0
			});
			$el.animate({ opacity: 1 }, 400, function() {
				_this.done();
			});
		},
	});
	Barba.Pjax.getTransition = function() {
		return FadeTransition;
	};
	Barba.Dispatcher.on('linkClicked', function(oldContainer) {
		setTimeout(killSlider);
	});
	Barba.Dispatcher.on('transitionCompleted', function(newContainer) {
		setTimeout(startSlider);
	});
	var BarbaContainer = Barba.BaseView.extend({
		namespace: 'barba-container',
		onLeave: function() {
			// A new Transition toward a new page has just started.
		},
		onLeaveCompleted: function() {
			// The Container has just been removed from the DOM.
		},
		onEnter: function() {
			// The new Container is ready and attached to the DOM.
			setHeight();
			stickyHeader();
			navbarTrans();
			navbarDropdown();
			flowtypeJS();
			toTop();
		},
		onEnterCompleted: function() {
			// The Transition has just finished.
			externalLinkage();
			FacebookAPI();
			twitterAPI();
		},
	});
	BarbaContainer.init();
	Barba.Pjax.start();
	Barba.Prefetch.init();
						
})(jQuery, window, document);