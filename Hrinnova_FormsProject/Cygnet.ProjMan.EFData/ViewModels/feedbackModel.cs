namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class feedbackModel.
    /// </summary>
    public partial class feedbackModel
    {
        /// <summary>
        /// Gets or sets the feedback identifier.
        /// </summary>
        /// <value>The feedback identifier.</value>
        public int feedback_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the hr manual.
        /// </summary>
        /// <value>The hr manual.</value>
        [Required(ErrorMessage = "HR Manual field is required")]
        public string hr_manual { get; set; }
        /// <summary>
        /// Gets or sets the cims idpassword.
        /// </summary>
        /// <value>The cims idpassword.</value>
        [Required(ErrorMessage = "CIMS ID/Password field is required")]
        public string cims_idpassword { get; set; }
        /// <summary>
        /// Gets or sets the books.
        /// </summary>
        /// <value>The books.</value>
        [Required(ErrorMessage = "Books field is required")]
        public string books { get; set; }
        /// <summary>
        /// Gets or sets the library card.
        /// </summary>
        /// <value>The library card.</value>
        [Required(ErrorMessage = "Library Card field is required")]
        public string library_card { get; set; }
        /// <summary>
        /// Gets or sets the hr anyother.
        /// </summary>
        /// <value>The hr anyother.</value>
        [Required(ErrorMessage = "HR Any Other field is required")]
        public string hr_anyother { get; set; }
        /// <summary>
        /// Gets or sets the identitycard.
        /// </summary>
        /// <value>The identitycard.</value>
        [Required(ErrorMessage = "Identity Card field is required")]
        public string identitycard { get; set; }
        /// <summary>
        /// Gets or sets the bank account.
        /// </summary>
        /// <value>The bank account.</value>
        [Required(ErrorMessage = "Bank Account field is required")]
        public string bank_account { get; set; }
        /// <summary>
        /// Gets or sets the notepad.
        /// </summary>
        /// <value>The notepad.</value>
        [Required(ErrorMessage = "Notepad field is required")]
        public string notepad { get; set; }
        /// <summary>
        /// Gets or sets the pen.
        /// </summary>
        /// <value>The pen.</value>
        [Required(ErrorMessage = "Pen field is required")]
        public string pen { get; set; }
        /// <summary>
        /// Gets or sets the employee card.
        /// </summary>
        /// <value>The employee card.</value>
        [Required(ErrorMessage = "Employee Card field is required")]
        public string employee_card { get; set; }
        /// <summary>
        /// Gets or sets the admin anyother.
        /// </summary>
        /// <value>The admin anyother.</value>
        [Required(ErrorMessage = "Admin any other field is required")]
        public string admin_anyother { get; set; }
        /// <summary>
        /// Gets or sets the computer system.
        /// </summary>
        /// <value>The computer system.</value>
        [Required(ErrorMessage = "Computer System field is required")]
        public string computer_system { get; set; }
        /// <summary>
        /// Gets or sets the headphones.
        /// </summary>
        /// <value>The headphones.</value>
        [Required(ErrorMessage = "Headphones field is required")]
        public string headphones { get; set; }
        /// <summary>
        /// Gets or sets the emailid password.
        /// </summary>
        /// <value>The emailid password.</value>
        [Required(ErrorMessage = "EmailId/Password field is required")]
        public string emailid_password { get; set; }
        /// <summary>
        /// Gets or sets the network ip.
        /// </summary>
        /// <value>The network ip.</value>
        [Required(ErrorMessage = "Network IP field is required")]
        public string network_ip { get; set; }
        /// <summary>
        /// Gets or sets the firewall identifier.
        /// </summary>
        /// <value>The firewall identifier.</value>
        [Required(ErrorMessage = "Firewall ID field is required")]
        public string firewall_id { get; set; }
        /// <summary>
        /// Gets or sets the domain usernamepassword.
        /// </summary>
        /// <value>The domain usernamepassword.</value>
        [Required(ErrorMessage = "Domain Username/Password field is required")]
        public string domain_usernamepassword { get; set; }
        /// <summary>
        /// Gets or sets the messengers access.
        /// </summary>
        /// <value>The messengers access.</value>
        [Required(ErrorMessage = "Messenger Access field is required")]
        public string messengers_access { get; set; }
        /// <summary>
        /// Gets or sets the systemadmin anyother.
        /// </summary>
        /// <value>The systemadmin anyother.</value>
        [Required(ErrorMessage = "System Admin any other field is required")]
        public string systemadmin_anyother { get; set; }
        /// <summary>
        /// Gets or sets the hrmanual and responsibilities.
        /// </summary>
        /// <value>The hrmanual and responsibilities.</value>
        [Required(ErrorMessage = "HR Manual and ISMS Responsibilities field is required")]
        public string hrmanual_and_responsibilities { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
