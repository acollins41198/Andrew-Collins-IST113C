"use strict";


function TaskAtHandApp()
{
	var version = "v1.0";
	var appStorage = new AppStorage("taskAtHand");
	
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}


	this.start = function()
	{
		$("#new-task-name").keypress(function(e){
			
			if (e.which == 13){
				addTask();
				return false;
			}
		}).focus();
		setStatus("ready");
		$("#app>header").append(version);
		loadTaskList();
		loadTheme();
		$("#theme").change(onChangeTheme);
	};
	
	function onChangeTheme(){
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme", theme);
	}
	
	function setTheme(theme){
		$("#theme-style").attr("href", "themes/" + theme + ".css");
	}
	
	function loadTheme(){
		var theme = appStorage.getValue("theme");
		if (theme){
			setTheme(theme);
			$("#theme>option[value=" + theme + "]").attr("selected","selected");
		}
	}
	
	function addTask(){
		var taskName = $("#new-task-name").val();
		if (taskName){
			addTaskElement(taskName);
			$("#new-task-name").val("").focus();
		}
		saveTaskList();
	}
	function addTaskElement(taskName){
		/* // Old Stuff
		var $task = $("<li></li>");
		var $delete = $("<button class='delete'>X</button>");
		var $moveUp = $("<button class='move-up'>^</button>");
		var $moveDown = $("<button class='move-down'>v</button>");
		$task.append($delete)
			.append($moveUp)
			.append($moveDown)
			.append("<span class='task-name'>" + taskName + "</span>");
		$delete.click(function(){
			$task.remove();
		});
		$moveUp.click(function(){
			$task.insertBefore($task.prev());
		});
		$moveDown.click(function(){
			$task.insertAfter($task.next());
		});
		$("#task-list").append($task);
		*/
		var $task = $("#task-template .task").clone();
		$("span.task-name" , $task).text(taskName);
		
		$("#task-list").append($task);
		
		$("button.delete", $task).click(function(){
			$task.remove();
			saveTaskList();
		});
		
		$("button.move-up", $task).click(function(){
			moveTask($task, true);
		});
		
		$("button.move-down", $task).click(function(){
			moveTask($task, false);
		});
		
		$("span.task-name", $task).click(function(){
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function(){
			onChangeTaskName($(this));
		}).blur(function(){
			$(this).hide().siblings("span.task-name").show();
		});
		$task.click(function(){
			onSelectTask($task);
		});
		
	}
	
	function onSelectTask($task){
		if($task != null){
			$task.siblings(".selected").removeClass("selected");
			$task.addClass("selected");
		}
	}
	
	function removeTask($task){
		$task.remove();
		saveTaskList();
	}
	
	function moveTask($task, moveUp){
		if (moveUp){
			$task.insertBefore($task.prev());
		} else {
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}
	
	function onEditTaskName($span){
		$span.hide()
			.siblings("input.task-name")
			.val($span.text())
			.show()
			.focus();
	}
	
	function onChangeTaskName($input){
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val()){
			$span.text($input.val());
		}
		$span.show();
	}
	
	function saveTaskList(){
		var tasks = [];
		$('#task-list .task span.task-name').each(function(){
			tasks.push($(this).text())
		});
		appStorage.setValue("taskList", tasks);
	}
	
	function loadTaskList(){
		var tasks = appStorage.getValue("taskList");
		if (tasks){
			for (var i in tasks){
				addTaskElement(tasks[i]);
			}
		}
	}
} 


$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});
