//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    
    public partial class roleModel
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public roleModel()
        {
            this.additional_information = new HashSet<additional_informationModel>();
            this.employee_details = new HashSet<employee_detailsModel>();
        }
    
        public int roleID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Nullable<decimal> InfrastructureCost { get; set; }
        public string Abbreviation { get; set; }
        public Nullable<decimal> PerDeskCost { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<additional_informationModel> additional_information { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<employee_detailsModel> employee_details { get; set; }
        public virtual roleModel role1 { get; set; }
        public virtual roleModel role2 { get; set; }
    }
}
