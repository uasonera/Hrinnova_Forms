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
    
    public partial class family_details
    {
        public int familydet_id { get; set; }
        public int employee_id { get; set; }
        public string member { get; set; }
        public string fname { get; set; }
        public Nullable<System.DateTime> fdateofbirth { get; set; }
        public string faadhar { get; set; }
        public string fcontact { get; set; }
        public string foccupation { get; set; }
        public string freside { get; set; }
        public string ftown { get; set; }
        public string fstate { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
