using Hrinnova_FormsProject.DatabaseModel;
using Hrinnova_FormsProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hrinnova_FormsProject.Controllers
{
    public class HomeController : Controller
    {


        public int count = 0;
        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult Form1()
        {
            return PartialView("_Form1");
        }
        public PartialViewResult Form2()
        {
            return PartialView("_Form2");
        }
        public PartialViewResult Form3()
        {
            return PartialView("_Form3");
        }
        public PartialViewResult Form4()
        {
            return PartialView("_Form4");
        }
        public PartialViewResult Form5()
        {
            return PartialView("_Form5");
        }

        [HttpPost]
        public ActionResult CreatePost(Model1 form1)
        {

            //var fathername = Request.Form["fathername"];
            //var fatheraad = Request.Form["fathername"];
            //var ReviewIds = Request.Form["fathername"];
            //var ReviewIds = Request.Form["fathername"];
            //var ReviewIds = Request.Form["fathername"];
            //var ReviewIds = Request.Form["fathername"];

            //var mother = Request.Form["fathername"];

            //try
            //{
            hrinnova_dbEntities hd = new hrinnova_dbEntities();
            //    _hrinnova_dbEntities.employee_details.Add(ed);

            // EmployeeDetail 
            //    public ActionResult EmpDetails(Model1 parent)
            //{
            //    employee_details ed = new employee_details();
            //    { 
            //       parent.firstname=ed.firstname;

            //     }
            //   
            //    // Tabularer
            //    // 

            //    _hrinnova_dbEntities.savechanges();
            //    return View("Index");
            //}
            //Employee Details Form
            employee_details ed = new employee_details();
            ed.employee_code = form1.employeecode;
            ed.designation = form1.designationdropdown;
            ed.department = form1.departmentdropdown;
            ed.firstname = form1.firstname;
            ed.middlename = form1.middlename;
            ed.surname = form1.surname;
            ed.gender = form1.gender;
            ed.date_of_birth = form1.dateofbirth;
            ed.date_of_joining = form1.joiningdate;
            ed.marital_status = form1.maritalstatus;
            ed.marriage_anniversary = form1.marriageanniversary;
            ed.blood_group = form1.bloodgroup;
            ed.mobile_number = form1.mobilenumber;
            ed.home_number = form1.homenumber;
            ed.alternate_number = form1.alternatenumber;
            ed.emergency_number = form1.emergencynumber;
            ed.email_id = form1.emailid;
            ed.permanent_address = form1.permaddress;
            ed.temporary_address = form1.tempaddress;
            ed.aadhar_card = form1.aadharcard;
            ed.pan_card = form1.pancard;
            ed.passport_number = form1.passportnumber;
            ed.passport_validity = form1.passportvalidity;
            ed.election_card = form1.electioncard;
            ed.vehicle_number = form1.vehiclenumber;
            ed.single_bank_account = form1.singlebankaccount;
            ed.ifs_code = form1.ifsc;
            ed.allergies = form1.allergies;
            ed.known_ailments = form1.knownailments;

            // ESIC
            esic_details esicd = new esic_details();
            esicd.insurance_number = form1.insurancenumber;
            esicd.branch_office = form1.branchoffice;
            esicd.dispensary = form1.dispensary;
            esicd.employers_code = form1.employerscode;
            esicd.date_of_appointment = form1.dateofappt;
            esicd.employers_nameandaddress = form1.employernameaddress;
            esicd.previous_insurance_number = form1.previousinsurance;
            esicd.name_of_nominee = form1.nameofnominee;
            esicd.nominee_relationship = form1.relationshipwithnominee;
            esicd.nominee_address = form1.nomineeaddress;

            //EPFO
            epfo_details epfd = new epfo_details();
            epfd.presentcompany_pfnumber = form1.presentcomppfno;
            epfd.member_of_epfoscheme = form1.epfs;
            epfd.member_of_epsscheme = form1.eps;
            epfd.universal_account_number = form1.universalaccnumber;
            epfd.prev_pf_acc_number = form1.prevpfaccountnumber;
            epfd.scheme_certificate_number = form1.schemecertificatenumber;
            epfd.ppo_number = form1.pponumber;
            epfd.international_worker = form1.intworker;
            epfd.country_of_origin = form1.countryoforigin;

            //Family Details
            //foreach (var item in form1.FamilyDetails)
            //Father
            family_details fd = new family_details();
            fd.member = form1.f1;
            fd.fname = form1.fathername;
            fd.fdateofbirth = form1.fatherdob;
            fd.faadhar = form1.fatheraadhar;
            fd.fcontact = form1.fathercontact;
            fd.foccupation = form1.fatheroccupation;
            fd.freside = form1.fatherresides;
            fd.ftown = form1.fathertown;
            fd.fstate = form1.fatherstate;

            ////Mother
            family_details f2d = new family_details();
            f2d.member = form1.f2;
            f2d.fname = form1.mothername;
            f2d.fdateofbirth = form1.motherdob;
            f2d.faadhar = form1.motheraadhar;
            f2d.fcontact = form1.mothercontact;
            f2d.foccupation = form1.motheroccupation;
            f2d.freside = form1.motherresides;
            f2d.ftown = form1.mothertown;
            f2d.fstate = form1.motherstate;

            ////Brother
            family_details f3d = new family_details();
            f3d.member = form1.f3;
            f3d.fname = form1.brothername;
            f3d.fdateofbirth = form1.brotherdob;
            f3d.faadhar = form1.brotheraadhar;
            f3d.fcontact = form1.brothercontact;
            f3d.foccupation = form1.brotheroccupation;
            f3d.freside = form1.brotherresides;
            f3d.ftown = form1.brothertown;
            f3d.fstate = form1.brotherstate;

            ////Sister
            family_details f4d = new family_details();
            f4d.member = form1.f4;
            f4d.fname = form1.sistername;
            f4d.fdateofbirth = form1.sisterdob;
            f4d.faadhar = form1.sisteraadhar;
            f4d.fcontact = form1.sistercontact;
            f4d.foccupation = form1.sisteroccupation;
            f4d.freside = form1.sisterresides;
            f4d.ftown = form1.sistertown;
            f4d.fstate = form1.sisterstate;

            //Spouse
            family_details f5d = new family_details();
            f5d.member = form1.f5;
            f5d.fname = form1.spousename;
            f5d.fdateofbirth = form1.spousedob;
            f5d.faadhar = form1.spouseaadhar;
            f5d.fcontact = form1.spousecontact;
            f5d.foccupation = form1.spouseoccupation;
            f5d.freside = form1.spouseresides;
            f5d.ftown = form1.spousetown;
            f5d.fstate = form1.spousestate;

            //Children
            family_details f6d = new family_details();
            f6d.member = form1.f6;
            f6d.fname = form1.childrenname;
            f6d.fdateofbirth = form1.childrendob;
            f6d.faadhar = form1.childrenaadhar;
            f6d.fcontact = form1.childrencontact;
            f6d.foccupation = form1.childrenoccupation;
            f6d.freside = form1.childrenresides;
            f6d.ftown = form1.childrentown;
            f6d.fstate = form1.childrenstate;

            //OTHER DETAILS
            other_details od = new other_details();
            od.propertyowner_name = form1.ownername;
            od.propertyowner_contact = form1.ownercontact;
            od.propertyowner_address = form1.owneraddress;
            od.propertyowner_occupation = form1.owneroccupation;

            od.neighbour1_name = form1.neighbour1name;
            od.neighbour1_contact = form1.neighbour1contact;
            od.neighbour1_address = form1.neighbour1address;
            od.neighbour1_occupation = form1.neighbour1occupation;

            od.neighbour2_name = form1.neighbour2name;
            od.neighbour2_contact = form1.neighbour2contact;
            od.neighbour2_address = form1.neighbour2address;
            od.neighbour2_occupation = form1.neighbour2occupation;

            //EDUCATIONAL QUALIFICATIONS
            educational_qualifications eq = new educational_qualifications();
            eq.tenth_school = form1.tenthschool;
            eq.tenth_board = form1.tenthboard;
            eq.tenth_grade = form1.tenthgrade;
            eq.tenth_yearofpassing = form1.tenthyearofpassing;       
            
            eq.twelfth_school = form1.twelfthschool;
            eq.twelfth_board = form1.twelfthboard;
            eq.twelfth_grade = form1.twelfthgrade;
            eq.twelfth_yearofpassing = form1.twelfthyearofpassing;

            eq.bachelors_college = form1.bachelorscollege;
            eq.bachelors_university = form1.bachelorsuniversity;
            eq.bachelors_grade = form1.bachelorsgrade;
            eq.bachelors_yearofpassing= form1.bachelorsyearofpassing;

            eq.masters_college= form1.masterscollege;
            eq.masters_university = form1.mastersuniversity;
            eq.masters_grade= form1.mastersgrade;
            eq.masters_yearofpassing= form1.mastersyearofpassing;

            eq.other_school = form1.otherschool;
            eq.other_board = form1.otherboard;
            eq.other_grade= form1.othergrade;
            eq.other_yearofpassing= form1.otheryearofpassing;

            //CERTIFICATION DETAILS
            certifications cf1 = new certifications();
            cf1.cert_type = form1.cert1;
            cf1.certification_name = form1.cert_1;

            certifications cf2 = new certifications();
            cf2.cert_type = form1.cert2;
            cf2.certification_name = form1.cert_2;

            certifications cf3 = new certifications();
            cf3.cert_type = form1.cert3;
            cf3.certification_name = form1.cert_2;

            certifications cf4 = new certifications();
            cf4.cert_type = form1.cert4;
            cf4.certification_name = form1.cert_2;
            

            //PREVIOUS COMPANY DETAILS 
            previous_company_details pd = new previous_company_details();
            pd.pf_account_number = form1.pfaccnumber;
            pd.fps_account_number = form1.accountnumber;
            pd.pf_employers_code_number = form1.employerscodenum;
            pd.life_insurance = form1.lifeinsurance;
            pd.esi_employers_code_number = form1.employerscodeno;
            pd.esi_insurance_number = form1.insurancenumber;
            pd.mediclaim = form1.mediclaim;

            //ADDITIONAL INFORMATION
            additional_information ai = new additional_information();
            ai.known_to_presentemployee = form1.knowntopresentemp;
            ai.name_of_knownemployee = form1.presentempname;
            ai.relationship_with_knownemployee = form1.presentemprelation;


            //REFERENCES
            references rf1 = new references();
            rf1.ref_type = form1.rf1;
            rf1.name = form1.reference1name;
            rf1.address= form1.reference1address;
            rf1.designation = form1.reference1designation;

            references rf2 = new references();
            rf2.ref_type = form1.rf2;
            rf2.name = form1.reference2name;
            rf2.address = form1.reference2address;
            rf2.designation = form1.reference2designation;

            //FEEDBACK
            //HR Department
            feedback fb = new feedback();
            fb.hr_manual = form1.hrmanual;
            fb.cims_idpassword = form1.cims;
            fb.books = form1.books;
            fb.library_card = form1.librarycard;
            fb.hr_anyother = form1.hrother;

            //Admin Department
            fb.identitycard = form1.idcard;
            fb.bank_account = form1.bankacc;
            fb.notepad = form1.notepad;
            fb.pen = form1.pen;
            fb.employee_card = form1.employeecard;
            fb.admin_anyother = form1.adminother;

            //System Administration
            fb.computer_system = form1.pc;
            fb.headphones = form1.headphones;
            fb.emailid_password = form1.emailidpass;
            fb.network_ip = form1.networkip;
            fb.firewall_id = form1.firewallid;
            fb.domain_usernamepassword = form1.domainusername;
            fb.messengers_access = form1.messengeraccess;
            fb.systemadmin_anyother = form1.saother;

            //Joinee
            fb.hrmanual_and_responsibilities = form1.hrmanualandismsresp;



            hd.certifications.Add(cf1);
            hd.certifications.Add(cf2);
            hd.certifications.Add(cf3);
            hd.certifications.Add(cf4);
            hd.employee_details.Add(ed);
            hd.esic_details.Add(esicd);
            hd.epfo_details.Add(epfd);
            hd.family_details.Add(fd);
            hd.family_details.Add(f2d);
            hd.family_details.Add(f3d);
            hd.family_details.Add(f4d);
            hd.family_details.Add(f5d);
            hd.family_details.Add(f6d);
            hd.additional_information.Add(ai);
            hd.references.Add(rf1);
            hd.references.Add(rf2);
            hd.SaveChanges();
            //} 
            //catch (DbEntityValidationException ex)
            //{
            //    // Retrieve the error messages as a list of strings.
            //    var errorMessages = ex.EntityValidationErrors
            //            .SelectMany(x => x.ValidationErrors)
            //            .Select(x => x.ErrorMessage);

            //    // Join the list to a single string.
            //    var fullErrorMessage = string.Join("; ", errorMessages);

            //    // Combine the original exception message with the new one.
            //    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

            //}

            return View("Index");

        }

    }
}
//}
