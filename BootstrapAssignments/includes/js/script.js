/*

My Custom JS
============

Author:  Brad Hussey
Updated: August 2013
Notes:	 Hand coded for Udemy.com

*/
$(function () {
	/*
	$('#alertMe').click(function(e)
	{
		e.preventDefault();
		$('#successAlert').slideDown();
	});
	*/


	$('#formBtnSubmit').click(function(m)
	{
		m.preventDefault();
		$('#successAlertForm').slideDown();
	});

	/* script for mobile call */

	$('#alertMobile').click(function(m)
	{
		m.preventDefault();
		$('#successAlert').slideDown();
	});

	$('#btnMessage').click(function(m)
	{
		m.preventDefault();
		$('.message-wrapper').slideDown();

	});

	$('#btnAlertTextArea').click(function(m)
	{
		m.preventDefault();
		$('#successMailAlert').slideDown();
		$(".message-wrapper").css("display", "none");
	});

});
