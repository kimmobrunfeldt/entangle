// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri(str) {
    var o = parseUri.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

$(function() {


    var screen;
    var screenId;

    if (location.href.indexOf('#screen-id') !== -1) {
        var parts = parseUri(location.href);
        screenId = parts.relative.replace('#', '');
        console.log('existing screen' + screenId);
        $('.screen-preview').show();
    } else {
        screenId = 'screen-id-' + ((Math.random() * new Date().getTime()).toString(36).toLowerCase().replace(/\./g, '-'));
    }

    screen = new Screen(screenId);

    var screensPreview = document.getElementById('screens-preview');

    // on getting each new screen
    screen.onaddstream = function(e) {
        console.log('addstream');
        var parts = parseUri(location.href);
        location.href = parts.protocol + '://' + parts.authority + '/#' + screenId;

        screensPreview.appendChild(document.createElement('hr'));
        screensPreview.appendChild(e.video);
        e.video.focus();
    };

    // using firebase for signaling
    screen.firebase = 'signaling';

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

});