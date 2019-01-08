function save_options()
{
  var AMPPrivateCloudIP = document.getElementById('AMPPrivateCloudIP').value;
  var AMPPublicCloudGeo = document.getElementById('AMPPublicCloudGeo').value;

  var contextIP =  /\b[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\b/;
  var contextFQDN =  /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;

  if (contextIP.test(AMPPrivateCloudIP) || contextFQDN.test(AMPPrivateCloudIP) || AMPPrivateCloudIP == 'FQDN or IP') {
     alert("Thank you!");
} else {
     throw new Error("ERROR: Input is neither IP Address or FQDN!");
}

  chrome.storage.local.set({
     favGeo: AMPPublicCloudGeo,
     favAMP: AMPPrivateCloudIP
  }, function() {
     var status = document.getElementById('status');
     status.textContent = 'Options saved.';
     setTimeout(function() {
        status.textContent = '';
     }, 750);
  chrome.runtime.reload();
});
}

// restores options
// stored in chrome local storage
function restore_options() {
   // use default value of undefined for AMP Private Cloud
   // use default value of AMP US Public Cloud
   chrome.storage.local.get({
      favGeo: 'us',
      favAMP: 'FQDN or IP'
   }, function(items) {
      document.getElementById('AMPPublicCloudGeo').value = items.favGeo;
      document.getElementById('AMPPrivateCloudIP').value = items.favAMP;
   });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

