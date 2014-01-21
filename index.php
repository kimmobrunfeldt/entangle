<!DOCTYPE html>
<html lang="en">

<head>
    <title>Screen share</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href='https://fonts.googleapis.com/css?family=Roboto:100' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/pure-min.css">

    <script>
    var hash = window.location.hash.replace('#', '');
    if (!hash.length) location.href = location.href + '#screen-id-' + ((Math.random() * new Date().getTime()).toString(36).toLowerCase().replace(/\./g, '-'));
    </script>

    <style>
    body, .pure-g[class *="pure-u"], .pure-g-r[class *="pure-u"], * {
        font-family:"Roboto", 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 100;
    }

    html,body {
        background: #F8CB9B;
    }

    h1, h2, h3, h4 {
        font-weight: 100;
    }

    .flat-button {
        font-family: inherit;
        font-size: 100%;
        *font-size: 90%; /*IE 6/7 - To reduce IE's oversized button text*/
        *overflow: visible; /*IE 6/7 - Because of IE's overly large left/right padding on buttons */
        padding: 0.5em 1em;
        color: white
        *color: #444; /* IE 6 & 7 */
        border: 1px solid #999;  /*IE 6/7/8*/
        border: none rgba(0, 0, 0, 0);  /*IE9 + everything else*/
        background-color: #67B2CB;
        text-decoration: none;
        border-radius: 2px;
    }

    a:visited {
        color: #67B2CB;
    }
    a:hover {
        color: #67B2CB;
        text-decoration: underline;
    }
    a {
        color: #67B2CB;
        text-decoration: none;
    }


    .pure-button-large {
        font-size: 200%;
    }
    .header {
        background: #67B2CB;
        color: white;
        padding: 0 0 20px 0;
    }
    .content {
        text-align: center;
        padding: 100px 0 100px 0;
        color: white;
    }
    ::selection {
        background: #ccc;
    }
    ::-moz-selection {
        background: #ccc;
    }
    #remote-media-streams video {
        width: 10em;
    }
    #local-media-stream video {
        width: 34em;
    }
    video {
        vertical-align: bottom;
        width: 90%;
    }
    </style>
    <script src="https://www.webrtc-experiment.com/firebase.js">
    </script>
    <script src="https://www.webrtc-experiment.com/screen-sharing/screen.js">
    </script>
</head>

<body>

    <div class="header pure-g">

        <div class="pure-u-1-5">

        </div>
        <div class="pure-u-4-5">
            <h1>Entangle</h1>
            <h2>Simplest way to share your screen</h2>
        </div>


    </div>

    <div class="content pure-gr">

        <i class="fa fa-desktop"></i>
        <div class="pure-u-1">

            <button class="flat-button" id="share-screen">Share Screen</button>
            </section>
        </div>

    </div>


    <section id="screens-preview"></section>


    <script>
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
    </script>

    <!-- common.js is useless for you! -->
    <script src="https://www.webrtc-experiment.com/common.js" async>
    </script>
</body>

</html>