namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class family_detailsModel.
    /// </summary>
    public partial class family_detailsModel
    {
        /// <summary>
        /// Gets or sets the familydet identifier.
        /// </summary>
        /// <value>The familydet identifier.</value>
        public int familydet_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the member.
        /// </summary>
        /// <value>The member.</value>
        public string member { get; set; }
        /// <summary>
        /// Gets or sets the fname.
        /// </summary>
        /// <value>The fname.</value>
        public string fname { get; set; }
        /// <summary>
        /// Gets or sets the fdateofbirth.
        /// </summary>
        /// <value>The fdateofbirth.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> fdateofbirth { get; set; }
        /// <summary>
        /// Gets or sets the faadhar.
        /// </summary>
        /// <value>The faadhar.</value>
        public string faadhar { get; set; }
        /// <summary>
        /// Gets or sets the fcontact.
        /// </summary>
        /// <value>The fcontact.</value>
        public string fcontact { get; set; }
        /// <summary>
        /// Gets or sets the foccupation.
        /// </summary>
        /// <value>The foccupation.</value>
        public string foccupation { get; set; }
        /// <summary>
        /// Gets or sets the freside.
        /// </summary>
        /// <value>The freside.</value>
        public string freside { get; set; }
        /// <summary>
        /// Gets or sets the ftown.
        /// </summary>
        /// <value>The ftown.</value>
        public string ftown { get; set; }
        /// <summary>
        /// Gets or sets the fstate.
        /// </summary>
        /// <value>The fstate.</value>
        public string fstate { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
