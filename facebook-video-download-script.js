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

        var data = JSON.parse(scripts[0].match(/\(\).handle\((\{"instances":\[.*\})\);/)[1]);
        var apiConfigId = data.instances[0][2][0].apiConfig.__m;
        var paramsObject = data.instances.filter(function(p){
            return p[0] == apiConfigId; 
            //return p.length && p[1][0]=='VideoConfig';
        })[0][2][0];

        return {
            paramsObjects: [paramsObject],
        };
    };

    function getDownloadLink(type) {
        myObject = getMyObject(document);
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