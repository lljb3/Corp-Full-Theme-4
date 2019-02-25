// Check For Development or Production Mode
if (process.env.NODE_ENV !== 'production') {
    console.log('We are in development mode.');
}

// Import JS
import '../lib/smoothState';
import '../lib/bootstrap.bundle';
import '../lib/bootstrap.jasny';
import '../lib/modernizr';
import '../lib/retina';
import '../lib/flowtype';
import '../lib/isotope.pkgd';
import '../lib/smooth-scroll.polyfills';
import '../lib/site.js';

// Import CSS
import '../../css/lib/bootstrap.min.css';
import '../../css/lib/bootstrap-grid.min.css';
import '../../css/lib/bootstrap-reboot.min.css';
import '../../css/lib/bootstrap.jasny.min.css';
import '../../css/lib/fontawesome.all.min.css';
import '../../css/lib/animate.min.css';
import '../../css/dist/style.css';
'use strict';