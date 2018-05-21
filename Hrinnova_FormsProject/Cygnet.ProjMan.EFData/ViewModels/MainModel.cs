
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cygnet.ProjMan.EFData.DataSource;


namespace Cygnet.ProjMan.EFData.ViewModels
{
        
    /// <summary>
    /// Class MainModel.
    /// Properties of all Viewmodels
    /// </summary>
    public class MainModel
    {
        /// <summary>
        /// Gets or sets the departments.
        /// </summary>
        /// <value>The departments.</value>
        /// 
        public List<string> Errors { get; set; }
        public List<department> Departments { get; set; }
        /// <summary>
        /// Gets or sets the designations.
        /// </summary>
        /// <value>The designations.</value>
        public List<role> Designations { get; set; }
        /// <summary>
        /// Gets or sets the maritalstatus.
        /// </summary>
        /// <value>The maritalstatus.</value>
        public List<Maritalstatus> Maritalstatus { get; set; }
        /// <summary>
        /// Gets or sets the bloodgroups.
        /// </summary>
        /// <value>The bloodgroups.</value>
        public List<Bloodgroups> Bloodgroups { get; set; }
        /// <summary>
        /// Gets or sets the employeedetails.
        /// </summary>
        /// <value>The employeedetails.</value>
        public employee_detailsModel Employeedetails { get; set; }
        /// <summary>
        /// Gets or sets the esicdetails.
        /// </summary>
        /// <value>The esicdetails.</value>
        public esic_detailsModel Esicdetails { get; set; }
        /// <summary>
        /// Gets or sets the epfodetails.
        /// </summary>
        /// <value>The epfodetails.</value>
        public epfo_detailsModel Epfodetails { get; set; }
        /// <summary>
        /// Gets or sets the certifications.
        /// </summary>
        /// <value>The certifications.</value>
        public List<certificationsModel> Certifications { get; set; }
        /// <summary>
        /// Gets or sets the family details.
        /// </summary>
        /// <value>The family details.</value>
        public List<family_detailsModel> FamilyDetails{ get; set; }
        /// <summary>
        /// Gets or sets the references.
        /// </summary>
        /// <value>The references.</value>
        public List<referencesModel> References { get; set; }
        /// <summary>
        /// Gets or sets the previous employments.
        /// </summary>
        /// <value>The previous employments.</value>
        public List<prev_employ_1Model> PreviousEmployments { get; set; }
        /// <summary>
        /// Gets or sets the motherdetails.
        /// </summary>
        /// <value>The motherdetails.</value>
        public family_detailsModel Motherdetails { get; set; }
        /// <summary>
        /// Gets or sets the fatherdetails.
        /// </summary>
        /// <value>The fatherdetails.</value>
        public family_detailsModel Fatherdetails { get; set; }
        /// <summary>
        /// Gets or sets the brotherdetails.
        /// </summary>
        /// <value>The brotherdetails.</value>
        public family_detailsModel Brotherdetails { get; set; }
        /// <summary>
        /// Gets or sets the sisterdetails.
        /// </summary>
        /// <value>The sisterdetails.</value>
        public family_detailsModel Sisterdetails { get; set; }
        /// <summary>
        /// Gets or sets the spousedetails.
        /// </summary>
        /// <value>The spousedetails.</value>
        public family_detailsModel Spousedetails { get; set; }
        /// <summary>
        /// Gets or sets the childrendetails.
        /// </summary>
        /// <value>The childrendetails.</value>
        public family_detailsModel Childrendetails { get; set; }
        /// <summary>
        /// Gets or sets the otherdetails.
        /// </summary>
        /// <value>The otherdetails.</value>
        public other_detailsModel Otherdetails { get; set; }
        /// <summary>
        /// Gets or sets the previouscompanydetails.
        /// </summary>
        /// <value>The previouscompanydetails.</value>
        public previous_company_detailsModel Previouscompanydetails { get; set; }
        /// <summary>
        /// Gets or sets the prevemploy1.
        /// </summary>
        /// <value>The prevemploy1.</value>
        public prev_employ_1Model Prevemploy1 { get; set; }
        /// <summary>
        /// Gets or sets the prevemploy2.
        /// </summary>
        /// <value>The prevemploy2.</value>
        public prev_employ_1Model Prevemploy2 { get; set; }
        /// <summary>
        /// Gets or sets the prevemploy3.
        /// </summary>
        /// <value>The prevemploy3.</value>
        public prev_employ_1Model Prevemploy3 { get; set; }
        /// <summary>
        /// Gets or sets the prevemploy4.
        /// </summary>
        /// <value>The prevemploy4.</value>
        public prev_employ_1Model Prevemploy4 { get; set; }
        /// <summary>
        /// Gets or sets the prevemploy5.
        /// </summary>
        /// <value>The prevemploy5.</value>
        public prev_employ_1Model Prevemploy5 { get; set; }
        /// <summary>
        /// Gets or sets the educationalqualifications.
        /// </summary>
        /// <value>The educationalqualifications.</value>
        public educational_qualificationsModel Educationalqualifications { get; set; }
        /// <summary>
        /// Gets or sets the reference1.
        /// </summary>
        /// <value>The reference1.</value>
        public referencesModel Reference1 { get; set; }
        /// <summary>
        /// Gets or sets the reference2.
        /// </summary>
        /// <value>The reference2.</value>
        public referencesModel Reference2 { get; set; }
        /// <summary>
        /// Gets or sets the additionalinformation.
        /// </summary>
        /// <value>The additionalinformation.</value>
        public additional_informationModel Additionalinformation { get; set; }
        /// <summary>
        /// Gets or sets the employeerefcheck.
        /// </summary>
        /// <value>The employeerefcheck.</value>
        public employee_refcheckModel Employeerefcheck { get; set; }
        /// <summary>
        /// Gets or sets the certification1.
        /// </summary>
        /// <value>The certification1.</value>
        public certificationsModel Certification1 { get; set; }
        /// <summary>
        /// Gets or sets the certification2.
        /// </summary>
        /// <value>The certification2.</value>
        public certificationsModel Certification2 { get; set; }
        /// <summary>
        /// Gets or sets the certification3.
        /// </summary>
        /// <value>The certification3.</value>
        public certificationsModel Certification3 { get; set; }
        /// <summary>
        /// Gets or sets the certification4.
        /// </summary>
        /// <value>The certification4.</value>
        public certificationsModel Certification4 { get; set; }
       
        /// <summary>
        /// Gets or sets the feedback.
        /// </summary>
        /// <value>The feedback.</value>
        public feedbackModel Feedback { get; set; }
    }
    /// <summary>
    /// Class Maritalstatus.
    /// </summary>
    public class Maritalstatus
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        public int Id { get; set; }
        /// <summary>
        /// Gets or sets the status.
        /// </summary>
        /// <value>The status.</value>
        public string Status { get; set; }

    }
    public class Errorlist {
        public string ErrorName { get; set; }
    }

    /// <summary>
    /// Class Bloodgroups.
    /// </summary>
    public class Bloodgroups
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        public int Id { get; set; }
        /// <summary>
        /// Gets or sets the bloodgroup.
        /// </summary>
        /// <value>The bloodgroup.</value>
        public string Bloodgroup { get; set; }
    }
}
