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
    
    public partial class previous_company_details
    {
        public int prevcomp_id { get; set; }
        public int employee_id { get; set; }
        public string pf_account_number { get; set; }
        public string pf_employers_code_number { get; set; }
        public string fps_account_number { get; set; }
        public string life_insurance { get; set; }
        public string mediclaim { get; set; }
        public string esi_insurance_number { get; set; }
        public string esi_employers_code_number { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
