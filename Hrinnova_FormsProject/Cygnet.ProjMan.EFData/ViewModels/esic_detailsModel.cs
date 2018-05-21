namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class esic_detailsModel.
    /// </summary>
    public partial class esic_detailsModel
    {
        /// <summary>
        /// Gets or sets the esic identifier.
        /// </summary>
        /// <value>The esic identifier.</value>
        public int esic_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the insurance number.
        /// </summary>
        /// <value>The insurance number.</value>
        public string insurance_number { get; set; }
        /// <summary>
        /// Gets or sets the branch office.
        /// </summary>
        /// <value>The branch office.</value>
        public string branch_office { get; set; }
        /// <summary>
        /// Gets or sets the dispensary.
        /// </summary>
        /// <value>The dispensary.</value>
        public string dispensary { get; set; }
        /// <summary>
        /// Gets or sets the employers code.
        /// </summary>
        /// <value>The employers code.</value>
        public string employers_code { get; set; }
        /// <summary>
        /// Gets or sets the date of appointment.
        /// </summary>
        /// <value>The date of appointment.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> date_of_appointment { get; set; }
        /// <summary>
        /// Gets or sets the employers nameandaddress.
        /// </summary>
        /// <value>The employers nameandaddress.</value>
        public string employers_nameandaddress { get; set; }
        /// <summary>
        /// Gets or sets the previous insurance number.
        /// </summary>
        /// <value>The previous insurance number.</value>
        public string previous_insurance_number { get; set; }
        /// <summary>
        /// Gets or sets the name of nominee.
        /// </summary>
        /// <value>The name of nominee.</value>
        public string name_of_nominee { get; set; }
        /// <summary>
        /// Gets or sets the nominee relationship.
        /// </summary>
        /// <value>The nominee relationship.</value>
        public string nominee_relationship { get; set; }
        /// <summary>
        /// Gets or sets the nominee address.
        /// </summary>
        /// <value>The nominee address.</value>
        public string nominee_address { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
