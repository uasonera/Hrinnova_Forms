//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Cygnet.ProjMan.EFData.DataSource
{
    using System;
    using System.Collections.Generic;
    
    public partial class other_details
    {
        public int otherdet_id { get; set; }
        public int employee_id { get; set; }
        public string propertyowner_name { get; set; }
        public string propertyowner_contact { get; set; }
        public string propertyowner_address { get; set; }
        public string propertyowner_occupation { get; set; }
        public string neighbour1_name { get; set; }
        public string neighbour1_contact { get; set; }
        public string neighbour1_address { get; set; }
        public string neighbour1_occupation { get; set; }
        public string neighbour2_name { get; set; }
        public string neighbour2_contact { get; set; }
        public string neighbour2_address { get; set; }
        public string neighbour2_occupation { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}