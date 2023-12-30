<?php
error_reporting(E_ALL);
require_once(__DIR__ . '/vendor/autoload.php');

// Configure API key authorization: api-key
$config = SendinBlue\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', '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');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = SendinBlue\Client\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api-key', 'Bearer');
// Configure API key authorization: partner-key
$config = SendinBlue\Client\Configuration::getDefaultConfiguration()->setApiKey('partner-key', 'YOUR_API_KEY');
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = SendinBlue\Client\Configuration::getDefaultConfiguration()->setApiKeyPrefix('partner-key', 'Bearer');

$apiInstance = new SendinBlue\Client\Api\AccountApi(
	// If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
	// This is optional, `GuzzleHttp\Client` will be used as default.
	new GuzzleHttp\Client(),
	$config
);

try {
	$result = $apiInstance->getAccount();
	print_r($result);
	echo "testing the mail";

	include './Mailin.php';
	$mailin = new Mailin('hello@famile.org', 'MsNnz0r5PtgOc8LJ');
	$mailin->addTo('jnatybudy@gmail.com.org', 'Famile Org')->setFrom('hello@famile.org', 'Famile Org')->setReplyTo('hello@famile.org', 'Famile Org')->setSubject('Enter the subject here')->setText('Hello')->setHtml('<strong>Hello</strong>');
	$res = $mailin->send();
	print_r($res);
} catch (Exception $e) {
	echo 'Exception when calling AccountApi->getAccount: ', $e->getMessage(), PHP_EOL;
}
