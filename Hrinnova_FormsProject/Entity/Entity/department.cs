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
    
    public partial class department
    {
        public int DeptID { get; set; }
        public string DeptName { get; set; }
        public string Description { get; set; }
        public Nullable<int> IncrementPeriod { get; set; }
        public string DeptCode { get; set; }
        public Nullable<bool> IsMultipleShift { get; set; }
        public Nullable<int> ProbationPeriod { get; set; }
        public string LookedByEmp { get; set; }
        public Nullable<int> NoticePeriod { get; set; }
    }
}