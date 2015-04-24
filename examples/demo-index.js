$(document).ready(function() {

	//$(".tab-home").css('display','none');
	$(".tab-guide").css('display','none');
	$(".tab-demos").css('display','none');
})
$(".menu-tp").mousedown(function() {
	var clase = $(this).attr('id')
	$(".tab-home").css('display','none');
	$(".tab-guide").css('display','none');
	$(".tab-demos").css('display','none');
	$(".menu-tp").removeClass('active');
	$(this).addClass('active')
	$("."+clase).css('display','block')
})