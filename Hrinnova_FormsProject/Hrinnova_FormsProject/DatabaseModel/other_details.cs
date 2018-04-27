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
    using System.ComponentModel.DataAnnotations;

    public partial class other_details
    {
        public int otherdet_id { get; set; }
        public int employee_id { get; set; }
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Name cannot contain numbers or special characters")]
        public string propertyowner_name { get; set; }
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string propertyowner_contact { get; set; }
        public string propertyowner_address { get; set; }
        public string propertyowner_occupation { get; set; }
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Firstname cannot contain numbers or special characters")]
        public string neighbour1_name { get; set; }
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string neighbour1_contact { get; set; }
        public string neighbour1_address { get; set; }
        public string neighbour1_occupation { get; set; }
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Firstname cannot contain numbers or special characters")]
        public string neighbour2_name { get; set; }
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string neighbour2_contact { get; set; }
        public string neighbour2_address { get; set; }
        public string neighbour2_occupation { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
