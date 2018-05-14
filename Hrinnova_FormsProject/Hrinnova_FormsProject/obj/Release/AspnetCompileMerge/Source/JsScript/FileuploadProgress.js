var loadedFiles = [],
        readers = [];

var loadFile = function (f) {
    var reader = new FileReader(),
    progressBar,
    row;
    readers.push(reader);
    reader.onloadstart = function () {
    };
    reader.onerror = function (e) {
        if (e.target.error.code === e.target.error.ABORT_ERR) {
            return;
        }
        progressBar.parent().html([
        "<div class='bg-danger bfd-error-message'>Error</div>"
        ].join("\n"));
    };
    reader.onprogress = function (e) {
        var percentLoaded = Math.round(e.loaded * 100 / e.total) + "%";
        progressBar.attr("aria-valuenow", e.loaded);
        progressBar.css("width", percentLoaded);
        $(".sr-only", progressBar).text(percentLoaded);
    };
    reader.onload = function (e) {
        f.content = e.target.result;
        loadedFiles.push(f);
        progressBar.removeClass("active");
    };
    var progress = $([
    "<div class='col-xs-7 col-sm-4 bfd-info'>",
    " <span class='glyphicon glyphicon-remove bfd-remove'></span>&nbsp;",
    " <span class='glyphicon glyphicon-file'></span>&nbsp;" + f.name,
    "</div>",
    "<div class='col-xs-5 col-sm-8 bfd-progress'>",
    " <div class='progress'>",
    " <div class='progress-bar progress-bar-striped active' role='progressbar'",
    " aria-valuenow='0' aria-valuemin='0' aria-valuemax='" + f.size + "'>",
    " <span class='sr-only'>0%</span>",
    " </div>",
    " </div>",
    "</div>"
    ].join(""));
    progressBar = $(".progress-bar", progress);
    $(".bfd-remove", progress).tooltip({
        "container": "body",
        "html": true,
        "placement": "top",
        "title": "Remove"
    }).on("click.bfd", function () {
        //reader.abort();
        var idx = loadedFiles.indexOf(f);
        if (idx >= 0) {
            loadedFiles.pop(idx);
        }
        row.fadeOut();
    });
    row = $("<div class='row'></div>");
    row.append(progress);
    $(".progress").append(row);
    reader["readAs" + "DataURL"](f);
};