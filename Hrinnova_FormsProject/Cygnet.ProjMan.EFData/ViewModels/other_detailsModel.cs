namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class other_detailsModel.
    /// </summary>
    public partial class other_detailsModel
    {
        /// <summary>
        /// Gets or sets the otherdet identifier.
        /// </summary>
        /// <value>The otherdet identifier.</value>
        public int otherdet_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the name of the propertyowner.
        /// </summary>
        /// <value>The name of the propertyowner.</value>
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Name cannot contain numbers or special characters")]
        public string propertyowner_name { get; set; }
        /// <summary>
        /// Gets or sets the propertyowner contact.
        /// </summary>
        /// <value>The propertyowner contact.</value>
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string propertyowner_contact { get; set; }
        /// <summary>
        /// Gets or sets the propertyowner address.
        /// </summary>
        /// <value>The propertyowner address.</value>
        public string propertyowner_address { get; set; }
        /// <summary>
        /// Gets or sets the propertyowner occupation.
        /// </summary>
        /// <value>The propertyowner occupation.</value>
        public string propertyowner_occupation { get; set; }
        /// <summary>
        /// Gets or sets the name of the neighbour1.
        /// </summary>
        /// <value>The name of the neighbour1.</value>
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Firstname cannot contain numbers or special characters")]
        public string neighbour1_name { get; set; }
        /// <summary>
        /// Gets or sets the neighbour1 contact.
        /// </summary>
        /// <value>The neighbour1 contact.</value>
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string neighbour1_contact { get; set; }
        /// <summary>
        /// Gets or sets the neighbour1 address.
        /// </summary>
        /// <value>The neighbour1 address.</value>
        public string neighbour1_address { get; set; }
        /// <summary>
        /// Gets or sets the neighbour1 occupation.
        /// </summary>
        /// <value>The neighbour1 occupation.</value>
        public string neighbour1_occupation { get; set; }
        /// <summary>
        /// Gets or sets the name of the neighbour2.
        /// </summary>
        /// <value>The name of the neighbour2.</value>
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Firstname cannot contain numbers or special characters")]
        public string neighbour2_name { get; set; }
        /// <summary>
        /// Gets or sets the neighbour2 contact.
        /// </summary>
        /// <value>The neighbour2 contact.</value>
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string neighbour2_contact { get; set; }
        /// <summary>
        /// Gets or sets the neighbour2 address.
        /// </summary>
        /// <value>The neighbour2 address.</value>
        public string neighbour2_address { get; set; }
        /// <summary>
        /// Gets or sets the neighbour2 occupation.
        /// </summary>
        /// <value>The neighbour2 occupation.</value>
        public string neighbour2_occupation { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
