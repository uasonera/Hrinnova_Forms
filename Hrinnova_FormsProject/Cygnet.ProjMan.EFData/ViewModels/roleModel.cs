namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Class roleModel.
    /// </summary>
    public partial class roleModel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="roleModel"/> class.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public roleModel()
        {
            this.additional_information = new HashSet<additional_informationModel>();
            this.employee_details = new HashSet<employee_detailsModel>();
        }

        /// <summary>
        /// Gets or sets the role identifier.
        /// </summary>
        /// <value>The role identifier.</value>
        public int roleID { get; set; }
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string name { get; set; }
        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        /// <value>The description.</value>
        public string description { get; set; }
        /// <summary>
        /// Gets or sets the infrastructure cost.
        /// </summary>
        /// <value>The infrastructure cost.</value>
        public Nullable<decimal> InfrastructureCost { get; set; }
        /// <summary>
        /// Gets or sets the abbreviation.
        /// </summary>
        /// <value>The abbreviation.</value>
        public string Abbreviation { get; set; }
        /// <summary>
        /// Gets or sets the per desk cost.
        /// </summary>
        /// <value>The per desk cost.</value>
        public Nullable<decimal> PerDeskCost { get; set; }

        /// <summary>
        /// Gets or sets the additional information.
        /// </summary>
        /// <value>The additional information.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<additional_informationModel> additional_information { get; set; }
        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<employee_detailsModel> employee_details { get; set; }
        /// <summary>
        /// Gets or sets the role1.
        /// </summary>
        /// <value>The role1.</value>
        public virtual roleModel role1 { get; set; }
        /// <summary>
        /// Gets or sets the role2.
        /// </summary>
        /// <value>The role2.</value>
        public virtual roleModel role2 { get; set; }
    }
}
