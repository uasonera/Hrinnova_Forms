namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class additional_informationModel.
    /// </summary>
    public partial class additional_informationModel
    {
        /// <summary>
        /// Gets or sets the additionalinformation identifier.
        /// </summary>
        /// <value>The additionalinformation identifier.</value>
        public int additionalinformation_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the known to presentemployee.
        /// </summary>
        /// <value>The known to presentemployee.</value>
        [Required(ErrorMessage ="Known to present employee field is required")]
        public string known_to_presentemployee { get; set; }
        /// <summary>
        /// Gets or sets the name of knownemployee.
        /// </summary>
        /// <value>The name of knownemployee.</value>
        [RegularExpression("^[a-zA-Z_ ]*$", ErrorMessage = "Name cannot contain numbers or special characters")]
        public string name_of_knownemployee { get; set; }
        /// <summary>
        /// Gets or sets the relationship with knownemployee.
        /// </summary>
        /// <value>The relationship with knownemployee.</value>
        public string relationship_with_knownemployee { get; set; }
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
        /// Gets or sets the role identifier.
        /// </summary>
        /// <value>The role identifier.</value>
        public Nullable<int> roleID { get; set; }
        /// <summary>
        /// Gets or sets the dept identifier.
        /// </summary>
        /// <value>The dept identifier.</value>
        public Nullable<int> DeptID { get; set; }

        /// <summary>
        /// Gets or sets the department.
        /// </summary>
        /// <value>The department.</value>
        public virtual departmentModel department { get; set; }
        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
        /// <summary>
        /// Gets or sets the role.
        /// </summary>
        /// <value>The role.</value>
        public virtual roleModel role { get; set; }
    }
}
