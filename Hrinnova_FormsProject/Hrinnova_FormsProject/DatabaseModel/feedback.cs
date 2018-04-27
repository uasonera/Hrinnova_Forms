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

    public partial class feedback
    {
        public int feedback_id { get; set; }
        public int employee_id { get; set; }
        [Required(ErrorMessage ="HR Manual field can not be left empty")]
        public string hr_manual { get; set; }
        [Required(ErrorMessage = "CIMS ID/Password field can not be left empty")]
        public string cims_idpassword { get; set; }
        [Required(ErrorMessage = "Books field can not be left empty")]
        public string books { get; set; }
        [Required(ErrorMessage = "Library Card field can not be left empty")]
        public string library_card { get; set; }
        [Required(ErrorMessage = "HR Any Other field can not be left empty")]
        public string hr_anyother { get; set; }
        [Required(ErrorMessage = "Identity Card field can not be left empty")]
        public string identitycard { get; set; }
        [Required(ErrorMessage = "Bank Account field can not be left empty")]
        public string bank_account { get; set; }
        [Required(ErrorMessage = "Notepad field can not be left empty")]
        public string notepad { get; set; }
        [Required(ErrorMessage = "Pen field can not be left empty")]
        public string pen { get; set; }
        [Required(ErrorMessage = "Employee Card field can not be left empty")]
        public string employee_card { get; set; }
        [Required(ErrorMessage = "Admin any other field can not be left empty")]
        public string admin_anyother { get; set; }
        [Required(ErrorMessage = "Computer System field can not be left empty")]
        public string computer_system { get; set; }
        [Required(ErrorMessage = "Headphones field can not be left empty")]
        public string headphones { get; set; }
        [Required(ErrorMessage = "EmailId/Password field can not be left empty")]
        public string emailid_password { get; set; }
        [Required(ErrorMessage = "Network IP field can not be left empty")]
        public string network_ip { get; set; }
        [Required(ErrorMessage = "Firewall ID field can not be left empty")]
        public string firewall_id { get; set; }
        [Required(ErrorMessage = "Domain Username/Password field can not be left empty")]
        public string domain_usernamepassword { get; set; }
        [Required(ErrorMessage = "Messenger Access field can not be left empty")]
        public string messengers_access { get; set; }
        [Required(ErrorMessage = "System Admin any other field can not be left empty")]
        public string systemadmin_anyother { get; set; }
        [Required(ErrorMessage = "HR Manual and ISMS Responsibilities field can not be left empty")]
        public string hrmanual_and_responsibilities { get; set; }
        

        public virtual employee_details employee_details { get; set; }
    }
}
