namespace Cygnet.ProjMan.EFData.ViewModels
{
    using DataSource;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Class employee_detailsModel.
    /// </summary>
    public partial class employee_detailsModel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="employee_detailsModel"/> class.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public employee_detailsModel()
        {
            this.additional_information = new HashSet<additional_informationModel>();
            this.certifications = new HashSet<certificationsModel>();
            this.educational_qualifications = new HashSet<educational_qualificationsModel>();
            this.employee_refcheck = new HashSet<employee_refcheckModel>();
            this.other_details = new HashSet<other_detailsModel>();
            this.epfo_details = new HashSet<epfo_detailsModel>();
            this.esic_details = new HashSet<esic_detailsModel>();
            this.family_details = new HashSet<family_detailsModel>();
            this.feedback = new HashSet<feedbackModel>();
            this.prev_employ_1 = new HashSet<prev_employ_1Model>();
            this.previous_company_details = new HashSet<previous_company_detailsModel>();
            this.references = new HashSet<referencesModel>();
        }

        /// <summary>
        /// Gets or sets the employee identifier.
        /// </summary>
        /// <value>The employee identifier.</value>
        public int employee_id { get; set; }
        /// <summary>
        /// Gets or sets the employee code.
        /// </summary>
        /// <value>The employee code.</value>
        [Required(ErrorMessage = "Employee Code is required")]
        public string employee_code { get; set; }
        /// <summary>
        /// Gets or sets the designation.
        /// </summary>
        /// <value>The designation.</value>
        public string designation { get; set; }
        /// <summary>
        /// Gets or sets the role identifier.
        /// </summary>
        /// <value>The role identifier.</value>
        [Required(ErrorMessage = "Designation is required")]
        public Nullable<int> roleID { get; set; }
        /// <summary>
        /// Gets or sets the department.
        /// </summary>
        /// <value>The department.</value>
        public string department { get; set; }
        /// <summary>
        /// Gets or sets the dept identifier.
        /// </summary>
        /// <value>The dept identifier.</value>
        [Required(ErrorMessage = "Department is required")]
        public Nullable<int> DeptID { get; set; }
        /// <summary>
        /// Gets or sets the firstname.
        /// </summary>
        /// <value>The firstname.</value>
        [Required(ErrorMessage = "Firstname is required")]
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Firstname should not contain numbers or special characters")]
        public string firstname { get; set; }
        /// <summary>
        /// Gets or sets the middlename.
        /// </summary>
        /// <value>The middlename.</value>
        [Required(ErrorMessage = "Middlename is required")]
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Middlename should not contain numbers or special characters")]
        public string middlename { get; set; }
        /// <summary>
        /// Gets or sets the surname.
        /// </summary>
        /// <value>The surname.</value>
        [Required(ErrorMessage = "Lastname is required")]
        [RegularExpression("^[a-zA-Z/s]+$", ErrorMessage = "Lastname should not contain numbers or special characters")]
        public string surname { get; set; }
        /// <summary>
        /// Gets or sets the gender.
        /// </summary>
        /// <value>The gender.</value>
        [Required(ErrorMessage = "Gender is required")]
        public string gender { get; set; }
        /// <summary>
        /// Gets or sets the date of birth.
        /// </summary>
        /// <value>The date of birth.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> date_of_birth { get; set; }
        /// <summary>
        /// Gets or sets the date of joining.
        /// </summary>
        /// <value>The date of joining.</value>
        [Required(ErrorMessage = "Date of Joining is required")]
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> date_of_joining { get; set; }
        /// <summary>
        /// Gets or sets the marital status.
        /// </summary>
        /// <value>The marital status.</value>
        [Required(ErrorMessage = "Marital Status is required")]
        public Nullable<int> marital_status { get; set; }
        /// <summary>
        /// Gets or sets the marriage anniversary.
        /// </summary>
        /// <value>The marriage anniversary.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> marriage_anniversary { get; set; }
        /// <summary>
        /// Gets or sets the blood group.
        /// </summary>
        /// <value>The blood group.</value>
        public string blood_group { get; set; }
        /// <summary>
        /// Gets or sets the mobile number.
        /// </summary>
        /// <value>The mobile number.</value>
        [Required(ErrorMessage = "Contact Number is required")]
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid 10 digit Mobile Number")]
        public string mobile_number { get; set; }
        /// <summary>
        /// Gets or sets the home number.
        /// </summary>
        /// <value>The home number.</value>
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string home_number { get; set; }
        /// <summary>
        /// Gets or sets the alternate number.
        /// </summary>
        /// <value>The alternate number.</value>
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string alternate_number { get; set; }
        /// <summary>
        /// Gets or sets the emergency number.
        /// </summary>
        /// <value>The emergency number.</value>
        [Required(ErrorMessage = "Emergency Number is required")]
        [RegularExpression("^([+][9][1]|[9][1]|[0]){0,1}([0-9]{1})([0-9]{9})$", ErrorMessage = "Please enter a valid Phone Number")]
        public string emergency_number { get; set; }
        /// <summary>
        /// Gets or sets the email identifier.
        /// </summary>
        /// <value>The email identifier.</value>
        [DataType(DataType.EmailAddress, ErrorMessage = "Please provide a valid Email-ID")]
        public string email_id { get; set; }
        /// <summary>
        /// Gets or sets the permanent address.
        /// </summary>
        /// <value>The permanent address.</value>
        [Required(ErrorMessage = "Permanent Address is required")]
        public string permanent_address { get; set; }
        /// <summary>
        /// Gets or sets the temporary address.
        /// </summary>
        /// <value>The temporary address.</value>
        [Required(ErrorMessage = "Temporary Address is required")]
        public string temporary_address { get; set; }
        /// <summary>
        /// Gets or sets the aadhar card.
        /// </summary>
        /// <value>The aadhar card.</value>
        [Required(ErrorMessage = "Aadhar Card is required")]
        [RegularExpression("^([0-9]{12})$", ErrorMessage = "Please enter a valid Aadhar Number (Contains 12 digits without alphabets and special characters)")]
        public string aadhar_card { get; set; }
        /// <summary>
        /// Gets or sets the pan card.
        /// </summary>
        /// <value>The pan card.</value>
        [RegularExpression("^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$", ErrorMessage = "Please enter a valid PAN Number (Eg. ABCDE1234A)")]
        public string pan_card { get; set; }
        /// <summary>
        /// Gets or sets the passport number.
        /// </summary>
        /// <value>The passport number.</value>
        [RegularExpression("^([A-Za-z]{1})([0-9]{7})$", ErrorMessage = "Please enter a valid Passport Number (Eg. A1234567)")]
        public string passport_number { get; set; }
        /// <summary>
        /// Gets or sets the passport validity.
        /// </summary>
        /// <value>The passport validity.</value>
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> passport_validity { get; set; }
        /// <summary>
        /// Gets or sets the election card.
        /// </summary>
        /// <value>The election card.</value>
        [RegularExpression("^([A-Za-z]{3})([0-9]{7})$", ErrorMessage = "Please enter a valid Election Card Number (Eg. AAA1234567)")]
        public string election_card { get; set; }
        /// <summary>
        /// Gets or sets the vehicle number.
        /// </summary>
        /// <value>The vehicle number.</value>
        [RegularExpression("^([A-Za-z]{2})([0-9]{1,2})([A-Za-z]{1,2})([0-9]{4})$", ErrorMessage = "Please enter a valid Vehicle Number (Eg. GJ01AA1234)")]
        public string vehicle_number { get; set; }
        /// <summary>
        /// Gets or sets the single bank account.
        /// </summary>
        /// <value>The single bank account.</value>
        public string single_bank_account { get; set; }
        /// <summary>
        /// Gets or sets the ifs code.
        /// </summary>
        /// <value>The ifs code.</value>
        public string ifs_code { get; set; }
        /// <summary>
        /// Gets or sets the allergies.
        /// </summary>
        /// <value>The allergies.</value>
        public string allergies { get; set; }
        /// <summary>
        /// Gets or sets the known ailments.
        /// </summary>
        /// <value>The known ailments.</value>
        public string known_ailments { get; set; }

