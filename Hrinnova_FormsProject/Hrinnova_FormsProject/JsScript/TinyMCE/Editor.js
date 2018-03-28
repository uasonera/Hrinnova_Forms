// Script block for TinyMCE editor - Start

// Document on load start
$(function () {
    var editor;

    var editorTextboxId = $('[id*="TextArea1"]').attr('id');

    // tfm_path tells the provided tinymce plugins 
    // where to find FileManager.aspx, which is the file manager webpage         
    tfm_path = '../FileManager';

    tinymce.init({

        mode: "exact",
        content_css: "../JsScript/TinyMCE/mceStyle.css",

        //elements: "ucEditor_TextArea1",

        elements: editorTextboxId,

        encoding: "xml",

        decoding: "html",

        verify_html: false,

        //trim_span_elements: false,

        add_unload_trigger: false,

        inline_styles: true,

        image_advtab: true,

        forced_root_block: false,// false : will not add <p> for every line and will also allow <br/>

        spellchecker_languages: "English=en",

        plugins: [
						    "advlist",
                            "autolink",
                            "anchor",

                            "backgroundcolor", // For table and cell background color - toolbar button name 'bgcolor'                       

                            "charmap",
                            "contextmenu",


                            "emoticons",


        //"fullscreen",


                            "hr",

                            "image",
                            "insertdatetime",
                            "insertdatetime",


                            "lists",
                            "link",


                            "media",


                            "paste",
                            "print",
                            "preview",
                            "pagebreak",


                            "save",
                            "spellchecker",
                            "searchreplace",


                            "table",
                            "tabfocus",
                            "textcolor",


                            "visualblocks",

                            "wordcount",
                            "code",
                            "tinyfilemanager.net"

        //"moxiemanager"
        ],


        toolbar1: "styleselect | fontselect | fontsizeselect | cut copy paste | insertfile undo redo",
        toolbar2: "bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | removeformat",
        toolbar3: "table | link image video | emoticons | anchor hr insertdate inserttime | pagebreak | preview",

        contextmenu: "cut copy paste | link image inserttable | cell row column deletetable",

        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",

        pagebreak_separator: "<newpage />",
        //pagebreak_separator: "<span style=\"page-break-before:always;background-color: #E0E0E0;color:black; width: 100%;height:20px;text-align:center;padding-top:5px; display: inline-block;\">Page Break</span>",

        // Following fonts will be available in 'Font Family'(Dropdown) of an editor
        font_formats: "Andale Mono=andale mono,times;" +
                                "Arial=arial,helvetica,sans-serif;" +
                                "Arial Black=arial black,avant garde;" +
                                "Book Antiqua=book antiqua,palatino;" +
                                "Comic Sans MS=comic sans ms,sans-serif;" +
                                "Courier New=courier new,courier;" +
                                "Georgia=georgia,palatino;" +
                                "Helvetica=helvetica;" +
                                "Impact=impact,chicago;" +
                                "Symbol=symbol;" +
                                "Tahoma=tahoma,arial,helvetica,sans-serif;" +
                                "Terminal=terminal,monaco;" +
                                "Times New Roman=times new roman,times;" +
                                "Trebuchet MS=trebuchet ms,geneva;" +
                                "Verdana=verdana,geneva;" +
                                "Webdings=webdings;" +
                                "Wingdings=wingdings,zapf dingbats",

        insertdatetime_dateformat: "%d-%mmm-%Y",
        insertdatetime_timeformat: "%H:%M:%S",

        max_height: 500,
        min_height: 500,
        height: 500,


        entities: 'raw',

        // All css style elements defined below...Editor will allow all those style elements
        valid_styles:
                {
                    '*': 'accelerator,'
                    + 'azimuth,'

                    + 'background,'
                    + 'background-attachment,'
                    + 'background-color,'
                    + 'background-image,'
                    + 'background-position,'
                    + 'background-position-x,'
                    + 'background-position-y,'
                    + 'background-repeat,'
                    + 'behavior,'
                    + 'border,'
                    + 'border-bottom,'
                    + 'border-bottom-color,'
                    + 'border-bottom-style,'
                    + 'border-bottom-width,'
                    + 'border-collapse,'
                    + 'border-color,'
                    + 'border-left,'
                    + 'border-left-color,'
                    + 'border-left-style,'
                    + 'border-left-width,'
                    + 'border-right,'
                    + 'border-right-color,'
                    + 'border-right-style,'
                    + 'border-right-width,'
                    + 'border-spacing,'
                    + 'border-style,'
                    + 'border-top,'
                    + 'border-top-color,'
                    + 'border-top-style,'
                    + 'border-top-width,'
                    + 'border-width,'
                    + 'bottom,'

                    + 'caption-side,'
                    + 'clear,'
                    + 'clip,'
                    + 'color,'
                    + 'content,'
                    + 'counter-increment,'
                    + 'counter-reset,'
                    + 'cue,'
                    + 'cue-after,'
                    + 'cue-before,'
                    + 'cursor,'

                    + 'direction,'
                    + 'display,'

                    + 'elevation,'
                    + 'empty-cells,'

                    + 'filter,'
                    + 'float,'
                    + 'font,'
                    + 'font-family,'
                    + 'font-size,'
                    + 'font-size-adjust,'
                    + 'font-stretch,'
                    + 'font-style,'
                    + 'font-variant,'
                    + 'font-weight,'

                    + 'height,'

                    + 'ime-mode,'
                    + 'include-source,'

                    + 'layer-background-color,'
                    + 'layer-background-image,'
                    + 'layout-flow,'
                    + 'layout-grid,'
                    + 'layout-grid-char,'
                    + 'layout-grid-char-spacing,'
                    + 'layout-grid-line,'
                    + 'layout-grid-mode,'
                    + 'layout-grid-type,'
                    + 'left,'
                    + 'letter-spacing,'
                    + 'line-break,'
                    + 'line-height,'
                    + 'list-style,'
                    + 'list-style-image,'
                    + 'list-style-position,'
                    + 'list-style-type,'

                    + 'margin,'
                    + 'margin-bottom,'
                    + 'margin-left,'
                    + 'margin-right,'
                    + 'margin-top,'
                    + 'marker-offset,'
                    + 'marks,'
                    + 'max-height,'
                    + 'max-width,'
                    + 'min-height,'
                    + 'min-width,'
                    + '-moz-binding,'
                    + '-moz-border-radius,'
                    + '-moz-border-radius-topleft,'
                    + '-moz-border-radius-topright,'
                    + '-moz-border-radius-bottomright,'
                    + '-moz-border-radius-bottomleft,'
                    + '-moz-border-top-colors,'
                    + '-moz-border-right-colors,'
                    + '-moz-border-bottom-colors,'
                    + '-moz-border-left-colors,'
                    + '-moz-opacity,'
                    + '-moz-outline,'
                    + '-moz-outline-color,'
                    + '-moz-outline-style,'
                    + '-moz-outline-width,'
                    + '-moz-user-focus,'
                    + '-moz-user-input,'
                    + '-moz-user-modify,'
                    + '-moz-user-select,'

                    + 'orphans,'
                    + 'outline,'
                    + 'outline-color,'
                    + 'outline-style,'
                    + 'outline-width,'
                    + 'overflow,'
                    + 'overflow-X,'
                    + 'overflow-Y,'

                    + 'padding,'
                    + 'padding-bottom,'
                    + 'padding-left,'
                    + 'padding-right,'
                    + 'padding-top,'
                    + 'page,'
                    + 'page-break-after,'
                    + 'page-break-before,'
                    + 'page-break-inside,'
                    + 'pause,'
                    + 'pause-after,'
                    + 'pause-before,'
                    + 'pitch,'
                    + 'pitch-range,'
                    + 'play-during,'
                    + 'position,'

                    + 'quotes,'

                    + '-replace,'
                    + 'richness,'
                    + 'right,'
                    + 'ruby-align,'
                    + 'ruby-overhang,'
                    + 'ruby-position,'

                    + '-set-link-source,'
                    + 'size,'
                    + 'speak,'
                    + 'speak-header,'
                    + 'speak-numeral,'
                    + 'speak-punctuation,'
                    + 'speech-rate,'
                    + 'stress,'
                    + 'scrollbar-arrow-color,'
                    + 'scrollbar-base-color,'
                    + 'scrollbar-dark-shadow-color,'
                    + 'scrollbar-face-color,'
                    + 'scrollbar-highlight-color,'
                    + 'scrollbar-shadow-color,'
                    + 'scrollbar-3d-light-color,'
                    + 'scrollbar-track-color,'

                    + 'table-layout,'
                    + 'text-align,'
                    + 'text-align-last,'
                    + 'text-decoration,'
                    + 'text-indent,'
                    + 'text-justify,'
                    + 'text-overflow,'
                    + 'text-shadow,'
                    + 'text-transform,'
                    + 'text-autospace,'
                    + 'text-kashida-space,'
                    + 'text-underline-position,'
                    + 'top,'

                    + 'unicode-bidi,'
                    + '-use-link-source,'

                    + 'vertical-align,'
                    + 'visibility,'
                    + 'voice-family,'
                    + 'volume,'

                    + 'white-space,'
                    + 'widows,'
                    + 'width,'
                    + 'word-break,'
                    + 'word-spacing,'
                    + 'word-wrap,'
                    + 'writing-mode,'

                    + 'z-index,'
                    + 'zoom'
                },

        // No need to modify following 'valid_elements'
        valid_elements: ""
                                + "a[accesskey|charset|class|coords|dir<ltr?rtl|href|hreflang|id|lang|name"
                                + "|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|rel|rev"
                                + "|shape<circle?default?poly?rect|style|tabindex|title|target|type],"
                                + "abbr,"
                                + "acronym,"
                                + "address[class|align|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "applet,"
                                + "area,"
                                + "base[href|target],"
                                + "basefont[color|face|id|size],"
                                + "bdo[class|dir<ltr?rtl|id|lang|style|title],"
                                + "big,"
                                + "blockquote[dir|style|cite|class|dir<ltr?rtl|id|lang|onclick|ondblclick"
                                + "|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout"
                                + "|onmouseover|onmouseup|style|title],"
                                + "body[alink|background|bgcolor|class|dir<ltr?rtl|id|lang|link|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|onunload|style|title|text|vlink],"
                                + "br,"
                                + "button,"
                                + "caption,"
                                + "center[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "cite,"
                                + "code[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "col[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id"
                                + "|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown"
                                + "|onmousemove|onmouseout|onmouseover|onmouseup|span|style|title"
                                + "|valign<baseline?bottom?middle?top|width],"
                                + "colgroup[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl"
                                + "|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown"
                                + "|onmousemove|onmouseout|onmouseover|onmouseup|span|style|title"
                                + "|valign<baseline?bottom?middle?top|width],"
                                + "dd[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],"
                                + "del[cite|class|datetime|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "dfn[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "dir[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "div[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "dl[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "dt[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],"
                                + "em/i[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "fieldset[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "font[class|color|dir<ltr?rtl|face|id|lang|size|style|title],"
                                + "form[accept|accept-charset|action|class|dir<ltr?rtl|enctype|id|lang"
                                + "|method<get?post|name|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onreset|onsubmit"
                                + "|style|title|target],"
                                + "frame[class|frameborder|id|longdesc|marginheight|marginwidth|name"
                                + "|noresize<noresize|scrolling<auto?no?yes|src|style|title],"
                                + "frameset[class|cols|id|onload|onunload|rows|style|title],"
                                + "h1[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "h2[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "h3[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "h4[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "h5[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "h6[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "head[dir<ltr?rtl|lang|profile],"
                                + "hr[align<center?left?right|class|dir<ltr?rtl|id|lang|noshade<noshade|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|size|style|title|width],"
                                + "html[dir<ltr?rtl|lang|version],"
                                + "iframe[align<bottom?left?middle?right?top|class|frameborder|height|id"
                                + "|longdesc|marginheight|marginwidth|name|scrolling<auto?no?yes|src|style"
                                + "|title|width],"
                                + "img[align<bottom?left?middle?right?top|alt|border|class|dir<ltr?rtl|height"
                                + "|hspace|id|ismap<ismap|lang|longdesc|name|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|src|style|title|usemap|vspace|width],"
                                + "input[accept|accesskey|align<bottom?left?middle?right?top|alt"
                                + "|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang"
                                + "|maxlength|name|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onselect"
                                + "|readonly<readonly|size|src|style|tabindex|title"
                                + "|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text"
                                + "|usemap|value],"
                                + "ins[cite|class|datetime|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "isindex[class|dir<ltr?rtl|id|lang|prompt|style|title],"
                                + "kbd[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "label[accesskey|class|dir<ltr?rtl|for|id|lang|onblur|onclick|ondblclick"
                                + "|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout"
                                + "|onmouseover|onmouseup|style|title],"
                                + "legend[align<bottom?left?right?top|accesskey|class|dir<ltr?rtl|id|lang"
                                + "|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "li[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title|type"
                                + "|value],"
                                + "link[charset|class|dir<ltr?rtl|href|hreflang|id|lang|media|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|rel|rev|style|title|target|type],"
                                + "map[class|dir<ltr?rtl|id|lang|name|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "menu[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "meta[content|dir<ltr?rtl|http-equiv|lang|name|scheme],"
                                + "noframes[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "noscript[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "object[align<bottom?left?middle?right?top|archive|border|class|classid"
                                + "|codebase|codetype|data|declare|dir<ltr?rtl|height|hspace|id|lang|name"
                                + "|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|standby|style|tabindex|title|type|usemap"
                                + "|vspace|width],"
                                + "ol[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|start|style|title|type],"
                                + "optgroup[class|dir<ltr?rtl|disabled<disabled|id|label|lang|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|style|title],"
                                + "option[class|dir<ltr?rtl|disabled<disabled|id|label|lang|onclick|ondblclick"
                                + "|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout"
                                + "|onmouseover|onmouseup|selected<selected|style|title|value],"
                                + "#p,"
                                + "param[id|name|type|value|valuetype<DATA?OBJECT?REF],"
                                + "pre/listing/plaintext/xmp[align|class|dir<ltr?rtl|id|lang|onclick|ondblclick"
                                + "|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout"
                                + "|onmouseover|onmouseup|style|title|width],"
                                + "q[cite|class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "s[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],"
                                + "samp[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "script[charset|defer|language|src|type],"
                                + "select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name"
                                + "|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|size|style"
                                + "|tabindex|title],"
                                + "small[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "span[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "strike[class|class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title],"
                                + "strong/b,"
                                + "style[dir<ltr?rtl|lang|media|title|type],"
                                + "sub[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "sup[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title],"
                                + "table[align<center?left?right|bgcolor|border|cellpadding|cellspacing|class"
                                + "|dir<ltr?rtl|frame|height|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|rules"
                                + "|style|summary|title|width],"
                                + "tbody[align<center?char?justify?left?right|char|class|charoff|dir<ltr?rtl|id"
                                + "|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown"
                                + "|onmousemove|onmouseout|onmouseover|onmouseup|style|title"
                                + "|valign<baseline?bottom?middle?top],"
                                + "td[abbr|align<center?char?justify?left?right|axis|bgcolor|char|charoff|class"
                                + "|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|rowspan|scope<col?colgroup?row?rowgroup"
                                + "|style|title|valign<baseline?bottom?middle?top|width],"
                                + "textarea[accesskey|class|cols|dir<ltr?rtl|disabled<disabled|id|lang|name"
                                + "|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onselect"
                                + "|readonly<readonly|rows|style|tabindex|title],"
                                + "tfoot[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id"
                                + "|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown"
                                + "|onmousemove|onmouseout|onmouseover|onmouseup|style|title"
                                + "|valign<baseline?bottom?middle?top],"
                                + "th[abbr|align<center?char?justify?left?right|axis|bgcolor|char|charoff|class"
                                + "|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|onclick"
                                + "|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
                                + "|onmouseout|onmouseover|onmouseup|rowspan|scope<col?colgroup?row?rowgroup"
                                + "|style|title|valign<baseline?bottom?middle?top|width],"
                                + "thead[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id"
                                + "|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown"
                                + "|onmousemove|onmouseout|onmouseover|onmouseup|style|title"
                                + "|valign<baseline?bottom?middle?top],"
                                + "title[dir<ltr?rtl|lang],"
                                + "tr[abbr|align<center?char?justify?left?right|bgcolor|char|charoff|class"
                                + "|rowspan|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title|valign<baseline?bottom?middle?top],"
                                + "tt[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],"
                                + "u[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
                                + "|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],"
                                + "ul[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown"
                                + "|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover"
                                + "|onmouseup|style|title|type],"
                                + "var[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
                                + "|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
                                + "|title]",

        // No need to modify following 'extended_valid_elements'
        extended_valid_elements: "marquee[behavior|bgcolor|direction|height|hspace|loop|scrollamount|scrolldelay|truespeed|vspace|width],-strong/-b[class|style],-em/-i[class|style],-strike[class|style],-u[class|style],iframe[align|frameborder|height|hspace|name|scrolling|src|vspace|width],noindex",


        init_instance_callback: function (ed) {

            editor = ed;
        }

        //        setup: function (ed) {

        //            ed.addButton('example', {
        //                title: 'My title',
        //                image: '../Images/link.png',
        //                onclick: function () {
        //                    //ed.insertContent('Hello world!!');
        //                    var node = tinyMCE.activeEditor.selection.getNode();

        //                    //alert(node.length);

        //                    tinyMCE.DOM.setStyle(node, 'background-color', '#FF6600');
        //                }
        //            });
        //        }
    });

});     // Document on load complete

// Script block for TinyMCE editor - End

// Script block for dragable list - Start
$(function () {

    LoadDefaultFields();

    LoadContentFieldCategory();

    //LoadOnDemandFields();

    InitializeDragableList();

    $("select[id*='ddlContentFieldCategory']").change(function () {

        if ($(this).val() != 'Select') {
            //LoadOnDemandFields($(this).val())

            InitializeDragableList();
        }
        else {
            $('.on-demand-fields > div > ul').empty();
        }

    });

});

function InitializeDragableList() {

    //    $(".all-fields li").draggable(
    //    {
    //        appendTo: "body",
    //        helper: "clone",
    //        cursor: "select",
    //        revert: "invalid"
    //    });


    //    $('#editorcontainer').droppable(
    //    {
    //        drop: function (event, ui) 
    //        {
    //            var $this = $(this);

    //            var tempid = ui.draggable.text();

    //            var dropText;

    //            dropText = " {" + tempid + "} ";

    //            tinyMCE.activeEditor.execCommand('mceInsertContent', false, dropText); // This code will drop(add) dragged content to current cursor position in editor
    //        }
    //    });

    //$(".all-fields li").unbind('click');
    $(document).on('mouseenter', '.all-fields li', function () {
        $(this).children().children("span").addClass("label-success");
    });
    $(document).on('mouseleave', '.all-fields li', function () {
        $(this).children().children("span").removeClass("label-success");
    });

    $(document).on('click', '.all-fields li', function () {

        var tempid = $(this).text();

        var dropText;

        dropText = " {" + tempid + "} ";

        tinyMCE.activeEditor.execCommand('mceInsertContent', false, dropText);
    });

}

// Script block for dragable list - End



// Script block to retrive data - Start

var Url = '../Handlers/TinyMCEEditorHandler.ashx';

function LoadDefaultFields() {

    $.ajax({

        //type: 'POST',

        url: Url,

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: { 'MethodName': 'GetDefaultFields' },

        dataType: "json",

        success: function (data) {

            var defaultList = $('.defaultFieldUL');

            //var defaultList = $('.default-fields > div > ul');
            $.each(data, function (i) {
                debugger;
                var li = $('<li/>').append(
                    $('<h4/>').append($('<span/>')
                    .addClass('label label-primary cursor-pointer')
                                .attr('id', 'Li' + (i + 1))
                                .text(this))).addClass('ui-draggable')
                                .appendTo(defaultList);
            });
        },
        error: function (data) {
            alert("Error Loading Default Fields");
        }
    });
}


function LoadOnDemandFields(CateogryId) {

    $.ajax({

        //type: 'POST',

        url: Url,

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: { 'MethodName': 'GetOnDemandFields', 'CategoryId': CateogryId },

        dataType: "json",

        success: function (data) {
            //var defaultList = $('.on-demand-fields > div > ul');
            var defaultList = $('.on-demand-fields > div >div >div>ul')
            $(defaultList).empty();

            $.each(data, function (i) {
                var li = $('<li/>').append(
                   $('<h4/>').append($('<span/>')
                   .addClass('label label-primary cursor-pointer')
                               .attr('id', 'Li' + (i + 1))
                               .text(this))).addClass('ui-draggable')
                               .appendTo(defaultList);
            });
        },
        error: function (data) {
            alert("Error Loading On Demand Fields");
        }
    });
}

function LoadContentFieldCategory() {

    $.ajax({

        //type: 'POST',

        url: Url,

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: { 'MethodName': 'GetContentFieldsCategory' },

        dataType: "json",

        success: function (data) {
            $("select[id*='ddlContentFieldCategory']").append(new Option('Select', 'Select'));

            $.each(data, function (index, item) {

                $("select[id*='ddlContentFieldCategory']").append(new Option(item.CategoryName, item.CategoryId));

            });
        },
        error: function (data) {
            alert("Error Loading Field Category");
        }
    });
}

// Script block to retrive data - End

