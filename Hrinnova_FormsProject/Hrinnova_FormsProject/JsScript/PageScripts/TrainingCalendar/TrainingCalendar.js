$(document).ready(function () {
    BindCalendar();
    //$("#internalTrainerButton").click(function (e) {
    //    addInternalTrainer();
    //});
   
});
function BindCalendar() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        data: '{}',
        url: "/TrainingCalendar/GetTrainingEvents",
        dataType: "json",
        success: function (data) {
            
            $('div[id*=fullcal]').fullCalendar('removeEvents');
            $('div[id*=fullcal]').fullCalendar({
                header: {
                    left: 'prev,next today datepicter',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay',                    
                },
                height: 700,
                editable: true,
                timeFormat: 'H:mm',
                eventLimit: 3,
                events: $.map(data, function (item, i) {
                    var event = new Object();
                    event.id = item.TrainingDetailId;
                    event.parentId = item.TrainingId;
                    event.start = new Date(item.StartDate);
                    event.end = new Date(item.EndDate);
                    event.title = item.Name;
                    event.url = item.Url;
                    event.ImageType = item.ImageType;
                    event.EventType = item.EventType
                    event.color = item.color;
                    event.className = 'checkSessionTimeout cursor-pointer';
                    event.startEditable = false;
                    event.eventDurationEditable = false;
                    event.editable = false;
                    return event;
                }),
                eventRender: function (event, eventElement) {
                    //if (event.ImageType) {
                    eventElement.find('span.fc-time').before($(GetImage(event.EventType)));
                    //}
                }, eventClick: function (calEvent, jsEvent, view) {
                    $.ajax({
                        type: "GET",
                        contentType: "application/json",
                        dataType: "html",
                        data: { trainingId: calEvent.parentId, TrainingDetailId: calEvent.id },
                        url: "/TrainingCalendar/ViewEventDetails",
                        beforeSend: function () {
                            ShowProgress();
                        },
                        success: function (data) {
                            HideProgress();
                            $("#ViewEventTitle").html(calEvent.title);
                            $("#ViewEventModelBody").html(data);
                            $("#ViewEventModel").modal();
                        },
                        error: function () {
                            
                        }
                    });
                },
                disableDragging: true
                ,
                loading: function (bool) {
                    if (bool) $('#loading').show();
                    else $('#loading').hide();
                }
            });
            $(".event-colors").show();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {  }
    }); $('#loading').hide(); $('div[id*=fullcal]').show();
}
function GetImage(eventType) {
    if (eventType == 1) {
        return '<i class="fa fa-child"></i>&nbsp';//fa fa-group
    }
    else {
        return '<i class="fa fa-leanpub"></i>&nbsp';//fa fa-leanpub
    }
    
}
function addInternalTrainer() {
    $.ajax({
        url: '/TrainingDetail/AddInternalTrainer',
        type: 'GET',
        data: '{}',
        dataType: 'html',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            HideProgress();
            $('#AddInternalTrainerModelBody').html(data);
            $('#AddInternalTrainerModel').modal("show");
        },
        error: function () { }
    });
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}
function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}