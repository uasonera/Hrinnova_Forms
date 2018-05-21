namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class epfo_detailsModel.
    /// </summary>
    public partial class epfo_detailsModel
    {
        /// <summary>
        /// Gets or sets the epfo identifier.
        /// </summary>
        /// <value>The epfo identifier.</value>
        public int epfo_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the presentcompany pfnumber.
        /// </summary>
        /// <value>The presentcompany pfnumber.</value>
        public string presentcompany_pfnumber { get; set; }

        /// <summary>
        /// Gets or sets the member of epfoscheme.
        /// </summary>
        /// <value>The member of epfoscheme.</value>
        /// 
        [Required(ErrorMessage ="Member of EpfoScheme is required")]
        public string member_of_epfoscheme { get; set; }

        /// <summary>
        /// Gets or sets the member of epsscheme.
        /// </summary>
        /// <value>The member of epsscheme.</value>
        [Required(ErrorMessage = "Member of EPSScheme is required")]
        public string member_of_epsscheme { get; set; }
        /// <summary>
        /// Gets or sets the universal account number.
        /// </summary>
        /// <value>The universal account number.</value>
        public string universal_account_number { get; set; }
        /// <summary>
        /// Gets or sets the previous pf acc number.
        /// </summary>
        /// <value>The previous pf acc number.</value>
        public string prev_pf_acc_number { get; set; }
        /// <summary>
        /// Gets or sets the scheme certificate number.
        /// </summary>
        /// <value>The scheme certificate number.</value>
        public string scheme_certificate_number { get; set; }
        /// <summary>
        /// Gets or sets the ppo number.
        /// </summary>
        /// <value>The ppo number.</value>
        public string ppo_number { get; set; }

        /// <summary>
        /// Gets or sets the international worker.
        /// </summary>
        /// <value>The international worker.</value>
        public string international_worker { get; set; }
        /// <summary>
        /// Gets or sets the country of origin.
        /// </summary>
        /// <value>The country of origin.</value>
        public string country_of_origin { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
