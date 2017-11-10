$(document).ready(function(){


	//---------------------------------------------------------------------
	// Ausblenden der Tabellen (da zuerst ein Formulartyp ausgewählt werden muss)
	//---------------------------------------------------------------------
	$(".superview tr").hide();

	//---------------------------------------------------------------------
	// Button Event mit $modul, $action, $formtyp & $formid
	//---------------------------------------------------------------------
	$(document).on('click', ".btn-action", function() {
		var cmd = $(this).attr('data-cmd').split('.');

		$("#cmdcontrol input[name='modul']").val(cmd[0]);
		$("#cmdcontrol input[name='action']").val(cmd[1]);
		$("#cmdcontrol input[name='formtyp']").val($(this).attr('data-formtyp'));
		$("#cmdcontrol input[name='id']").val($(this).attr('data-id'));
		$("#cmdcontrol").submit();

		return false;
	});
	//---------------------------------------------------------------------
	// Button Events beim Werkzeugbutton mit Zuweisung der Id
	// Setzen von $modul & $action
	//---------------------------------------------------------------------
	$(document).on('click', ".btn2.btn-default2.btn-sm2", function() {

		//Id des angeklickten Buttons
		var btnid = $(this).attr('id');
		//Id des dazugehörigen Formulars
		var parentID = $(this).parent().attr('id');

		var substr = btnid.split('_');

		console.log(substr[0]);

		switch (substr[0]) { 
			case 'form': 
				//Setzen des Moduls
				$("#"+ parentID +" input[name='modul']").attr('value', "task");
				//Setzen der Action
				$("#"+ parentID +" input[name='action']").attr('value', "detailed_view");
			break;

			case 'edit': 
				//Setzen des Moduls
				$("#"+ parentID +" input[name='modul']").attr('value', "form");
				//Setzen der Action
				$("#"+ parentID +" input[name='action']").attr('value', "edit");
			break;

			case 'delete': 
				//Setzen des Moduls
				//$("#"+ parentID +" input[name='modul']").attr('value', "task");
				//Setzen der Action
				//$("#"+ parentID +" input[name='action']").attr('value', "delete");
				$("#infomsgbox").append('Task wurde erfolgreich gelöscht.');
			break;

			case 'uebernehmen': 
				//Setzen des Moduls
				$("#edit input[name='modul']").attr('value', "task");
				//Setzen der Action
				$("#edit input[name='action']").attr('value', "uebernehmen");
				//$('#edit').submit();
				//$("#infomsgbox").append(content);
			break;

			case 'abgeben': 
				//Setzen des Moduls
				$("#"+ parentID +" input[name='modul']").attr('value', "task");
				//Setzen der Action
				$("#"+ parentID +" input[name='action']").attr('value', "abgeben");
			break;

			case 'zurueckweisen': 
				//Setzen des Moduls
				$("#"+ parentID +" input[name='modul']").attr('value', "task");
				//Setzen der Action
				$("#"+ parentID +" input[name='action']").attr('value', "zurueckweisen");
			break;
		}

		//AJAX-Request bei dem der neue Inhalt geladen wird
		/*$.ajax({
			type: "POST",
			url: "index.php",
			beforeSend:function(){
			$('#infomsg').html('<i class="fa fa-spinner fa-pulse"></i>');
			},
			data: $('#'+parentID).serialize(),
			success: function() {
			}
		});*/

		//$('#'+parentID).submit();

		return false;
	});

	//---------------------------------------------------------------------
	// Button Events für die Detailansicht
	//---------------------------------------------------------------------
	$(document).on('click', "button[data-group='edit']", function() {
		//Id des angeklickten Buttons
		var btnid = $(this).attr('id');
		//Id des dazugehörigen Formulars
		var parentID = $(this).parent().attr('id');

		var substr = btnid.split('_');

		console.log(substr[0]);

		switch (substr[0]) { 
			case 'uebernehmen': 
				//Setzen des Moduls
				$("#edit input[name='modul']").attr('value', "task");
				//Setzen der Action
				$("#edit input[name='action']").attr('value', "uebernehmen");
				//$('#edit').submit();
				//$("#infomsgbox").append(content);
			break;
			
			case 'abgeben': 
				//Setzen des Moduls
				$("#edit input[name='modul']").attr('value', "task");
				//Setzen der Action
				$("#edit input[name='action']").attr('value', "abgeben");
			break;

			case 'zurueckweisen': 
				//Setzen des Moduls
				$("#edit input[name='modul']").attr('value', "task");
				//Setzen der Action
				$("#edit input[name='action']").attr('value', "zurueckweisen");
			break;
		}

		//---------------------------------------------------------------------
		// AJAX-Request bei dem der neue Inhalt geladen wird
		//---------------------------------------------------------------------
		$.ajax({
			type: "POST",
			url: "index.php",
			beforeSend:function(){
			$('#infomsg').html('<i class="fa fa-spinner fa-pulse"></i>');
			},
			data: $('#edit').serialize(),
			success: function(message) {
			 $('#infomsg').append(message);
			}
		});
		$('#edit').submit();
		//return false;
	});

	//---------------------------------------------------------------------
	// Button Event für die Generierung eines Pdf's
	//---------------------------------------------------------------------
	$(document).on('click', "#getPdf", function() {

		//Id des angeklickten Buttons
		var btnid = $(this).attr('id');

		//Id des dazugehörigen Formulars
		var parentID = $(this).parent().attr('id');

		console.log(parentID);
		//$('#'+parentID).submit();

	});

	//---------------------------------------------------------------------
	// Selectfilter für Taskübersicht
	//---------------------------------------------------------------------
	$('#filter_formtyp_list_overview').on( 'change', function() {
		var filterValue = $(this).val();
		console.log(filterValue);

		if(filterValue == '*') {
			$("#list_overview tr").show();
		} else {
			$("#list_overview tr").hide();
			$("#list_overview tr[data-formtyp="+filterValue+"]").show();
		}
	});

	//---------------------------------------------------------------------
	// Selectfilter für Superansicht
	//---------------------------------------------------------------------
	$('#filter_formtyp_admin_overview').on( 'change', function() {
		var formtyp = $(this).val();
		console.log(formtyp);

		if(formtyp == '*') {

		} else {
				$.ajax({
					type: "POST",
					url: "index.php",
					data: {
						formtyp: formtyp,
					},
					success: function(data) {
						var inputfield = $(data).find('#tab_default_2 #form_cr_user_filter');
						var table = $(data).find('#tab_default_2 table');
						$('#superview_content').empty();
						$('#tab_default_2 #input_filter').empty();
						$('#tab_default_2 #input_filter').append(inputfield);
						$('#superview_content').append(table);
					}
				});
				$('#filter_formtyp_admin_overview').submit();
			}

			//---------------------------------------------------------------------
			// OK-Button beim Inputfeld Superansicht
			//---------------------------------------------------------------------
			$("button #cr_user_filter").click(function(event) {
				//Deaktivierung der Standard Submit-Funktion beim Button
				event.preventDefault();
				var filterValue = $('#form_cr_user_filter input').text();
				if(filterValue != ''){
					$.ajax({
						type: "POST",
						url: "index.php",
						data: {
							cr_user: cr_user,
						},
						success: function(data) {
							var table = $(data).find('#tab_default_2 table');
							$('#superview_content').empty();
							$('#superview_content').append(table);
						}
					});
					$('#form_cr_user_filter').submit();
				}
			})

			//---------------------------------------------------------------------
			// Inputfilter für Superansicht
			//---------------------------------------------------------------------
			$('#searchInput').on( 'keyup', function() {
			// get filter value from option value
			var filterValue = $(this).val().toLowerCase();
			var user = $("#superview_"+formtyp+" tr[data-formtyp="+formtyp+"] > td[class='user']").text();
			console.log("Filter: "+filterValue);
			
			if(filterValue == ''){
				//Zeige nur die Zeilen welche mit dem Formtyp aus dem Selectfilter übereinstimmen
				$(".superview tr[data-formtyp="+formtyp+"]").show();
				
			}
			$("#superview_"+formtyp+" tr[data-formtyp="+formtyp+"] > td[class='user']").each(function(){
				console.log($(this).text().toLowerCase()+"\n");
				if($(this).text().toLowerCase().contains(filterValue)){
					$(this).closest("tr[data-formtyp="+formtyp+"]").show();
				} else {
						$(this).closest("tr").hide();
					}
			});
		});
	});

	//---------------------------------------------------------------------
	// Gewählte Rolle anhand des Dropdowns
	//---------------------------------------------------------------------
	$('#change_role').on( 'change', function() {
		var role = $(this).val();
		console.log('Rolle: '+role);
		if(role != ''){
			$.ajax({
				type: "POST",
				url: "index.php",
				data: {
					user_role: role,
				},
				success: function(data) {
					var content = $(data).find('#content');
					$('#content').empty();
					$('#content').append(content);
				}
			});
			$('#change_role').submit();
		}
	})

	//---------------------------------------------------------------------
	// Diverses
	//---------------------------------------------------------------------
	function showMsgInfo (msg) {
		$("#infomsgbox").empty();
		$("#infomsgbox").show();
		$("#infomsgbox").append($('<div class="alert alert-info alert-dismissible" role="alert">	<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><p>'+msg+'</p></div>'));
		$("#infomsgbox").fadeOut( 4000, function() {
		});
	}

	//Sendet AJAX-Request
	function SendAjaxJsonRequest(url, method, jsonObject){
		$.ajax({
			type: "POST",
			url: url,
			data: {
				method: method,
				jsonObject: jsonObject
			},
			success: onSuccess
		});
	}

	// Ajax Response auswerten
	function onSuccess(content){
		// Das empfangene Objekt wird wieder zum Objekt geparst
		var response = $.parseJSON(content);
		
		// geladenes Template im Container "content" austauschen
		$("#content").html(response.template);
		
		// Pruefen ob die Eingabe richtig ist,
		if(!response.result){
			// Wenn ein Fehler auftritt wird das Eingabefeld rot gefaerbt
			$(".control-group").addClass("error");
		}
		else{
			// Wenn ein kein Fehler auftritt wird die vorhandene CSS-Klasse error entfernt (falls gesetzt)
			$(".control-group").removeClass("error");
		}
	}
})
