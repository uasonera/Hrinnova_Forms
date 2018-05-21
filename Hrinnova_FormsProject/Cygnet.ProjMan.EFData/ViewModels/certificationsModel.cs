

namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Class certificationsModel.
    /// </summary>
    public partial class certificationsModel
    {
        /// <summary>
        /// Gets or sets the certifications identifier.
        /// </summary>
        /// <value>The certifications identifier.</value>
        public int certifications_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the type of the cert.
        /// </summary>
        /// <value>The type of the cert.</value>
        public string cert_type { get; set; }
        /// <summary>
        /// Gets or sets the name of the certification.
        /// </summary>
        /// <value>The name of the certification.</value>
        public string certification_name { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
