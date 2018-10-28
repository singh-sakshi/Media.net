window.onload = function() {
    loadDoc();
  };
    
    var flag = 0;
    var obj ; 
    var dummyObj; 
	var size;
  function loadDoc() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			obj = JSON.parse(this.responseText);
			dummyObj = Object.assign({},obj);
			 size = Object.keys(obj.movies).length;
			console.log(Object.keys(obj.movies).length);
			showdata(obj,size);
		}
	};
	xhttp.open("GET", "https://api.myjson.com/bins/mhs1e", true);
	xhttp.send();
}
function showdata(objc,len){
	console.log(flag);
	document.getElementById("movie_data").innerHTML = "";	
	for(var i=0;i<10;i++){	
		var urltest = objc.movies[i].posterurl;		
		var caption = objc.movies[i].title;
		var releasedate = objc.movies[i].releaseDate;
		var divelem = document.createElement("div");
		var figuretg = document.createElement("figure");
		var figurecp = document.createElement("figcaption");
        var figurecpreldate = document.createElement("figcaption");			
		var imgtag = document.createElement("img");
		imgtag.setAttribute("src",urltest);
		var t = document.createTextNode(caption);
		var date = document.createTextNode(releasedate);
		figurecp.appendChild(t);
		figurecpreldate.appendChild(date);
		figuretg.appendChild(imgtag);
		figuretg.appendChild(figurecp);
		figuretg.appendChild(figurecpreldate);
		divelem.appendChild(figuretg);
		document.getElementById("movie_data").appendChild(divelem);		
	}
}
function sortarr(){
 flag =1;
 var sortedObj = obj.movies.sort(compare_to_sort);
 dummyObj.movies = sortedObj;
 showdata(dummyObj,size);

}
function compare_to_sort(x,y) 
 {
  if (x.title < y.title)
    return -1;
  if (x.title > y.title)
    return 1;
  return 0;
 }
 function sortarrByReleaseDate(){
 flag =1;
 var sortedObj = obj.movies.sort(compare_to_sort_date);
 dummyObj.movies = sortedObj;
 showdata(dummyObj,size);
}
function compare_to_sort_date(x,y) 
 {
  if (x.releaseDate < y.releaseDate)
    return -1;
  if (x.releaseDate > y.releaseDate)
    return 1;
  return 0;
 }
//Code To Search Movie
function searchMovie(){
    var srch = document.getElementById("searchText").value ;
    if(srch==""){
        alert("Please Enter Movie Name");
    }
    var results = new Array();
    for (var i=0 ; i < size ; i++)
    {
        var j=0;
        
        if (obj.movies[i].title.toUpperCase()   == srch.toUpperCase()   ) {
         
            results.push(obj.movies[i]);

            j++;
            break;
        }
      
    }
    console.log(results);
    dummyObj = Object.assign({},results);
    dummyObj.movies = results;  
    var searchsize = Object.keys(dummyObj.movies).length;
    showdata(dummyObj,searchsize);
   
}
