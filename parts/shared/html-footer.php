<?php
	global $corp_theme_option;
	$custom_scripts = $corp_theme_option['custom-scripts'];
?>

<!-- File Calls -->
<?php wp_footer(); ?>

<!-- Custom JavaScript -->
<?php echo $custom_scripts; ?>

<!-- End Barba -->
</div>

<!-- End App -->
</div>

<!-- End of Site -->
</body>
</html>