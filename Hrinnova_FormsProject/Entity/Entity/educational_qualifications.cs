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
    
    public partial class educational_qualifications
    {
        public int eduqualifications_id { get; set; }
        public int employee_id { get; set; }
        public string tenth_school { get; set; }
        public string tenth_board { get; set; }
        public string tenth_yearofpassing { get; set; }
        public string tenth_grade { get; set; }
        public string twelfth_school { get; set; }
        public string twelfth_board { get; set; }
        public string twelfth_yearofpassing { get; set; }
        public string twelfth_grade { get; set; }
        public string bachelors_college { get; set; }
        public string bachelors_university { get; set; }
        public string bachelors_yearofpassing { get; set; }
        public string bachelors_grade { get; set; }
        public string masters_college { get; set; }
        public string masters_university { get; set; }
        public string masters_yearofpassing { get; set; }
        public string masters_grade { get; set; }
        public string other_school { get; set; }
        public string other_board { get; set; }
        public string other_yearofpassing { get; set; }
        public string other_grade { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
