//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Hrinnova_FormsProject.DatabaseModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class certifications
    {
        public int certifications_id { get; set; }
        public int employee_id { get; set; }
        public string cert_type { get; set; }
        public string certification_name { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
