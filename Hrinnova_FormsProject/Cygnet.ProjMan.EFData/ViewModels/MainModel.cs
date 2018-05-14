using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cygnet.ProjMan.EFData.DataSource;


namespace Cygnet.ProjMan.EFData.ViewModels
{
    
   public class MainModel
    {
        public List<department> Departments { get; set; }
        public List<role> Designations { get; set; }
        public List<Maritalstatus> Maritalstatus { get; set; }
        public List<Bloodgroups> Bloodgroups { get; set; }
        public employee_detailsModel Employeedetails { get; set; }
        public esic_detailsModel Esicdetails { get; set; }
        public epfo_detailsModel Epfodetails { get; set; }
        public List<certificationsModel> Certifications { get; set; }
        public List<family_detailsModel> FamilyDetails{ get; set; }
        public List<referencesModel> References { get; set; }
        public List<prev_employ_1Model> PreviousEmployments { get; set; }
        public family_detailsModel Motherdetails { get; set; }
        public family_detailsModel Fatherdetails { get; set; }
        public family_detailsModel Brotherdetails { get; set; }
        public family_detailsModel Sisterdetails { get; set; }
        public family_detailsModel Spousedetails { get; set; }
        public family_detailsModel Childrendetails { get; set; }
        public other_detailsModel Otherdetails { get; set; }
        public previous_company_detailsModel Previouscompanydetails { get; set; }
        public prev_employ_1Model Prevemploy1 { get; set; }
        public prev_employ_1Model Prevemploy2 { get; set; }
        public prev_employ_1Model Prevemploy3 { get; set; }
        public prev_employ_1Model Prevemploy4 { get; set; }
        public prev_employ_1Model Prevemploy5 { get; set; }
        public educational_qualificationsModel Educationalqualifications { get; set; }
        public referencesModel Reference1 { get; set; }
        public referencesModel Reference2 { get; set; }
        public additional_informationModel Additionalinformation { get; set; }
        public employee_refcheckModel Employeerefcheck { get; set; }
        public certificationsModel Certification1 { get; set; }
        public certificationsModel Certification2 { get; set; }
        public certificationsModel Certification3 { get; set; }
        public certificationsModel Certification4 { get; set; }
        public string Id { get; set; }
        public feedbackModel Feedback { get; set; }
    }
    public class Maritalstatus
    {
        public int Id { get; set; }
        public string Status { get; set; }

    }

    public class Bloodgroups
    {
        public int Id { get; set; }
        public string Bloodgroup { get; set; }
    }
}
