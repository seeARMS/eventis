$(function(){
	var authed = false;
	checkAuth();

	function getInfo(type){
		if(authed){
			$.get('/me/'+type, function(data){
				renderInfo(type,data); 
			});
		}
	}

	function checkAuth(){
		$.get('/authed', function(data){
			if (data.authed == true){
				authed = true;
			}
			getInfo('events');
			getInfo('likes');
			getInfo('interests');	
		});
	}

	function renderInfo(type, response){
		console.log('rendering',type);
		var ul = document.getElementById(type);
		for(var i = 0; i < response.data.length; i++){ 
			var li = document.createElement('li');
			li.innerHTML = response.data[i].name;
			ul.appendChild(li);	
		}		
	}
});
