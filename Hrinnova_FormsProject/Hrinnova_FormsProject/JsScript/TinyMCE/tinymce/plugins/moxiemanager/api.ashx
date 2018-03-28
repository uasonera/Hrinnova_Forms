<%@ WebHandler Language="C#" Class="api" %>

using System;
using System.Web;
using System.Collections.Generic;

public class api : IHttpHandler 
{
    
    public void ProcessRequest (HttpContext context) 
    {
        //context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");

        Result result = new Result()
        {
            name = "testfiles",

            path = @"/Images",

            meta = new Meta()
            {
                standalone = false
            },

            config = new Config()
            {
                hidden_tools = "",

                disabled_tools = "",

                filesystem_extensions = "*",

                force_directory_template = false,

                maxsize = "10MB",

                chunk_size = "1mb",

                upload_extensions = "*",

                createdoc_templates = @"/Images",

                createdoc_fields = "Document title=title",

                createdir_templates = @"Image folder=/Images/directory"
            }
        };
        
        List<Result> r = new List<Result>();
        
        r.Add(result);
        
        RootObject rootObject = new RootObject()
        {
            jsonrpc = "2.0",

            result = r,
            
            id = "i0"
        };

        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        
        String jsonResponse = serializer.Serialize(rootObject);

        jsonResponse = jsonResponse.Replace("icon_16x16", "ui.icon_16x16");

        jsonResponse = jsonResponse.Replace("hidden_tools", "general.hidden_tools");

        jsonResponse = jsonResponse.Replace("disabled_tools", "general.disabled_tools");

        jsonResponse = jsonResponse.Replace("filesystem_extensions", "filesystem.extensions");

        jsonResponse = jsonResponse.Replace("force_directory_template", "filesystem.force_directory_template");

        jsonResponse = jsonResponse.Replace("maxsize", "upload.maxsize");

        jsonResponse = jsonResponse.Replace("chunk_size", "upload.chunk_size");

        jsonResponse = jsonResponse.Replace("upload_extensions", "upload.extensions");

        jsonResponse = jsonResponse.Replace("createdoc_templates", "createdoc.templates");

        jsonResponse = jsonResponse.Replace("createdoc_fields", "createdoc.fields");

        jsonResponse = jsonResponse.Replace("createdir_templates", "createdir.templates");
        
        System.Web.HttpContext.Current.Response.Write(jsonResponse);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}

public class Meta
{
    public bool standalone { get; set; }
    public string icon_16x16 { get; set; } // ui.icon_16x16
}

public class Config
{
    public string hidden_tools { get; set; } //general.hidden_tools
    public string disabled_tools { get; set; } // general.disabled_tools
    public string filesystem_extensions { get; set; } // filesystem.extensions
    public bool force_directory_template { get; set; } // filesystem.force_directory_template
    public string maxsize { get; set; } // upload.maxsize
    public string chunk_size { get; set; } // upload.chunk_size
    public string upload_extensions { get; set; } // upload.extensions
    public string createdoc_templates { get; set; } // createdoc.templates
    public string createdoc_fields { get; set; } // createdoc.fields
    public string createdir_templates { get; set; } // createdir.templates
}

public class Result
{
    public string name { get; set; }
    public string path { get; set; }
    public Meta meta { get; set; }
    public Config config { get; set; }
}

public class RootObject
{
    public string jsonrpc { get; set; }
    public List<Result> result { get; set; }
    public string id { get; set; }
}