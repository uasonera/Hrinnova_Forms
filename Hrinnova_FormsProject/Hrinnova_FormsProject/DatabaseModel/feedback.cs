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
    
    public partial class feedback
    {
        public int feedback_id { get; set; }
        public int employee_id { get; set; }
        public string hr_manual { get; set; }
        public string cims_idpassword { get; set; }
        public string books { get; set; }
        public string library_card { get; set; }
        public string hr_anyother { get; set; }
        public string identitycard { get; set; }
        public string bank_account { get; set; }
        public string notepad { get; set; }
        public string pen { get; set; }
        public string employee_card { get; set; }
        public string admin_anyother { get; set; }
        public string computer_system { get; set; }
        public string headphones { get; set; }
        public string emailid_password { get; set; }
        public string network_ip { get; set; }
        public string firewall_id { get; set; }
        public string domain_usernamepassword { get; set; }
        public string messengers_access { get; set; }
        public string systemadmin_anyother { get; set; }
        public string hrmanual_and_responsibilities { get; set; }
    
        public virtual employee_details employee_details { get; set; }
    }
}
