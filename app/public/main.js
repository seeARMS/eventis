$(function(){
	$('#user').click(function(){
		var id = $(this).attr('href').replace('#','');
		console.log(id);
		getInfoFromID(id);
	});
	$('#location').click(function(){
		var id = $(this).attr('href').replace('#','');
		console.log(id);
		getInfoFromID(id);
	});
	$('#item-data').hide();
	var authed = false;
	checkAuth();

	function getInfo(type){
		if(authed){
			$.get('/me/'+type, function(data){
				renderInfo(type,data); 
				console.log(data);
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
			getInfo('friends');
		});
	}

	function renderInfo(type, response){
		console.log('rendering',type);
		var ul = document.getElementById(type);
		for(var i = 0; i < response.data.length; i++){ 	
			var a = document.createElement('a');
			var li = document.createElement('li');
			(function(){
				var id = response.data[i].id;
				a.href = "#"+id;
				$(li).click(function(){
					getInfoFromID(id);
				});		
			}())
			li.innerHTML = response.data[i].name;
			a.appendChild(li);
			ul.appendChild(a);	
		}		
	}

	function getInfoFromID(id){
		$.get('/fb/'+id, function(data){	
			renderInfoFromID(data);	
		});
	}

	function renderInfoFromID(response){
		var keys = Object.keys(response);
		var ul = document.createElement('ul');
		ul.className = 'list-unstyled';
		for(var i = 0; i < keys.length; i++){
			var li = document.createElement('li');
			li.innerHTML = '<b>'+keys[i]+': </b> '+response[keys[i]];
			ul.appendChild(li);
		}
		console.log(ul);
		$('#item-data').slideUp(function(){
			$('#item-data').html(ul);
			$('#item-data').slideDown();
		});
	}
});
