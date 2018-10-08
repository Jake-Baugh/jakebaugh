window.onload = function () {
  document.body.className += ' loaded'
};

var scroll = new SmoothScroll('a[href*="#"]', {

	// Selectors
	ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
	header: null, // Selector for fixed headers (must be a valid CSS selector)
	topOnEmptyHash: true, // Scroll to the top of the page for links with href="#"

	// Speed & Easing
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	clip: true, // If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
	offset: function (anchor, toggle) {

			return 75;

	},
	easing: 'easeInOutCubic', // Easing pattern to use

	// History
	updateURL: true, // Update the URL on scroll
	popstate: true, // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)

	// Custom Events
	emitEvents: true // Emit custom events

});

$('#paymentModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget)
	var price = button.data('price')
	var modal = $(this)
	modal.find('#modalPrice').attr("value", price)
  })


  var stripe = Stripe('pk_test_R0YUAl5TCXW1YGSyrTjwye8X');
  var elements = stripe.elements();

  var style = {
    base: {
	
    },
  };

  var elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
  };

  // Card number
  var card = elements.create('cardNumber', {
    placeholder: 'Valid Card Number',
    style: style
  });
  card.mount('#cardNumber');

  // CVC
  var cvc = elements.create('cardCvc', {
    placeholder: 'CVC',
    style: style
  });
  cvc.mount('#cardCVC');

  // Card number
  var exp = elements.create('cardExpiry', {
    'placeholder': 'MM / YY',
    'style': style
  });
  exp.mount('#cardExpiry');

  // Submit
  $('#paymentSubmit').on('click', function(e){
    e.preventDefault();
    var cardData = {
      'name': $('#name').val()
    };
    stripe.createToken(card, cardData).then(function(result) {
      console.log(result);
      if(result.error && result.error.message){
        alert(result.error.message);
      }else{
        alert(result.token.id);
      }
    });
  });
  