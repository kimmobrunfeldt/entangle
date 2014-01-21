var screen = new Screen();

var screensPreview = document.getElementById('screens-preview');

// on getting each new screen
screen.onaddstream = function(e) {
    var hash = window.location.hash.replace('#', '');
    if (!hash.length) location.href = location.href + '#screen-id-' + ((Math.random() * new Date().getTime()).toString(36).toLowerCase().replace(/\./g, '-'));

    var button = document.createElement('button');

    $('#stop-screen-share').on('click', function() {
        screen.leave();
        this.disabled = true;
        $('.screen-preview').show();
    });

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

document.getElementById('share-screen').onclick = function() {
    screen.share();
    this.disabled = true;

    $('.screen-preview').show();
};