var screenId = 'screen-id-' + ((Math.random() * new Date().getTime()).toString(36).toLowerCase().replace(/\./g, '-'));
var screen = new Screen(screenId);


var screensPreview = document.getElementById('screens-preview');

// on getting each new screen
screen.onaddstream = function(e) {
    location.href = location.href + '#' + screenId;

    screensPreview.appendChild(document.createElement('hr'));
    screensPreview.appendChild(e.video);
    e.video.focus();
};

// using firebase for signaling
screen.firebase = 'entangle';

// if someone leaves; just remove his screen
screen.onuserleft = function(userid) {
    var video = document.getElementById(userid);
    if (video && video.parentNode) video.parentNode.innerHTML = '';
};

// check pre-shared screens
screen.check();

$('#share-screen').on('click', function() {
    screen.share();
    $('.screen-preview').show();
});

$('#stop-screen-share').on('click', function() {
    $('.screen-preview').hide();
    screen.leave();
});