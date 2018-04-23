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
            fatherdetails = new family_details(){ member = "Father"};
            motherdetails = new family_details() { member="Mother"};
            brotherdetails = new family_details() { member = "Brother" };
            sisterdetails= new family_details() { member = "Sister" };
            spousedetails = new family_details() { member = "Spouse" };
            childrendetails = new family_details() { member = "Children" };
            certification1 = new certifications() { cert_type="1"};
            certification2 = new certifications() { cert_type = "2" };
            certification3 = new certifications() { cert_type = "3" };
            certification4 = new certifications() { cert_type = "4" };
            prevemploy1 = new prev_employ_1() { employment_ref="1" };
            prevemploy2 = new prev_employ_1() { employment_ref = "2" };
            prevemploy3 = new prev_employ_1() { employment_ref = "3" };
            prevemploy4 = new prev_employ_1() { employment_ref = "4" };
            prevemploy5 = new prev_employ_1() { employment_ref = "5" };
            reference1 = new references() {ref_type="1" };
            reference2 = new references() { ref_type = "2" };

        }
        
        public List<department> departments { get; set; }
        public List<role> designations { get; set; }
        public IEnumerable<maritalstatus> maritalstatus { get; set; }
        public employee_details employeedetails { get; set; }
        public esic_details esicdetails { get; set; }
        public epfo_details epfodetails { get; set; }
        public family_details motherdetails { get; set; }
        public family_details fatherdetails { get; set; }
        public family_details brotherdetails { get; set; }
        public family_details sisterdetails { get; set; }
        public family_details spousedetails { get; set; }
        public family_details childrendetails { get; set; }
        public other_details otherdetails { get; set; }
        public previous_company_details previouscompanydetails { get; set; }
        public prev_employ_1 prevemploy1 { get; set; }
        public prev_employ_1 prevemploy2 { get; set; }
        public prev_employ_1 prevemploy3 { get; set; }
        public prev_employ_1 prevemploy4 { get; set; }
        public prev_employ_1 prevemploy5 { get; set; }
        public educational_qualifications educationalqualifications { get; set; }
        public references reference1 { get; set; }
        public references reference2 { get; set; }
        public additional_information additionalinformation { get; set; }
        public employee_refcheck employeerefcheck { get; set; }
        public certifications certification1 { get; set; }
        public certifications certification2 { get; set; }
        public certifications certification3 { get; set; }
        public certifications certification4 { get; set; }
        public string id { get; set; }
        public feedback feedback { get; set;}
        
    }
    public class maritalstatus
    {
        public int id { get; set; }
        public string status { get; set; }

    }
}