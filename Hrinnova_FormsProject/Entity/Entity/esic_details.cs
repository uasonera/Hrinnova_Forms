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
    
    public partial class esic_details
    {
        public int esic_id { get; set; }
        public int employee_id { get; set; }
        public string insurance_number { get; set; }
        public string branch_office { get; set; }
        public string dispensary { get; set; }
        public string employers_code { get; set; }
        public Nullable<System.DateTime> date_of_appointment { get; set; }
        public string employers_nameandaddress { get; set; }
        public string previous_insurance_number { get; set; }
        public string name_of_nominee { get; set; }
        public string nominee_relationship { get; set; }
        public string nominee_address { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
