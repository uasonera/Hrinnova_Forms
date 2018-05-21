namespace Cygnet.ProjMan.EFData.ViewModels
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Class educational_qualificationsModel.
    /// </summary>
    public partial class educational_qualificationsModel
    {
        /// <summary>
        /// Gets or sets the eduqualifications identifier.
        /// </summary>
        /// <value>The eduqualifications identifier.</value>
        public int eduqualifications_id { get; set; }
        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the tenth school.
        /// </summary>
        /// <value>The tenth school.</value>
        public string tenth_school { get; set; }
        /// <summary>
        /// Gets or sets the tenth board.
        /// </summary>
        /// <value>The tenth board.</value>
        public string tenth_board { get; set; }
        /// <summary>
        /// Gets or sets the tenth yearofpassing.
        /// </summary>
        /// <value>The tenth yearofpassing.</value>
        public string tenth_yearofpassing { get; set; }
        /// <summary>
        /// Gets or sets the tenth grade.
        /// </summary>
        /// <value>The tenth grade.</value>
        public string tenth_grade { get; set; }
        /// <summary>
        /// Gets or sets the twelfth school.
        /// </summary>
        /// <value>The twelfth school.</value>
        public string twelfth_school { get; set; }
        /// <summary>
        /// Gets or sets the twelfth board.
        /// </summary>
        /// <value>The twelfth board.</value>
        public string twelfth_board { get; set; }
        /// <summary>
        /// Gets or sets the twelfth yearofpassing.
        /// </summary>
        /// <value>The twelfth yearofpassing.</value>
        public string twelfth_yearofpassing { get; set; }
        /// <summary>
        /// Gets or sets the twelfth grade.
        /// </summary>
        /// <value>The twelfth grade.</value>
        public string twelfth_grade { get; set; }
        /// <summary>
        /// Gets or sets the bachelors college.
        /// </summary>
        /// <value>The bachelors college.</value>
        public string bachelors_college { get; set; }
        /// <summary>
        /// Gets or sets the bachelors university.
        /// </summary>
        /// <value>The bachelors university.</value>
        public string bachelors_university { get; set; }
        /// <summary>
        /// Gets or sets the bachelors yearofpassing.
        /// </summary>
        /// <value>The bachelors yearofpassing.</value>
        public string bachelors_yearofpassing { get; set; }
        /// <summary>
        /// Gets or sets the bachelors grade.
        /// </summary>
        /// <value>The bachelors grade.</value>
        public string bachelors_grade { get; set; }
        /// <summary>
        /// Gets or sets the masters college.
        /// </summary>
        /// <value>The masters college.</value>
        public string masters_college { get; set; }
        /// <summary>
        /// Gets or sets the masters university.
        /// </summary>
        /// <value>The masters university.</value>
        public string masters_university { get; set; }
        /// <summary>
        /// Gets or sets the masters yearofpassing.
        /// </summary>
        /// <value>The masters yearofpassing.</value>
        public string masters_yearofpassing { get; set; }
        /// <summary>
        /// Gets or sets the masters grade.
        /// </summary>
        /// <value>The masters grade.</value>
        public string masters_grade { get; set; }
        /// <summary>
        /// Gets or sets the other school.
        /// </summary>
        /// <value>The other school.</value>
        public string other_school { get; set; }
        /// <summary>
        /// Gets or sets the other board.
        /// </summary>
        /// <value>The other board.</value>
        public string other_board { get; set; }
        /// <summary>
        /// Gets or sets the other yearofpassing.
        /// </summary>
        /// <value>The other yearofpassing.</value>
        public string other_yearofpassing { get; set; }
        /// <summary>
        /// Gets or sets the other grade.
        /// </summary>
        /// <value>The other grade.</value>
        public string other_grade { get; set; }

        /// <summary>
        /// Gets or sets the employee details.
        /// </summary>
        /// <value>The employee details.</value>
        public virtual employee_detailsModel employee_details { get; set; }
    }
}
