namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class employee_refcheckModel.
    /// </summary>
    public partial class employee_refcheckModel
    {
        /// <summary>
        /// Gets or sets the refcheck identifier.
        /// </summary>
        /// <value>The refcheck identifier.</value>
        public int refcheck_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the name of the previous company.
        /// </summary>
        /// <value>The name of the previous company.</value>
        public string previous_company_name { get; set; }
        /// <summary>
        /// Gets or sets the previous company address.
        /// </summary>
        /// <value>The previous company address.</value>
        public string previous_company_address { get; set; }
        /// <summary>
        /// Gets or sets the details furnished by.
        /// </summary>
        /// <value>The details furnished by.</value>
        public string details_furnished_by { get; set; }
        /// <summary>
        /// Gets or sets the designation.
        /// </summary>
        /// <value>The designation.</value>
        public string designation { get; set; }
        /// <summary>
        /// Gets or sets the department.
        /// </summary>
        /// <value>The department.</value>
        public string department { get; set; }
        /// <summary>
        /// Gets or sets the reporting to.
        /// </summary>
        /// <value>The reporting to.</value>
        public string reporting_to { get; set; }
        /// <summary>
        /// Gets or sets the reporting designation.
        /// </summary>
        /// <value>The reporting designation.</value>
        public string reporting_designation { get; set; }
        /// <summary>
        /// Gets or sets the monthly salary.
        /// </summary>
        /// <value>The monthly salary.</value>
        public Nullable<decimal> monthly_salary { get; set; }
        /// <summary>
        /// Gets or sets the reason for leaving.
        /// </summary>
        /// <value>The reason for leaving.</value>
        public string reason_for_leaving { get; set; }
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
        /// Gets or sets the name of the verified by.
        /// </summary>
        /// <value>The name of the verified by.</value>
        public string verified_by_name { get; set; }
        /// <summary>
        /// Gets or sets the verified by date.
        /// </summary>
        /// <value>The verified by date.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> verified_by_date { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
