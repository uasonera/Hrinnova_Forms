using Hrinnova_FormsProject.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Hrinnova_FormsProject.DatabaseModel;

namespace Hrinnova_FormsProject.Models
{

    //public class Parent
    //{
    //    public Model1 Model1 { get; set; }
    //}
 
    public class Model1
    {
       
        public List<department> Departments{ get; set; }
        public List<role> Designations { get; set; }
        //EMPLOYEE DETAILS
        public string employeecode { get; set; }
        public string designationdropdown { get; set; }
        public string departmentdropdown { get; set; }
        [Required]
        public string firstname { get; set; }
        [Required]
        public string middlename { get; set; }
        [Required]
        public string surname { get; set; }
        [Required]
        public string gender { get; set; }
        [Required]
        public DateTime dateofbirth { get; set; }
        [Required]
        public DateTime joiningdate { get; set; }
        [Required]
        public string maritalstatus { get; set; }
        public DateTime marriageanniversary { get; set; }
        public string bloodgroup { get; set; }
        public string mobilenumber { get; set; }
        public string homenumber { get; set; }
        public string alternatenumber { get; set; }
        public string emergencynumber { get; set; }
        public string emailid { get; set; }
        public string permaddress { get; set; }
        public string tempaddress { get; set; }
        public string aadharcard { get; set; }
        public string pancard { get; set; }
        public string passportnumber { get; set; }
        public DateTime passportvalidity { get; set; }
        public string electioncard { get; set; }
        public string vehiclenumber { get; set; }
        public string singlebankaccount { get; set; }
        public string ifsc { get; set; }
        public string allergies { get; set; }
        public string knownailments { get; set; }

        //ESIC DETAILS
        public string insurancenumber { get; set; }
        public string branchoffice { get; set; }
        public string dispensary { get; set; }
        public string employerscode { get; set; }
        public DateTime dateofappt { get; set; }
        public string employernameaddress { get; set; }
        public string previousinsurance { get; set; }
        public string nameofnominee { get; set; }
        public string relationshipwithnominee { get; set; }
        public string nomineeaddress { get; set; }

        //EPFO DETAILS
        public string presentcomppfno { get; set; }
        public string epfs { get; set; }
        public string eps { get; set; }
        public string universalaccnumber { get; set; }
        public string prevpfaccountnumber { get; set; }
        public string schemecertificatenumber { get; set; }
        public string pponumber { get; set; }
        public string intworker { get; set; }
        public string countryoforigin { get; set; }

        //FAMILY DETAILS
        public string f1 = "Father";
        public string f2 = "Mother";
        public string f3 = "Brother";
        public string f4 = "Sister";
        public string f5 = "Spouse";
        public string f6 = "Children";
        public string fathername { get; set; }
        public DateTime fatherdob { get; set; }
        public string fatheraadhar { get; set; }
        public string fathercontact { get; set; }
        public string fatheroccupation { get; set; }
        public string fatherresides { get; set; }
        public string fathertown { get; set; }
        public string fatherstate { get; set; }
        public string mothername { get; set; }
        public DateTime motherdob { get; set; }
        public string motheraadhar { get; set; }
        public string mothercontact { get; set; }
        public string motheroccupation { get; set; }
        public string motherresides { get; set; }
        public string mothertown { get; set; }
        public string motherstate { get; set; }
        public string brothername { get; set; }
        public DateTime brotherdob { get; set; }
        public string brotheraadhar { get; set; }
        public string brothercontact { get; set; }
        public string brotheroccupation { get; set; }
        public string brotherresides { get; set; }
        public string brothertown { get; set; }
        public string brotherstate { get; set; }
        public string sistername { get; set; }
        public DateTime sisterdob { get; set; }
        public string sisteraadhar { get; set; }
        public string sistercontact { get; set; }
        public string sisteroccupation { get; set; }
        public string sisterresides { get; set; }
        public string sistertown { get; set; }
        public string sisterstate { get; set; }
        public string spousename { get; set; }
        public DateTime spousedob { get; set; }
        public string spouseaadhar { get; set; }
        public string spousecontact { get; set; }
        public string spouseoccupation { get; set; }
        public string spouseresides { get; set; }
        public string spousetown { get; set; }
        public string spousestate { get; set; }
        public string childrenname { get; set; }
        public DateTime childrendob { get; set; }
        public string childrenaadhar { get; set; }
        public string childrencontact { get; set; }
        public string childrenoccupation { get; set; }
        public string childrenresides { get; set; }
        public string childrentown { get; set; }
        public string childrenstate { get; set; }

        //public List<Model2> FamilyDetails { get; set; }

        //OTHER DETAILS
        public string ownername { get; set; }
        public string ownercontact { get; set; }
        public string owneraddress { get; set; }
        public string owneroccupation { get; set; }

