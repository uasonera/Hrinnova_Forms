var Constants = {
    HasSubTasksMessage: "This task has Subtasks which will also get deleted. Are you sure you want to proceed?",
    DeleteMessage: "Are you sure you want to delete {0}?",
    MaxTask: "Max. Tasks limit for the selected status has been reached. Do you still want to add task?",
    MaxTaskForStatus: "Max. Tasks limit for the {0} status has been reached.",
    MoveTask: "Task has been Successfully moved from {0} to {1}.",
    TitleLimit: 100,
    DescriptionLimit: 500,
    RestrictStory: "No new story can be added to this sprint. A maximum of {0} stories only are allowed in each Sprint.",
    ChangesGone: "Your changes will go away. Do you want to continue?",
    MaxTask_ChangeStatus: "Max. Tasks limit for the selected status has been reached.Please change the status",
    TitleExists: "Title already exists. Please choose different Title.",
    SprintActive: "This sprint is active. Are you sure you want to proceed?",
    TaskSave: "{0} has been successfully saved.",
    RestrictDelete: "This Task has InProgress sub tasks.You can't delete this task.",
    ChangeAssignee: "This work item is already assigned to a assignee. \nChanging the assignee would close the task for current assignee and all the progress would be lost for the task. \nAre you sure you want to change the assignee?",    
    StatusSequenceSucess: "Order of Task Status has been Successfully changed.",
    MinTaskError: " Minimum Tasks can not exceed Maximum Tasks for {0}.",
    UpdateMinMaxTask: "Minimum Tasks and Maximum Tasks details are saved successfully for {0}.",
    StatusRemove: "{0} has been removed Successfully.",
    MoveParentTask: "This {0} has in progress tasks so you are not allowed to move this task.",
    MoveTaskSuccess: "Task has been Successfully moved from {0} to {1}.",
    NotAllowMoveTaskWithoutStory: "A task/bug/improvement cannot be directly added to a sprint. Please create a Story, add to sprint and then assign the work item to the Story under the Sprint.",
    AllWorkItemCompleted: "All work items that are not marked as completed, will be moved to Product Backlog. \nDo you want to continue?",
    AtLeastTask: "There must be at least one task to complete sprint.",
    SprintComplete: "{0} has been successfully completed.",
    IterationActive: "This iteration is active. Are you sure you want to proceed?"
}

String.format = function () {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}