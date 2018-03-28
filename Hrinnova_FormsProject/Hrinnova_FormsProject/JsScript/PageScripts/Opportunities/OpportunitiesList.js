var indexCount = 0;
var isSearched = 0;
$(document).ready(function () {
    $('#divLoadMore').click(function () {
        indexCount += 1;
        loadMoreOpprtunities(indexCount)
    });
    $('#searchOpportunity').click(function () {
        isSearched = 1;
        indexCount = 0;
        if ($(this).val() == '')
        {
            $('#divLoadMore').show();
        }
        reloadOpportunities();
    });
    $(document).on('change', 'input[type=checkbox]', function () {
        if (false == $(this).prop("checked")) { //if this item is unchecked
            $("#chkselectAll").prop('checked', false); //change "select all" checked status to false
        }
        //check "select all" if all checkbox items are checked
        if ($('input[name=DocumentType][type=checkbox]:checked').length == $('input[name=DocumentType][type=checkbox]').length) {
            $("#chkselectAll").prop('checked', true);
        }
    });
    $('#txtSearch').change(function () {
        isSearched = 0;
    });
    $('#btnContine').click(function () {
        var oppId = $('#hdnOpportunityId').val();
        var pinId = $('#hdnPINId').val();
        var Count = 0;
        var MandatoryName="";
        $('input[name=DocumentType]').each(function (index) {
            if ($(this).data("mandatory") == "True" && $(this).prop('checked')) {
                Count += 1;
            }
            else
            {
                if ($(this).data("mandatory") == "True")
                {
                    MandatoryName += $(this).data('code') + " or ";
                }
            }
        });
        if (Count >= 1)
        {
            window.location.href = "/projectinitiation/index?oppId=" + oppId + "&PINId=" + pinId;
        }
        else
        {
            MandatoryName= MandatoryName.replace(/or\s*$/, "");
            toastr.error(MandatoryName+" is mandotary");
        }

    });
    $(document).on("click", "#btnCreatePin", function () {
        $("#create_pin").modal('show');
        $.ajax({
            url: '/Opportunities/DocumentTypeListing',
            type: 'POST',
            data: JSON.stringify({ opportunityId: $(this).attr('data-id') }),
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $('#ModelDocumentDataBody').empty();
                    $('#ModelDocumentDataBody').html(data);
                    setupCheckboxes();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
});
function loadMoreOpprtunities(count) {
    var searchText = '';
    if (isSearched == 1) {
        searchText = $('#txtSearch').val();
    }
    $.ajax({
        url: '/AttendanceView/checkSessionTimeout',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                $.ajax({
                    url: "/Opportunities/GetOpportunitiesByIndex",
                    contentType: "application/json; charset=UTF-8",
                    dataType: "html",
                    data: { index: count, searchText: searchText },
                    async: false,
                    //beforeSend: function () {
                    //    $('.notify-loader').show();
                    //},
                    success: function (data) {
                        if (data == '') {
                            toastr.error("No more records found.");
                            $('#divLoadMore').hide();
                        }
                        else {
                            $('#opportunities').append(data);
                        }
                    }
                });
            }
            else {
                window.location.reload();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
function reloadOpportunities() {
    $.ajax({
        url: '/AttendanceView/checkSessionTimeout',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                $.ajax({
                    url: "/Opportunities/OpportunitiesListing",
                    contentType: "application/json; charset=UTF-8",
                    dataType: "html",
                    data: { searchText: $('#txtSearch').val() },
                    async: false,
                    //beforeSend: function () {
                    //    $('.notify-loader').show();
                    //},
                    success: function (data) {
                        $('#divAllOpportunities').html(data);
                    }
                });
            }
            else {
                window.location.reload();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
