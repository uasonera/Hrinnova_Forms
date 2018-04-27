using Hrinnova_FormsProject.DatabaseModel;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Hrinnova_FormsProject.Models;
using System.Data.Entity.Validation;

namespace Hrinnova_FormsProject.Controllers
{
    public class EditController : Controller
    {
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        // GET: Edit
        Model2 model = new Model2();
        EditIndexModel eim = new EditIndexModel();


        //Get method to show index of employees

        public ActionResult EditIndex2(string searchstring)

        {
            eim.Employeedetails = from employee_details in entity.employee_details.Take(10000) select employee_details;
            
            return View(eim);
}



        // GET: Edit/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Edit/Create

        // POST: Edit/Create


        // GET: Edit/Edit/5  
        public ActionResult Edit(int id)
        {
            model.Departments = entity.department.ToList();
            model.Designations = entity.role.ToList();
            model.Maritalstatus = new List<Maritalstatus>()
            {
                new Maritalstatus { Id=1,Status="Married"},
                new Maritalstatus { Id=2,Status="Unmarried"},
                new Maritalstatus { Id=3,Status="Widow"},
                new Maritalstatus { Id=4,Status="Widower"},
                new Maritalstatus { Id=5,Status="Divorcee"}
            };
            model.Bloodgroups = new List<Bloodgroups>()
            {
                new Bloodgroups { Id = 1,Bloodgroup = "A+"},
                new Bloodgroups { Id = 2,Bloodgroup = "A-"},
                new Bloodgroups { Id = 3,Bloodgroup = "B+"},
                new Bloodgroups { Id = 4,Bloodgroup = "B-"},
                new Bloodgroups { Id = 5,Bloodgroup = "AB+"},
                new Bloodgroups { Id = 6,Bloodgroup = "AB-"},
                new Bloodgroups { Id = 7,Bloodgroup = "O+"},
                new Bloodgroups { Id = 8,Bloodgroup = "O-"}
            };

            Session["id"] = id;
            eim.Employeedetails = entity.employee_details.Where(mm => mm.employee_id == id);
            model.Employeedetails = entity.employee_details.FirstOrDefault(ed => ed.employee_id == id);
            model.Esicdetails = entity.esic_details.FirstOrDefault(ms => ms.employee_id == id);
            model.Epfodetails = entity.epfo_details.FirstOrDefault(epfod => epfod.employee_id == id);
            model.Fatherdetails = entity.family_details.FirstOrDefault(fmd => fmd.employee_id == id && fmd.member == "father");
            model.Motherdetails = entity.family_details.FirstOrDefault(mmd => mmd.employee_id == id && mmd.member == "mother");
            model.Brotherdetails = entity.family_details.FirstOrDefault(bd => bd.employee_id == id && bd.member == "brother");
            model.Sisterdetails = entity.family_details.FirstOrDefault(sd => sd.employee_id == id && sd.member == "sister");
            model.Spousedetails = entity.family_details.FirstOrDefault(ssd => ssd.employee_id == id && ssd.member == "spouse");
            model.Childrendetails = entity.family_details.FirstOrDefault(cd => cd.employee_id == id && cd.member == "children");
            model.Otherdetails = entity.other_details.FirstOrDefault(od => od.employee_id == id);
            model.Educationalqualifications = entity.educational_qualifications.FirstOrDefault(eq => eq.employee_id == id);
            model.Previouscompanydetails = entity.previous_company_details.FirstOrDefault(pcd => pcd.employee_id == id);
            model.Prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            model.Prevemploy2 = entity.prev_employ_1.FirstOrDefault(pe2 => pe2.employee_id == id && pe2.employment_ref == "2");
            model.Prevemploy3 = entity.prev_employ_1.FirstOrDefault(pe3 => pe3.employee_id == id && pe3.employment_ref == "3");
            model.Prevemploy4 = entity.prev_employ_1.FirstOrDefault(pe4 => pe4.employee_id == id && pe4.employment_ref == "4");
            model.Prevemploy5 = entity.prev_employ_1.FirstOrDefault(pe5 => pe5.employee_id == id && pe5.employment_ref == "5");
            model.Additionalinformation = entity.additional_information.FirstOrDefault(ai => ai.employee_id == id);
            model.Reference1 = entity.references.FirstOrDefault(rf1 => rf1.employee_id == id && rf1.ref_type == "1");
            model.Reference2 = entity.references.FirstOrDefault(rf2 => rf2.employee_id == id && rf2.ref_type == "2");
            model.Feedback = entity.feedback.FirstOrDefault(fb => fb.employee_id == id);
            model.Certification1 = entity.certifications.FirstOrDefault(c1 => c1.employee_id == id && c1.cert_type == "1");
            model.Certification2 = entity.certifications.FirstOrDefault(c2 => c2.employee_id == id && c2.cert_type == "2");
            model.Certification3 = entity.certifications.FirstOrDefault(c3 => c3.employee_id == id && c3.cert_type == "3");
            model.Certification4 = entity.certifications.FirstOrDefault(c4 => c4.employee_id == id && c4.cert_type == "4");
            model.Feedback = entity.feedback.FirstOrDefault(fb => fb.employee_id == id);
            

            return View(model);
        }

