using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hrinnova_FormsProject.DatabaseModel;

namespace Hrinnova_FormsProject.Models
{
    public class Model2
    {
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
        public prev_employ_2 prevemploy2 { get; set; }
        public prev_employ_3 prevemploy3 { get; set; }
        public prev_employ_4 prevemploy4 { get; set; }
        public prev_employ_5 prevemploy5 { get; set; }
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
}