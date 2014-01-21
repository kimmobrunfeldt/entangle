var screen = new Screen();

var screensPreview = document.getElementById('screens-preview');

// on getting each new screen
screen.onaddstream = function(e) {
    var button = document.createElement('button');
    button.innerHTML = 'Stop Sharing Screen';
    button.onclick = function() {
        screen.leave();
        this.disabled = true;
    };
    screensPreview.appendChild(button);
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

    this.parentNode.innerHTML = '<h2><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
};