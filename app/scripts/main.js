function renderTemplate( templateID, json, destination ) {
	var $dest = $('#'+destination);
	var template = document.getElementById(templateID).innerHTML;
	Mustache.parse(template);
	var rendered = Mustache.render(template, json);
	$dest.html('').html(rendered);
}

function parseQuery(make, price) {
	$.getJSON('/cars')
	.always()
	.done(function( data ) {
		var result = data.cars
		for (var i=0; i<result.length; i++) {

			if (price > 0) {
			} else {
				if (result[i].price >= price) {
					result.splice( i, 1 );
				}
			}

			if (make === "all") {
			} else {
				if (result[i].make.toLowerCase() != make.toLowerCase()) {
					result.splice( i, 1 );
				}
			}
		}
		renderTemplate('cars-template', result, 'cars-results');
	})
	.fail(function( result ) {
		console.log('Data could not be retrieved, please try again', result.status + ' ' + result.statusText);
	});
}


//Init
$(function(){
	parseQuery("all", 0);

	// Callback hell
	$('#price-input').focus(function(){
		$('#price-input').keydown(function(){
			if ($('#price-input').val().length >= 3) {
				parseQuery($('#make-input option:selected').text(), $('#price-input').val());
			}
		});
	});

	$('#make-input').change(function(){
		parseQuery($('#make-input option:selected').text(), $('#price-input').val());
	});
});