        public string neighbour1name { get; set; }
        public string neighbour1contact { get; set; }
        public string neighbour1address { get; set; }
        public string neighbour1occupation { get; set; }

        public string neighbour2name { get; set; }
        public string neighbour2contact { get; set; }
        public string neighbour2address { get; set; }
        public string neighbour2occupation { get; set; }

        //EDUCATIONAL QUALIFICATIONS
        public string tenthschool { get; set; }
        public string tenthboard { get; set; }
        public string tenthyearofpassing { get; set; }
        public string tenthgrade { get; set; }

        public string twelfthschool { get; set; }
        public string twelfthboard { get; set; }
        public string twelfthyearofpassing { get; set; }
        public string twelfthgrade { get; set; }

        public string bachelorscollege { get; set; }
        public string bachelorsuniversity { get; set; }
        public string bachelorsyearofpassing { get; set; }
        public string bachelorsgrade { get; set; }

        public string masterscollege { get; set; }
        public string mastersuniversity { get; set; }
        public string mastersyearofpassing { get; set; }
        public string mastersgrade { get; set; }

        public string otherschool { get; set; }
        public string otherboard { get; set; }
        public string otheryearofpassing { get; set; }
        public string othergrade { get; set; }

        //CERTIFICATIONS
        public string cert1 = "1";
        public string cert2 = "2";
        public string cert3 = "3";
        public string cert4 = "4";
        public string cert_1 { get; set; }
        public string cert_2 { get; set; }
        public string cert_3 { get; set; }
        public string cert_4 { get; set; }


        //PREVIOUS COMPANY DETAILS
        public string pfaccnumber { get; set; }
        public string accountnumber { get; set; }
        public string insurance { get; set; }
        public string employerscodenum { get; set; }
        public string lifeinsurance { get; set; }
        public string employerscodeno { get; set; }
        public string mediclaim { get; set; }

        //PREVIOUS EMPLOYMENT 
        public string employment_ref1 = "1";
        public string emp1nameandadd { get; set; }
        public string emp1designation { get; set; }
        public DateTime emp1workedfrom { get; set; }
        public DateTime emp1workedtill { get; set; }
        public string emp1reasonofleaving { get; set; }

        public string employment_ref2 = "2";
        public string emp2nameandadd { get; set; }
        public string emp2designation { get; set; }
        public DateTime emp2workedfrom { get; set; }
        public DateTime emp2workedtill { get; set; }
        public string emp2reasonofleaving { get; set; }

        public string employment_ref3 = "3";
        public string emp3nameandadd { get; set; }
        public string emp3designation { get; set; }
        public DateTime emp3workedfrom { get; set; }
        public DateTime emp3workedtill { get; set; }
        public string emp3reasonofleaving { get; set; }

        public string employment_ref4 = "4";
        public string emp4nameandadd { get; set; }
        public string emp4designation { get; set; }
        public DateTime emp4workedfrom { get; set; }
        public DateTime emp4workedtill { get; set; }
        public string emp4reasonofleaving { get; set; }

        public string employment_ref5 = "5";
        public string emp5nameandadd { get; set; }
        public string emp5designation { get; set; }
        public DateTime emp5workedfrom { get; set; }
        public DateTime emp5workedtill { get; set; }
        public string emp5reasonofleaving { get; set; }

        //ADDITIONAL INFORMATION
        public string knowntopresentemp { get; set; }
        public string presentempname { get; set; }
        public string presentemprelation { get; set; }

        //REFERENCES
        public string rf1 = "1";
        public string rf2 = "2";
        public string reference1name { get; set; }
        public string reference1address { get; set; }
        public string reference1designation { get; set; }

        public string reference2name { get; set; }
        public string reference2address { get; set; }
        public string reference2designation { get; set; }

        //FEEDBACK 
        public string hrmanual { get; set; }
        public string cims { get; set; }
        public string books { get; set; }
        public string librarycard { get; set; }
        public string hrother { get; set; }
        public string idcard { get; set; }
        public string bankacc { get; set; }
        public string notepad { get; set; }
        public string pen { get; set; }
        public string employeecard { get; set; }
        public string adminother { get; set; }
        public string pc { get; set; }
        public string headphones { get; set; }
        public string emailidpass { get; set; }
        public string networkip { get; set; }
        public string firewallid { get; set; }
        public string domainusername { get; set; }
        public string messengeraccess { get; set; }
        public string saother { get; set; }
        public string hrmanualandismsresp { get; set; }
        //public List<model> MyProperty { get; set; }
        //public Model1()
        //{
        //    MyProperty = new List<model>();
        //}
    }

    //public class model
    //{
    //    public int Id { get; set; }
    //    public string  name { get; set; }
    //}
    
}