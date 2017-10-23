"use strict";


function TaskAtHandApp()
{
	var version = "v1.0";
	var appStorage = new AppStorage("taskAtHand");
	var backupList;

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
		
		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
		
		$("#undoButton").click(function(){
			reloadTaskList(backupList);
		})
	};
	
	function addTask(){
		backupList = appStorage.getValue("taskList");
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
			backupList = appStorage.getValue("taskList");
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
		
	}
	
	function removeTask($task){
		$task.remove();
		saveTaskList();
	}
	
	function moveTask($task, moveUp){
		backupList = appStorage.getValue("taskList");
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
		saveTaskList();
		backupList = appStorage.getValue("taskList");
	}
	
	function reloadTaskList(list){
		var tasks = list;
		$("#task-list").empty();
		console.log(tasks);
		if (tasks){
			for (var i in tasks){
				addTaskElement(tasks[i]);
			}
		}
		saveTaskList();
	}
} 


$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});
