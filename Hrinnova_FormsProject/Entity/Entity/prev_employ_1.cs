//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Entity.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class prev_employ_1
    {
        public int prevemploy_id { get; set; }
        public int employee_id { get; set; }
        public string employment_ref { get; set; }
        public string employers_name { get; set; }
        public string designation { get; set; }
        public Nullable<System.DateTime> periodworked_from { get; set; }
        public Nullable<System.DateTime> periodworked_to { get; set; }
        public string reason_of_leaving { get; set; }
        public string reporting_manager { get; set; }
        public string rm_designation { get; set; }
        public string rm_contact { get; set; }
        public string ctc { get; set; }
        public string monthly_gross_salary { get; set; }
        public string pr_employee_id { get; set; }
        public string attendence { get; set; }
        public string re_hire_status { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
