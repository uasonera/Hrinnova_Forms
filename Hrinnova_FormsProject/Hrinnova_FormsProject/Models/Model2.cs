using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hrinnova_FormsProject.DatabaseModel;
using System.ComponentModel.DataAnnotations;


namespace Hrinnova_FormsProject.Models
{
    public class Model2
    {
        public Model2()
        {
            Fatherdetails = new family_details(){ member = "Father"};
            Motherdetails = new family_details() { member="Mother"};
            Brotherdetails = new family_details() { member = "Brother" };
            Sisterdetails= new family_details() { member = "Sister" };
            Spousedetails = new family_details() { member = "Spouse" };
            Childrendetails = new family_details() { member = "Children" };
            Certification1 = new certifications() { cert_type="1"};
            Certification2 = new certifications() { cert_type = "2" };
            Certification3 = new certifications() { cert_type = "3" };
            Certification4 = new certifications() { cert_type = "4" };
            Prevemploy1 = new prev_employ_1() { employment_ref="1" };
            Prevemploy2 = new prev_employ_1() { employment_ref = "2" };
            Prevemploy3 = new prev_employ_1() { employment_ref = "3" };
            Prevemploy4 = new prev_employ_1() { employment_ref = "4" };
            Prevemploy5 = new prev_employ_1() { employment_ref = "5" };
            Reference1 = new references() {ref_type="1" };
            Reference2 = new references() { ref_type = "2" };
            Feedback = new feedback();
            Employeedetails=  new employee_details();
        }
        
        public List<department> Departments { get; set; }
        public List<role> Designations { get; set; }
        public IEnumerable<Maritalstatus> Maritalstatus { get; set; }
        public IEnumerable<Bloodgroups> Bloodgroups { get; set; }
        public employee_details Employeedetails { get; set; }
        public esic_details Esicdetails { get; set; }
        public epfo_details Epfodetails { get; set; }
        public family_details Motherdetails { get; set; }
        public family_details Fatherdetails { get; set; }
        public family_details Brotherdetails { get; set; }
        public family_details Sisterdetails { get; set; }
        public family_details Spousedetails { get; set; }
        public family_details Childrendetails { get; set; }
        public other_details Otherdetails { get; set; }
        public previous_company_details Previouscompanydetails { get; set; }
        public prev_employ_1 Prevemploy1 { get; set; }
        public prev_employ_1 Prevemploy2 { get; set; }
        public prev_employ_1 Prevemploy3 { get; set; }
        public prev_employ_1 Prevemploy4 { get; set; }
        public prev_employ_1 Prevemploy5 { get; set; }
        public educational_qualifications Educationalqualifications { get; set; }
        public references Reference1 { get; set; }
        public references Reference2 { get; set; }
        public additional_information Additionalinformation { get; set; }
        public employee_refcheck Employeerefcheck { get; set; }
        public certifications Certification1 { get; set; }
        public certifications Certification2 { get; set; }
        public certifications Certification3 { get; set; }
        public certifications Certification4 { get; set; }
        public string Id { get; set; }
        public feedback Feedback { get; set;}
        
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