        // POST: Edit/Edit/5
        [HttpPost]
        public ActionResult Editdata(Model2 model)
        {

            try
            {
                int updateid = Convert.ToInt32(Session["id"].ToString());
                
                var ed = entity.employee_details.SingleOrDefault(mc => mc.employee_id == updateid);
                //EMPLOYEE DETAILS
                ed.employee_code = model.Employeedetails.employee_code;             
                    ed.designation = model.Employeedetails.designation;
                    ed.department = model.Employeedetails.department;
                    ed.firstname = model.Employeedetails.firstname;
                    ed.middlename = model.Employeedetails.middlename;
                    ed.surname = model.Employeedetails.surname;
                    ed.gender = model.Employeedetails.gender;
                    ed.date_of_birth = model.Employeedetails.date_of_birth;
                    ed.date_of_joining = model.Employeedetails.date_of_joining;
                    ed.marital_status = model.Employeedetails.marital_status;
                    ed.marriage_anniversary = model.Employeedetails.marriage_anniversary;
                    ed.blood_group = model.Employeedetails.blood_group;
                    ed.mobile_number = model.Employeedetails.mobile_number;
                    ed.home_number = model.Employeedetails.home_number;
                    ed.alternate_number = model.Employeedetails.alternate_number;
                    ed.emergency_number = model.Employeedetails.emergency_number;
                    ed.email_id = model.Employeedetails.email_id;
                    ed.permanent_address = model.Employeedetails.permanent_address;
                    ed.temporary_address = model.Employeedetails.temporary_address;
                    ed.aadhar_card = model.Employeedetails.aadhar_card;
                    ed.pan_card = model.Employeedetails.pan_card;
                    ed.passport_number = model.Employeedetails.passport_number;
                    ed.passport_validity = model.Employeedetails.passport_validity;
                    ed.election_card = model.Employeedetails.election_card;
                    ed.vehicle_number = model.Employeedetails.vehicle_number;
                    ed.single_bank_account = model.Employeedetails.single_bank_account;
                    ed.ifs_code = model.Employeedetails.ifs_code;
                    ed.allergies = model.Employeedetails.allergies;
                    ed.known_ailments = model.Employeedetails.known_ailments;
                    ed.roleID = model.Employeedetails.roleID;
                    ed.DeptID = model.Employeedetails.DeptID;
                

                //ESIC DETAILS
                var esicd = entity.esic_details.SingleOrDefault(esi => esi.employee_id == updateid);
                
                    esicd.insurance_number = model.Esicdetails.insurance_number;
                    esicd.branch_office = model.Esicdetails.branch_office;
                    esicd.dispensary = model.Esicdetails.dispensary;
                    esicd.employers_code = model.Esicdetails.employers_code;
                    esicd.date_of_appointment = model.Esicdetails.date_of_appointment;
                    esicd.employers_nameandaddress = model.Esicdetails.employers_nameandaddress;
                    esicd.previous_insurance_number = model.Esicdetails.previous_insurance_number;
                    esicd.name_of_nominee = model.Esicdetails.name_of_nominee;
                    esicd.nominee_relationship = model.Esicdetails.nominee_relationship;
                    esicd.nominee_address = model.Esicdetails.nominee_address;
                

                //EPFO DETAILS
                var epfod = entity.epfo_details.SingleOrDefault(epf => epf.employee_id == updateid);
                
                    epfod.presentcompany_pfnumber = model.Epfodetails.presentcompany_pfnumber;
                    epfod.member_of_epfoscheme = model.Epfodetails.member_of_epfoscheme;
                    epfod.member_of_epsscheme = model.Epfodetails.member_of_epsscheme;
                    epfod.universal_account_number = model.Epfodetails.universal_account_number;
                    epfod.prev_pf_acc_number = model.Epfodetails.prev_pf_acc_number;
                    epfod.scheme_certificate_number = model.Epfodetails.scheme_certificate_number;
                    epfod.ppo_number = model.Epfodetails.ppo_number;
                    epfod.international_worker = model.Epfodetails.international_worker;
                    epfod.country_of_origin = model.Epfodetails.country_of_origin;
                
                //FAMILY DETAILS 
                //Father
                var fmd1 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "father");
                
                    fmd1.fname = model.Fatherdetails.fname;
                    fmd1.fdateofbirth = model.Fatherdetails.fdateofbirth;
                    fmd1.faadhar = model.Fatherdetails.faadhar;
                    fmd1.fcontact = model.Fatherdetails.fcontact;
                    fmd1.foccupation = model.Fatherdetails.foccupation;
                    fmd1.freside = model.Fatherdetails.freside;
                    fmd1.ftown = model.Fatherdetails.ftown;
                    fmd1.fstate = model.Fatherdetails.fstate;
                

                //Mother
                var fmd2 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "mother");
                
