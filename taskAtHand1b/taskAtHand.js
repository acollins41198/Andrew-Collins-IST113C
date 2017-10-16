"use strict";


function TaskAtHandApp()
{
	var version = "v1.0";


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
		setStatus("ready");
	};
	
	function addTask(){
		var taskName = $("#new-task-name").val();
		if (taskName){
			addTaskElement(taskName);
			$("#new-task-name").val("").focus();
		}
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
		});
		
		$("button.move-up", $task).click(function(){
			$task.insertBefore($task.prev());
		});
		
		$("button.move-down", $task).click(function(){
			$task.insertAfter($task.next());
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
} 
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});
