jQuery(function($){
	$( document ).on('click', '[data-modal]', function (e) {
		e.preventDefault();
		var dataModal = $(this).data('modal');
		var modal = $('#'+dataModal);
		modal.toggleClass('open');
	});
	$( document ).on('click', '.uk-overlay, .uk-modal a.close', function (e) {
		e.preventDefault();
		var modal = $('.uk-modal.open');
		modal.removeClass('open');
	});
});

