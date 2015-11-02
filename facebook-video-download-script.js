
var LINK_TYPE_SD = 'sd_src_no_ratelimit';
var LINK_TYPE_HD = 'hd_src_no_ratelimit';

getMyObject = function(doc)
{
	var scriptsCollection = doc.getElementsByTagName("script");
	var scripts = [];
	for (var i = scriptsCollection.length - 1; i >= 0; i--) 
	{
		var script = scriptsCollection[i].innerHTML;
		if (/video_ids/i.test(script)) 
		{
			scripts.push(script);
		};
	};

	var paramsObjects = [];

	for (var i = scripts.length - 1; i >= 0; i--) 
	{
		var paramsStringsArray = scripts[i].match(/\["params"[^\]]*\]/g);
		
		for (var j = paramsStringsArray.length - 1; j >= 0; j--) 
		{
			var paramsString = paramsStringsArray[j];
			var params = JSON.parse(paramsString)[1];
			var value = decodeURIComponent(params);

			var valueObj = JSON.parse(value);
			paramsObjects.push( valueObj );
		};
	};

	return { 
		paramsObjects: paramsObjects,
	};
};

getDownloadLink = function(type)
{
	myObject = getMyObject(document);
	var dwLinks = myObject.paramsObjects[0].video_data.progressive[0];
	return dwLinks[type];   
};

download = function(type)
{
	var link = getDownloadLink(type);

	var a = document.createElement('a');
	a.href = link;
	a.setAttribute('download','download');
	a.click();
};

download(LINK_TYPE_HD);
