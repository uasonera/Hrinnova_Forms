namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class prev_employ_1Model.
    /// </summary>
    public partial class prev_employ_1Model
    {
        /// <summary>
        /// Gets or sets the prevemploy identifier.
        /// </summary>
        /// <value>The prevemploy identifier.</value>
        public int prevemploy_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the employment reference.
        /// </summary>
        /// <value>The employment reference.</value>
        public string employment_ref { get; set; }
        /// <summary>
        /// Gets or sets the name of the employers.
        /// </summary>
        /// <value>The name of the employers.</value>
        public string employers_name { get; set; }
        /// <summary>
        /// Gets or sets the designation.
        /// </summary>
        /// <value>The designation.</value>
        public string designation { get; set; }
        /// <summary>
        /// Gets or sets the periodworked from.
        /// </summary>
        /// <value>The periodworked from.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> periodworked_from { get; set; }
        /// <summary>
        /// Gets or sets the periodworked to.
        /// </summary>
        /// <value>The periodworked to.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> periodworked_to { get; set; }
        /// <summary>
        /// Gets or sets the reason of leaving.
        /// </summary>
        /// <value>The reason of leaving.</value>
        public string reason_of_leaving { get; set; }
        /// <summary>
        /// Gets or sets the reporting manager.
        /// </summary>
        /// <value>The reporting manager.</value>
        public string reporting_manager { get; set; }
        /// <summary>
        /// Gets or sets the rm designation.
        /// </summary>
        /// <value>The rm designation.</value>
        public string rm_designation { get; set; }
        /// <summary>
        /// Gets or sets the rm contact.
        /// </summary>
        /// <value>The rm contact.</value>
        public string rm_contact { get; set; }
        /// <summary>
        /// Gets or sets the CTC.
        /// </summary>
        /// <value>The CTC.</value>
        public string ctc { get; set; }
        /// <summary>
        /// Gets or sets the monthly gross salary.
        /// </summary>
        /// <value>The monthly gross salary.</value>
        public string monthly_gross_salary { get; set; }
        /// <summary>
        /// Gets or sets the pr employee identifier.
        /// </summary>
        /// <value>The pr employee identifier.</value>
        public string pr_employee_id { get; set; }
        /// <summary>
        /// Gets or sets the attendence.
        /// </summary>
        /// <value>The attendence.</value>
        public string attendence { get; set; }
        /// <summary>
        /// Gets or sets the re hire status.
        /// </summary>
        /// <value>The re hire status.</value>
        public string re_hire_status { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
