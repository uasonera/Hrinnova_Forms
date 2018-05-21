namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Class departmentModel.
    /// </summary>
    public partial class departmentModel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="departmentModel"/> class.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public departmentModel()
        {
            this.additional_information = new HashSet<additional_informationModel>();
            this.employee_details = new HashSet<employee_detailsModel>();
        }

        /// <summary>
        /// Gets or sets the dept identifier.
        /// </summary>
        /// <value>The dept identifier.</value>
        public int DeptID { get; set; }
        /// <summary>
        /// Gets or sets the name of the dept.
        /// </summary>
        /// <value>The name of the dept.</value>
        public string DeptName { get; set; }
        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        /// <value>The description.</value>
        public string Description { get; set; }
        /// <summary>
        /// Gets or sets the increment period.
        /// </summary>
        /// <value>The increment period.</value>
        public Nullable<int> IncrementPeriod { get; set; }
        /// <summary>
        /// Gets or sets the dept code.
        /// </summary>
        /// <value>The dept code.</value>
        public string DeptCode { get; set; }
        /// <summary>
        /// Gets or sets the is multiple shift.
        /// </summary>
        /// <value>The is multiple shift.</value>
        public Nullable<bool> IsMultipleShift { get; set; }
        /// <summary>
        /// Gets or sets the probation period.
        /// </summary>
        /// <value>The probation period.</value>
        public Nullable<int> ProbationPeriod { get; set; }
        /// <summary>
        /// Gets or sets the looked by emp.
        /// </summary>
        /// <value>The looked by emp.</value>
        public string LookedByEmp { get; set; }
        /// <summary>
        /// Gets or sets the notice period.
        /// </summary>
        /// <value>The notice period.</value>
        public Nullable<int> NoticePeriod { get; set; }

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
    }
}