                    fmd2.fname = model.Motherdetails.fname;
                    fmd2.fdateofbirth = model.Motherdetails.fdateofbirth;
                    fmd2.faadhar = model.Motherdetails.faadhar;
                    fmd2.fcontact = model.Motherdetails.fcontact;
                    fmd2.foccupation = model.Motherdetails.foccupation;
                    fmd2.freside = model.Motherdetails.freside;
                    fmd2.ftown = model.Motherdetails.ftown;
                    fmd2.fstate = model.Motherdetails.fstate;
                

                //Brother
                var fmd3 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "brother");
                
                    fmd3.fname = model.Brotherdetails.fname;
                    fmd3.fdateofbirth = model.Brotherdetails.fdateofbirth;
                    fmd3.faadhar = model.Brotherdetails.faadhar;
                    fmd3.fcontact = model.Brotherdetails.fcontact;
                    fmd3.foccupation = model.Brotherdetails.foccupation;
                    fmd3.freside = model.Brotherdetails.freside;
                    fmd3.ftown = model.Brotherdetails.ftown;
                    fmd3.fstate = model.Brotherdetails.fstate;
                

                //Sister
                var fmd4 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "sister");
                
                    fmd4.fname = model.Sisterdetails.fname;
                    fmd4.fdateofbirth = model.Sisterdetails.fdateofbirth;
                    fmd4.faadhar = model.Sisterdetails.faadhar;
                    fmd4.fcontact = model.Sisterdetails.fcontact;
                    fmd4.foccupation = model.Sisterdetails.foccupation;
                    fmd4.freside = model.Sisterdetails.freside;
                    fmd4.ftown = model.Sisterdetails.ftown;
                    fmd4.fstate = model.Sisterdetails.fstate;
                

                //Spouse
                var fmd5 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "spouse");
                
                    fmd5.fname = model.Spousedetails.fname;
                    fmd5.fdateofbirth = model.Spousedetails.fdateofbirth;
                    fmd5.faadhar = model.Spousedetails.faadhar;
                    fmd5.fcontact = model.Spousedetails.fcontact;
                    fmd5.foccupation = model.Spousedetails.foccupation;
                    fmd5.freside = model.Spousedetails.freside;
                    fmd5.ftown = model.Spousedetails.ftown;
                    fmd5.fstate = model.Spousedetails.fstate;
                

                //Children
                var fmd6 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "children");
                
                    fmd6.fname = model.Childrendetails.fname;
                    fmd6.fdateofbirth = model.Childrendetails.fdateofbirth;
                    fmd6.faadhar = model.Childrendetails.faadhar;
                    fmd6.fcontact = model.Childrendetails.fcontact;
                    fmd6.foccupation = model.Childrendetails.foccupation;
                    fmd6.freside = model.Childrendetails.freside;
                    fmd6.ftown = model.Childrendetails.ftown;
                    fmd6.fstate = model.Childrendetails.fstate;
                

                //OTHER DETAILS
                var otd = entity.other_details.SingleOrDefault(od => od.employee_id == updateid);
                
                    otd.propertyowner_name = model.Otherdetails.propertyowner_name;
                    otd.propertyowner_contact = model.Otherdetails.propertyowner_contact;
                    otd.propertyowner_address = model.Otherdetails.propertyowner_address;
                    otd.propertyowner_occupation = model.Otherdetails.propertyowner_occupation;

                    otd.neighbour1_name = model.Otherdetails.neighbour1_name;
                    otd.neighbour1_contact = model.Otherdetails.neighbour1_contact;
                    otd.neighbour1_address = model.Otherdetails.neighbour1_address;
                    otd.neighbour1_occupation = model.Otherdetails.neighbour1_occupation;

                    otd.neighbour2_name = model.Otherdetails.neighbour2_name;
                    otd.neighbour2_contact = model.Otherdetails.neighbour2_contact;
                    otd.neighbour2_address = model.Otherdetails.neighbour2_address;
                    otd.neighbour2_occupation = model.Otherdetails.neighbour2_occupation;
                

                //EDUCATIONAL QUALIFICATIONS
                var eq = entity.educational_qualifications.SingleOrDefault(eqf => eqf.employee_id == updateid);
                
                    eq.tenth_school = model.Educationalqualifications.tenth_school;
                    eq.tenth_board = model.Educationalqualifications.tenth_board;
                    eq.tenth_grade = model.Educationalqualifications.tenth_grade;
                    eq.tenth_yearofpassing = model.Educationalqualifications.tenth_yearofpassing;

                    eq.twelfth_school = model.Educationalqualifications.twelfth_school;
                    eq.twelfth_board = model.Educationalqualifications.twelfth_board;
                    eq.twelfth_grade = model.Educationalqualifications.twelfth_grade;
                    eq.twelfth_yearofpassing = model.Educationalqualifications.twelfth_yearofpassing;

                    eq.bachelors_college = model.Educationalqualifications.bachelors_college;
                    eq.bachelors_university = model.Educationalqualifications.bachelors_university;
                    eq.bachelors_grade = model.Educationalqualifications.bachelors_grade;
                    eq.bachelors_yearofpassing = model.Educationalqualifications.bachelors_yearofpassing;

                    eq.masters_college = model.Educationalqualifications.masters_college;
                    eq.masters_university = model.Educationalqualifications.masters_university;
                    eq.masters_grade = model.Educationalqualifications.masters_grade;
                    eq.masters_yearofpassing = model.Educationalqualifications.masters_yearofpassing;

                    eq.other_school = model.Educationalqualifications.other_school;
                    eq.other_board = model.Educationalqualifications.other_board;
                    eq.other_grade = model.Educationalqualifications.other_grade;
                    eq.other_yearofpassing = model.Educationalqualifications.other_yearofpassing;
                

                //CERTIFICATION DETAILS 
                var cf1 = entity.certifications.SingleOrDefault(ct => ct.employee_id == updateid && ct.cert_type == "1");
                
                cf1.certification_name = model.Certification1.certification_name;

                var cf2 = entity.certifications.SingleOrDefault(ct2 => ct2.employee_id == updateid && ct2.cert_type == "2");
                
                cf2.certification_name = model.Certification2.certification_name;

                var cf3 = entity.certifications.SingleOrDefault(ct3 => ct3.employee_id == updateid && ct3.cert_type == "3");
                
                cf3.certification_name = model.Certification3.certification_name;

                var cf4 = entity.certifications.SingleOrDefault(ct4 => ct4.employee_id == updateid && ct4.cert_type == "4");
                
                cf4.certification_name = model.Certification4.certification_name;

                //PREVIOUS COMPANY DETAILS
                var pd = entity.previous_company_details.SingleOrDefault(pcd => pcd.employee_id == updateid);
                pd.pf_account_number = model.Previouscompanydetails.pf_account_number;
                pd.fps_account_number = model.Previouscompanydetails.fps_account_number;
                pd.pf_employers_code_number = model.Previouscompanydetails.pf_employers_code_number;
                pd.life_insurance = model.Previouscompanydetails.life_insurance;
                pd.esi_employers_code_number = model.Previouscompanydetails.esi_employers_code_number;
                pd.esi_insurance_number = model.Previouscompanydetails.esi_insurance_number;
                pd.mediclaim = model.Previouscompanydetails.mediclaim;

                //PREVIOUS EMPLOYMENT DETAILS 
                var preempd1 = entity.prev_employ_1.SingleOrDefault(pmd1 => pmd1.employee_id == updateid && pmd1.employment_ref == "1");
                preempd1.employers_name = model.Prevemploy1.employers_name;
                preempd1.designation = model.Prevemploy1.designation;
                preempd1.periodworked_from = model.Prevemploy1.periodworked_from;
                preempd1.periodworked_to = model.Prevemploy1.periodworked_to;
                preempd1.reason_of_leaving = model.Prevemploy1.reason_of_leaving;
                preempd1.reporting_manager = model.Prevemploy1.reporting_manager;
                preempd1.rm_designation= model.Prevemploy1.rm_designation;
                preempd1.rm_contact= model.Prevemploy1.rm_contact;
                preempd1.ctc= model.Prevemploy1.ctc;
                preempd1.monthly_gross_salary= model.Prevemploy1.monthly_gross_salary;
                preempd1.attendence = model.Prevemploy1.attendence;
                preempd1.re_hire_status= model.Prevemploy1.re_hire_status;

                var preempd2 = entity.prev_employ_1.SingleOrDefault(pmd2 => pmd2.employee_id == updateid && pmd2.employment_ref == "2");
                preempd2.employers_name = model.Prevemploy2.employers_name;
                preempd2.designation = model.Prevemploy2.designation;
                preempd2.periodworked_from = model.Prevemploy2.periodworked_from;
                preempd2.periodworked_to = model.Prevemploy2.periodworked_to;
                preempd2.reason_of_leaving = model.Prevemploy2.reason_of_leaving;
                preempd2.reporting_manager = model.Prevemploy2.reporting_manager;
                preempd2.rm_designation = model.Prevemploy2.rm_designation;
                preempd2.rm_contact = model.Prevemploy2.rm_contact;
                preempd2.ctc = model.Prevemploy2.ctc;
                preempd2.monthly_gross_salary = model.Prevemploy2.monthly_gross_salary;
                preempd2.attendence = model.Prevemploy2.attendence;
                preempd2.re_hire_status = model.Prevemploy2.re_hire_status;

                var preempd3 = entity.prev_employ_1.SingleOrDefault(pmd3 => pmd3.employee_id == updateid && pmd3.employment_ref == "3");
                preempd3.employers_name = model.Prevemploy3.employers_name;
                preempd3.designation = model.Prevemploy3.designation;
                preempd3.periodworked_from = model.Prevemploy3.periodworked_from;
                preempd3.periodworked_to = model.Prevemploy3.periodworked_to;
                preempd3.reason_of_leaving = model.Prevemploy3.reason_of_leaving;
                preempd3.reporting_manager = model.Prevemploy3.reporting_manager;
                preempd3.rm_designation = model.Prevemploy3.rm_designation;
                preempd3.rm_contact = model.Prevemploy3.rm_contact;
                preempd3.ctc = model.Prevemploy3.ctc;
                preempd3.monthly_gross_salary = model.Prevemploy3.monthly_gross_salary;
                preempd3.attendence = model.Prevemploy3.attendence;
                preempd3.re_hire_status = model.Prevemploy3.re_hire_status;

                var preempd4 = entity.prev_employ_1.SingleOrDefault(pmd4 => pmd4.employee_id == updateid && pmd4.employment_ref == "4");
                preempd4.employers_name = model.Prevemploy4.employers_name;
                preempd4.designation = model.Prevemploy4.designation;
                preempd4.periodworked_from = model.Prevemploy4.periodworked_from;
                preempd4.periodworked_to = model.Prevemploy4.periodworked_to;
                preempd4.reason_of_leaving = model.Prevemploy4.reason_of_leaving;
                preempd4.reporting_manager = model.Prevemploy4.reporting_manager;
                preempd4.rm_designation = model.Prevemploy4.rm_designation;
                preempd4.rm_contact = model.Prevemploy4.rm_contact;
                preempd4.ctc = model.Prevemploy4.ctc;
                preempd4.monthly_gross_salary = model.Prevemploy4.monthly_gross_salary;
                preempd4.attendence = model.Prevemploy4.attendence;
                preempd4.re_hire_status = model.Prevemploy4.re_hire_status;

                var preempd5 = entity.prev_employ_1.SingleOrDefault(pmd5 => pmd5.employee_id == updateid && pmd5.employment_ref == "5");
                preempd5.employers_name = model.Prevemploy5.employers_name;
                preempd5.designation = model.Prevemploy5.designation;
                preempd5.periodworked_from = model.Prevemploy5.periodworked_from;
                preempd5.periodworked_to = model.Prevemploy5.periodworked_to;
                preempd5.reason_of_leaving = model.Prevemploy5.reason_of_leaving;
                preempd5.reporting_manager = model.Prevemploy5.reporting_manager;
                preempd5.rm_designation = model.Prevemploy5.rm_designation;
                preempd5.rm_contact = model.Prevemploy5.rm_contact;
                preempd5.ctc = model.Prevemploy5.ctc;
                preempd5.monthly_gross_salary = model.Prevemploy5.monthly_gross_salary;
                preempd5.attendence = model.Prevemploy5.attendence;
                preempd5.re_hire_status = model.Prevemploy5.re_hire_status;

                //ADDITIONAL INFORMATION
                var adi = entity.additional_information.SingleOrDefault(ad => ad.employee_id == updateid);
                adi.known_to_presentemployee = model.Additionalinformation.known_to_presentemployee;
                adi.name_of_knownemployee = model.Additionalinformation.name_of_knownemployee;
                adi.relationship_with_knownemployee = model.Additionalinformation.relationship_with_knownemployee;
                adi.periodworked_from = model.Additionalinformation.periodworked_from;
                adi.periodworked_to = model.Additionalinformation.periodworked_to;
                adi.roleID = model.Additionalinformation.roleID;
                adi.DeptID= model.Additionalinformation.DeptID;

                //REFERENCES
                var ref1 = entity.references.SingleOrDefault(rf1 => rf1.employee_id == updateid && rf1.ref_type == "1");
                ref1.name = model.Reference1.name;
                ref1.address = model.Reference1.address;
                ref1.designation = model.Reference1.designation;

                var ref2 = entity.references.SingleOrDefault(rf2 => rf2.employee_id == updateid && rf2.ref_type == "2");
                ref2.name = model.Reference2.name;
                ref2.address = model.Reference2.address;
                ref2.designation = model.Reference2.designation;

                //FEEDBACK 
                var fb = entity.feedback.SingleOrDefault(fdb => fdb.employee_id == updateid);
                fb.hr_manual = model.Feedback.hr_manual;
                fb.cims_idpassword = model.Feedback.cims_idpassword;
                fb.books = model.Feedback.books;
                fb.library_card = model.Feedback.library_card;
                fb.hr_anyother = model.Feedback.hr_anyother;

                fb.identitycard = model.Feedback.identitycard;
                fb.bank_account = model.Feedback.bank_account;
                fb.notepad = model.Feedback.notepad;
                fb.pen = model.Feedback.pen;
                fb.employee_card = model.Feedback.employee_card;
                fb.admin_anyother = model.Feedback.admin_anyother;

                fb.computer_system = model.Feedback.computer_system;
                fb.headphones = model.Feedback.headphones;
                fb.emailid_password = model.Feedback.emailid_password;
                fb.network_ip = model.Feedback.network_ip;
                fb.firewall_id = model.Feedback.firewall_id;
                fb.domain_usernamepassword = model.Feedback.domain_usernamepassword;
                fb.messengers_access = model.Feedback.messengers_access;
                fb.systemadmin_anyother = model.Feedback.systemadmin_anyother;

                fb.hrmanual_and_responsibilities = model.Feedback.hrmanual_and_responsibilities;


                entity.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
            return Content("<script type=text/javascript>alert('Employee Details Updated');window.location.href='/Edit/EditIndex2'</script>");
        }

        // GET: Edit/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Edit/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
