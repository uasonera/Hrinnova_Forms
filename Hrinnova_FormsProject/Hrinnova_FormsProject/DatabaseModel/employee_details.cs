//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Hrinnova_FormsProject.DatabaseModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;

    public partial class employee_details
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public employee_details()
        {
            this.additional_information = new HashSet<additional_information>();
            this.certifications = new HashSet<certifications>();
            this.educational_qualifications = new HashSet<educational_qualifications>();
            this.employee_refcheck = new HashSet<employee_refcheck>();
            this.other_details = new HashSet<other_details>();
            this.epfo_details = new HashSet<epfo_details>();
            this.esic_details = new HashSet<esic_details>();
            this.family_details = new HashSet<family_details>();
            this.feedback = new HashSet<feedback>();
            this.previous_company_details = new HashSet<previous_company_details>();
            this.references = new HashSet<references>();
            this.prev_employ_1 = new HashSet<prev_employ_1>();
        }
    
        public int employee_id { get; set; }
        public string employee_code { get; set; }
        public string designation { get; set; }
        public string department { get; set; }
        public string firstname { get; set; }
        public string middlename { get; set; }
        public string surname { get; set; }
        public string gender { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MMM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> date_of_birth { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MMM/yyyy}", ApplyFormatInEditMode = true)]
        public System.DateTime date_of_joining { get; set; }
        public string marital_status { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MMM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> marriage_anniversary { get; set; }
        public string blood_group { get; set; }
        public string mobile_number { get; set; }
        public string home_number { get; set; }
        public string alternate_number { get; set; }
        public string emergency_number { get; set; }
        public string email_id { get; set; }
        public string permanent_address { get; set; }
        public string temporary_address { get; set; }
        public string aadhar_card { get; set; }
        public string pan_card { get; set; }
        public string passport_number { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MMM/yyyy}", ApplyFormatInEditMode = true)]
        public Nullable<System.DateTime> passport_validity { get; set; }
        public string election_card { get; set; }
        public string vehicle_number { get; set; }
        public string single_bank_account { get; set; }
        public string ifs_code { get; set; }
        public string allergies { get; set; }
        public string known_ailments { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<additional_information> additional_information { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<certifications> certifications { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<educational_qualifications> educational_qualifications { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<employee_refcheck> employee_refcheck { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<other_details> other_details { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<epfo_details> epfo_details { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<esic_details> esic_details { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<family_details> family_details { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<feedback> feedback { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<previous_company_details> previous_company_details { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<references> references { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<prev_employ_1> prev_employ_1 { get; set; }
    }
}
