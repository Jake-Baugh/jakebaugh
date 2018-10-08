\Stripe\Stripe::setApiKey("sk_test_nTNiAjMxu7GX5OqxrCSdEN87");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
$token = $_POST['stripeToken'];
$charge = \Stripe\Charge::create([
    'amount' => 30,
    'currency' => 'gbp',
    'description' => 'JB Consulting',
    'source' => $token,
]);

header('Location: /book-a-call.html');