        /// <summary>
        /// Gets or sets the additional information.
        /// </summary>
        /// <value>The additional information.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<additional_informationModel> additional_information { get; set; }
        /// <summary>
        /// Gets or sets the certifications.
        /// </summary>
        /// <value>The certifications.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<certificationsModel> certifications { get; set; }
        /// <summary>
        /// Gets or sets the department1.
        /// </summary>
        /// <value>The department1.</value>
        public virtual department department1 { get; set; }
        /// <summary>
        /// Gets or sets the educational qualifications.
        /// </summary>
        /// <value>The educational qualifications.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<educational_qualificationsModel> educational_qualifications { get; set; }
        /// <summary>
        /// Gets or sets the role.
        /// </summary>
        /// <value>The role.</value>
        public virtual role role { get; set; }
        /// <summary>
        /// Gets or sets the employee refcheck.
        /// </summary>
        /// <value>The employee refcheck.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<employee_refcheckModel> employee_refcheck { get; set; }
        /// <summary>
        /// Gets or sets the other details.
        /// </summary>
        /// <value>The other details.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<other_detailsModel> other_details { get; set; }
        /// <summary>
        /// Gets or sets the epfo details.
        /// </summary>
        /// <value>The epfo details.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<epfo_detailsModel> epfo_details { get; set; }
        /// <summary>
        /// Gets or sets the esic details.
        /// </summary>
        /// <value>The esic details.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<esic_detailsModel> esic_details { get; set; }
        /// <summary>
        /// Gets or sets the family details.
        /// </summary>
        /// <value>The family details.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<family_detailsModel> family_details { get; set; }
        /// <summary>
        /// Gets or sets the feedback.
        /// </summary>
        /// <value>The feedback.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<feedbackModel> feedback { get; set; }
        /// <summary>
        /// Gets or sets the previous employ 1.
        /// </summary>
        /// <value>The previous employ 1.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<prev_employ_1Model> prev_employ_1 { get; set; }
        /// <summary>
        /// Gets or sets the previous company details.
        /// </summary>
        /// <value>The previous company details.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<previous_company_detailsModel> previous_company_details { get; set; }
        /// <summary>
        /// Gets or sets the references.
        /// </summary>
        /// <value>The references.</value>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<referencesModel> references { get; set; }
    }
}
