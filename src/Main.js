(function(window) {
	var button;
	var backToForm;
	var termsValue="";
	var results;
	var str='http://search.twitter.com/search.json?q=[x]&result_type=mixed&rpp=50&callback=onCallback';
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		// the body has loaded.
		// start coding here!
		button = document.getElementById("findButton");
		backToForm = document.getElementById("backToForm");
		refresh = document.getElementById("refresh");
		Utensil.addListener(button, "click", onClick);
		Utensil.addListener(backToForm, "click", onBackClick);
		Utensil.addListener(refresh, "click", onRefreshClick);
		if (window.localStorage && localStorage.termsValue)
		{
			termsValue=localStorage.termsValue;
			document.getElementById("theForm").style.display="none";
			getTweets();
		}
	}
	function onRefreshClick()
	{
		getTweets();
	}
	function onBackClick()
	{
		document.getElementById("resultsHolder").innerHTML="";
		document.getElementById("theForm").style.display="block";
		document.getElementById("refresh").style.display="none";
	}
	function onClick(event) {
		var terms = document.getElementById("terms");
		
		if (terms.value == "" || terms.value == " ") {

		} else {
			document.getElementById("theForm").style.display="none";
			termsValue = terms.value;
			if (window.localStorage)localStorage.termsValue=termsValue;
			getTweets();
		}
	}
	function getTweets()
	{
		if (window.navigator && !navigator.onLine) 
		{
			if (window.localStorage)results = localStorage.results;
			buildList();
		}
		if(document.getElementById("jsonp"))document.getElementsByTagName('head')[0].removeChild(document.getElementById("jsonp"));
			var script = document.createElement('script');
			script.id="jsonp"
			script.type = 'text/javascript';
			var url = str;
			var termsVal = termsValue.replace(/\,/g," OR ");
			url = url.replace("[x]",termsVal) ;
			script.src = url;
			console.log(url);
			document.getElementsByTagName('head')[0].appendChild(script);
	}
	window.onCallback=function(data)
	{
		results = data.results;
		if (window.localStorage)localStorage.results = results;
		buildList();
		
	}
	function buildList()
	{
		document.getElementById("refresh").style.display="block";
		document.getElementById("resultsHolder").innerHTML="";
		for(var a=0;a<results.length;a++)
		{
			var result = results[a];
			var div = document.createElement("div");
			div.innerHTML = "<p>"+replaceURLWithHTMLLinks(result.text)+"<p>";
			div.className = "resultItem";
			document.getElementById("resultsHolder").appendChild(div);
		}
	}
	function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
}
	Main();
}
)(window); 