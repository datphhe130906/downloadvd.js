var LINK_TYPE_SD = 'sd_src_no_ratelimit';
var LINK_TYPE_HD = 'hd_src_no_ratelimit';

(function downloadVideo(type) {
    function getMyObject(doc) {
        var scriptsCollection = doc.getElementsByTagName("script");
        var scripts = [];
        var regExp = /video_ids/i;
        for (var i = scriptsCollection.length - 1; i >= 0; i--) {
            var script = scriptsCollection[i].innerHTML;
            if (regExp.test(script)) {
                scripts.push(script);
            };
        };

        var videoData = eval(scripts[0].match(/"?videoData"?:(\[\{[^}]*\}\])/)[1]);
        var paramsObject = {
            videoData: videoData
        }
        return {
            paramsObjects: [paramsObject],
        };
    };

    function getDownloadLink(type) {
        var myObject = getMyObject(document);
        var dwLinks = myObject.paramsObjects[0].videoData[0];
        return dwLinks[type];
    };

    function download(type) {
        var link = getDownloadLink(type);

        var a = document.createElement('a');
        a.href = link;
        a.setAttribute('download', 'download');
        a.click();
    };

    return download(type);
})(LINK_TYPE_SD);