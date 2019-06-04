chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('./code/index.html', {
		bounds: {
			width: 800,
			height: 600,
			left: 50,
			top: 50
		},
		minWidth: 800,
		minHeight: 600
	});
});

chrome.runtime.onSuspend.addListener(function() {
	// Do some simple clean-up tasks.
});

chrome.runtime.onInstalled.addListener(function() {
		// chrome.storage.local.set(object items, function callback);
});
