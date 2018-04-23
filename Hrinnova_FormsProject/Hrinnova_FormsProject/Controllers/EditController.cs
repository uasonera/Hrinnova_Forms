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
            //var test = from employee_details in entity.employee_details.Take(100) select employee_details;

            eim.employeedetails = from employee_details in entity.employee_details.Take(1000) select employee_details;
            
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
            model.departments = entity.department.ToList();
            model.designations = entity.role.ToList();
            model.maritalstatus = new List<maritalstatus>()
            {
                new maritalstatus { id=1,status="Married"},
                new maritalstatus { id=2,status="Unmarried"},
                new maritalstatus { id=3,status="Widow"},
                new maritalstatus { id=4,status="Widower"},
                new maritalstatus { id=5,status="Divorcee"}
            };

            Session["id"] = id;
            eim.employeedetails = entity.employee_details.Where(mm => mm.employee_id == id);
            model.employeedetails = entity.employee_details.FirstOrDefault(ed => ed.employee_id == id);
            model.esicdetails = entity.esic_details.FirstOrDefault(ms => ms.employee_id == id);
            model.epfodetails = entity.epfo_details.FirstOrDefault(epfod => epfod.employee_id == id);
            model.fatherdetails = entity.family_details.FirstOrDefault(fmd => fmd.employee_id == id && fmd.member == "father");
            model.motherdetails = entity.family_details.FirstOrDefault(mmd => mmd.employee_id == id && mmd.member == "mother");
            model.brotherdetails = entity.family_details.FirstOrDefault(bd => bd.employee_id == id && bd.member == "brother");
            model.sisterdetails = entity.family_details.FirstOrDefault(sd => sd.employee_id == id && sd.member == "sister");
            model.spousedetails = entity.family_details.FirstOrDefault(ssd => ssd.employee_id == id && ssd.member == "spouse");
            model.childrendetails = entity.family_details.FirstOrDefault(cd => cd.employee_id == id && cd.member == "children");
            model.otherdetails = entity.other_details.FirstOrDefault(od => od.employee_id == id);
            model.educationalqualifications = entity.educational_qualifications.FirstOrDefault(eq => eq.employee_id == id);
            model.previouscompanydetails = entity.previous_company_details.FirstOrDefault(pcd => pcd.employee_id == id);
            model.prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            model.prevemploy2 = entity.prev_employ_1.FirstOrDefault(pe2 => pe2.employee_id == id && pe2.employment_ref == "2");
            model.prevemploy3 = entity.prev_employ_1.FirstOrDefault(pe3 => pe3.employee_id == id && pe3.employment_ref == "3");
            model.prevemploy4 = entity.prev_employ_1.FirstOrDefault(pe4 => pe4.employee_id == id && pe4.employment_ref == "4");
            model.prevemploy5 = entity.prev_employ_1.FirstOrDefault(pe5 => pe5.employee_id == id && pe5.employment_ref == "5");
            model.additionalinformation = entity.additional_information.FirstOrDefault(ai => ai.employee_id == id);
            model.reference1 = entity.references.FirstOrDefault(rf1 => rf1.employee_id == id && rf1.ref_type == "1");
            model.reference2 = entity.references.FirstOrDefault(rf2 => rf2.employee_id == id && rf2.ref_type == "2");
            model.feedback = entity.feedback.FirstOrDefault(fb => fb.employee_id == id);
            model.certification1 = entity.certifications.FirstOrDefault(c1 => c1.employee_id == id && c1.cert_type == "1");
            model.certification2 = entity.certifications.FirstOrDefault(c2 => c2.employee_id == id && c2.cert_type == "2");
            model.certification3 = entity.certifications.FirstOrDefault(c3 => c3.employee_id == id && c3.cert_type == "3");
            model.certification4 = entity.certifications.FirstOrDefault(c4 => c4.employee_id == id && c4.cert_type == "4");
            model.feedback = entity.feedback.FirstOrDefault(fb => fb.employee_id == id);
            

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
                ed.designation = model.employeedetails.designation;
                ed.department = model.employeedetails.department;
                ed.firstname = model.employeedetails.firstname;
                ed.middlename = model.employeedetails.middlename;
                ed.surname = model.employeedetails.surname;
                ed.gender = model.employeedetails.gender;
                ed.date_of_birth = model.employeedetails.date_of_birth;
                ed.date_of_joining = model.employeedetails.date_of_joining;
                ed.marital_status = model.employeedetails.marital_status;
                ed.marriage_anniversary = model.employeedetails.marriage_anniversary;
                ed.blood_group = model.employeedetails.blood_group;
                ed.mobile_number = model.employeedetails.mobile_number;
                ed.home_number = model.employeedetails.home_number;
                ed.alternate_number = model.employeedetails.alternate_number;
                ed.emergency_number = model.employeedetails.emergency_number;
                ed.email_id = model.employeedetails.email_id;
                ed.permanent_address = model.employeedetails.permanent_address;
                ed.temporary_address = model.employeedetails.temporary_address;
                ed.aadhar_card = model.employeedetails.aadhar_card;
                ed.pan_card = model.employeedetails.pan_card;
                ed.passport_number = model.employeedetails.passport_number;
                ed.passport_validity = model.employeedetails.passport_validity;
                ed.election_card = model.employeedetails.election_card;
                ed.vehicle_number = model.employeedetails.vehicle_number;
                ed.single_bank_account = model.employeedetails.single_bank_account;
                ed.ifs_code = model.employeedetails.ifs_code;
                ed.allergies = model.employeedetails.allergies;
                ed.known_ailments = model.employeedetails.known_ailments;

                //ESIC DETAILS
                var esicd = entity.esic_details.SingleOrDefault(esi => esi.employee_id == updateid);
                esicd.insurance_number = model.esicdetails.insurance_number;
                esicd.branch_office = model.esicdetails.branch_office;
                esicd.dispensary = model.esicdetails.dispensary;
                esicd.employers_code = model.esicdetails.employers_code;
                esicd.date_of_appointment = model.esicdetails.date_of_appointment;
                esicd.employers_nameandaddress = model.esicdetails.employers_nameandaddress;
                esicd.previous_insurance_number = model.esicdetails.previous_insurance_number;
                esicd.name_of_nominee = model.esicdetails.name_of_nominee;
                esicd.nominee_relationship = model.esicdetails.nominee_relationship;
                esicd.nominee_address = model.esicdetails.nominee_address;

                //EPFO DETAILS
                var epfod = entity.epfo_details.SingleOrDefault(epf => epf.employee_id == updateid);
                epfod.presentcompany_pfnumber = model.epfodetails.presentcompany_pfnumber;
                epfod.member_of_epfoscheme = model.epfodetails.member_of_epfoscheme;
                epfod.member_of_epsscheme = model.epfodetails.member_of_epsscheme;
                epfod.universal_account_number = model.epfodetails.universal_account_number;
                epfod.prev_pf_acc_number = model.epfodetails.prev_pf_acc_number;
                epfod.scheme_certificate_number = model.epfodetails.scheme_certificate_number;
                epfod.ppo_number = model.epfodetails.ppo_number;
                epfod.international_worker = model.epfodetails.international_worker;
                epfod.country_of_origin = model.epfodetails.country_of_origin;

                //FAMILY DETAILS 
                //Father
                var fmd1 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "father");
                fmd1.member = "father";
                fmd1.fname = model.fatherdetails.fname;
                fmd1.fdateofbirth = model.fatherdetails.fdateofbirth;
                fmd1.faadhar = model.fatherdetails.faadhar;
                fmd1.fcontact = model.fatherdetails.fcontact;
                fmd1.foccupation = model.fatherdetails.foccupation;
                fmd1.freside = model.fatherdetails.freside;
                fmd1.ftown = model.fatherdetails.ftown;
                fmd1.fstate = model.fatherdetails.fstate;
                //Mother
                var fmd2 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "mother");
                fmd2.member = "mother";
                fmd2.fname = model.motherdetails.fname;
                fmd2.fdateofbirth = model.motherdetails.fdateofbirth;
                fmd2.faadhar = model.motherdetails.faadhar;
                fmd2.fcontact = model.motherdetails.fcontact;
                fmd2.foccupation = model.motherdetails.foccupation;
                fmd2.freside = model.motherdetails.freside;
                fmd2.ftown = model.motherdetails.ftown;
                fmd2.fstate = model.motherdetails.fstate;
                //Brother
                var fmd3 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "brother");
                fmd3.member = "brother";
                fmd3.fname = model.brotherdetails.fname;
                fmd3.fdateofbirth = model.brotherdetails.fdateofbirth;
                fmd3.faadhar = model.brotherdetails.faadhar;
                fmd3.fcontact = model.brotherdetails.fcontact;
                fmd3.foccupation = model.brotherdetails.foccupation;
                fmd3.freside = model.brotherdetails.freside;
                fmd3.ftown = model.brotherdetails.ftown;
                fmd3.fstate = model.brotherdetails.fstate;
                //Sister
                var fmd4 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "sister");
                fmd4.member = "sister";
                fmd4.fname = model.sisterdetails.fname;
                fmd4.fdateofbirth = model.sisterdetails.fdateofbirth;
                fmd4.faadhar = model.sisterdetails.faadhar;
                fmd4.fcontact = model.sisterdetails.fcontact;
                fmd4.foccupation = model.sisterdetails.foccupation;
                fmd4.freside = model.sisterdetails.freside;
                fmd4.ftown = model.sisterdetails.ftown;
                fmd4.fstate = model.sisterdetails.fstate;
                //Spouse
                var fmd5 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "spouse");
                fmd5.member = "spouse";
                fmd5.fname = model.spousedetails.fname;
                fmd5.fdateofbirth = model.spousedetails.fdateofbirth;
                fmd5.faadhar = model.spousedetails.faadhar;
                fmd5.fcontact = model.spousedetails.fcontact;
                fmd5.foccupation = model.spousedetails.foccupation;
                fmd5.freside = model.spousedetails.freside;
                fmd5.ftown = model.spousedetails.ftown;
                fmd5.fstate = model.spousedetails.fstate;
                //Children
                var fmd6 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "children");
                fmd6.member = "children";
                fmd6.fname = model.childrendetails.fname;
                fmd6.fdateofbirth = model.childrendetails.fdateofbirth;
                fmd6.faadhar = model.childrendetails.faadhar;
                fmd6.fcontact = model.childrendetails.fcontact;
                fmd6.foccupation = model.childrendetails.foccupation;
                fmd6.freside = model.childrendetails.freside;
                fmd6.ftown = model.childrendetails.ftown;
                fmd6.fstate = model.childrendetails.fstate;

                //OTHER DETAILS
                var otd = entity.other_details.SingleOrDefault(od => od.employee_id == updateid);
                otd.propertyowner_name = model.otherdetails.propertyowner_name;
                otd.propertyowner_contact = model.otherdetails.propertyowner_contact;
                otd.propertyowner_address = model.otherdetails.propertyowner_address;
                otd.propertyowner_occupation = model.otherdetails.propertyowner_occupation;

                otd.neighbour1_name = model.otherdetails.neighbour1_name;
                otd.neighbour1_contact = model.otherdetails.neighbour1_contact;
                otd.neighbour1_address = model.otherdetails.neighbour1_address;
                otd.neighbour1_occupation = model.otherdetails.neighbour1_occupation;

                otd.neighbour2_name = model.otherdetails.neighbour2_name;
                otd.neighbour2_contact = model.otherdetails.neighbour2_contact;
                otd.neighbour2_address = model.otherdetails.neighbour2_address;
                otd.neighbour2_occupation = model.otherdetails.neighbour2_occupation;

                //EDUCATIONAL QUALIFICATIONS
                var eq = entity.educational_qualifications.SingleOrDefault(eqf => eqf.employee_id == updateid);
                eq.tenth_school = model.educationalqualifications.tenth_school;
                eq.tenth_board = model.educationalqualifications.tenth_board;
                eq.tenth_grade = model.educationalqualifications.tenth_grade;
                eq.tenth_yearofpassing = model.educationalqualifications.tenth_yearofpassing;

                eq.twelfth_school = model.educationalqualifications.twelfth_school;
                eq.twelfth_board = model.educationalqualifications.twelfth_board;
                eq.twelfth_grade = model.educationalqualifications.twelfth_grade;
                eq.twelfth_yearofpassing = model.educationalqualifications.twelfth_yearofpassing;

                eq.bachelors_college = model.educationalqualifications.bachelors_college;
                eq.bachelors_university = model.educationalqualifications.bachelors_university;
                eq.bachelors_grade = model.educationalqualifications.bachelors_grade;
                eq.bachelors_yearofpassing = model.educationalqualifications.bachelors_yearofpassing;

                eq.masters_college = model.educationalqualifications.masters_college;
                eq.masters_university = model.educationalqualifications.masters_university;
                eq.masters_grade = model.educationalqualifications.masters_grade;
                eq.masters_yearofpassing = model.educationalqualifications.masters_yearofpassing;

                eq.other_school = model.educationalqualifications.other_school;
                eq.other_board = model.educationalqualifications.other_board;
                eq.other_grade = model.educationalqualifications.other_grade;
                eq.other_yearofpassing = model.educationalqualifications.other_yearofpassing;

                //CERTIFICATION DETAILS 
                var cf1 = entity.certifications.SingleOrDefault(ct => ct.employee_id == updateid && ct.cert_type == "1");
                cf1.cert_type = "1";
                cf1.certification_name = model.certification1.certification_name;

                var cf2 = entity.certifications.SingleOrDefault(ct2 => ct2.employee_id == updateid && ct2.cert_type == "2");
                cf2.cert_type = "2";
                cf2.certification_name = model.certification1.certification_name;

                var cf3 = entity.certifications.SingleOrDefault(ct3 => ct3.employee_id == updateid && ct3.cert_type == "3");
                cf3.cert_type = "3";
                cf3.certification_name = model.certification1.certification_name;

                var cf4 = entity.certifications.SingleOrDefault(ct4 => ct4.employee_id == updateid && ct4.cert_type == "4");
                cf4.cert_type = "4";
                cf4.certification_name = model.certification1.certification_name;

                //PREVIOUS COMPANY DETAILS
                var pd = entity.previous_company_details.SingleOrDefault(pcd => pcd.employee_id == updateid);
                pd.pf_account_number = model.previouscompanydetails.pf_account_number;
                pd.fps_account_number = model.previouscompanydetails.fps_account_number;
                pd.pf_employers_code_number = model.previouscompanydetails.pf_employers_code_number;
                pd.life_insurance = model.previouscompanydetails.life_insurance;
                pd.esi_employers_code_number = model.previouscompanydetails.esi_employers_code_number;
                pd.esi_insurance_number = model.previouscompanydetails.esi_insurance_number;
                pd.mediclaim = model.previouscompanydetails.mediclaim;

                //PREVIOUS EMPLOYMENT DETAILS 
                var preempd1 = entity.prev_employ_1.SingleOrDefault(pmd1 => pmd1.employee_id == updateid && pmd1.employment_ref == "1");
                preempd1.employers_name = model.prevemploy1.employers_name;
                preempd1.designation = model.prevemploy1.designation;
                preempd1.periodworked_from = model.prevemploy1.periodworked_from;
                preempd1.periodworked_to = model.prevemploy1.periodworked_to;
                preempd1.reason_of_leaving = model.prevemploy1.reason_of_leaving;

                var preempd2 = entity.prev_employ_1.SingleOrDefault(pmd2 => pmd2.employee_id == updateid && pmd2.employment_ref == "2");
                preempd2.employers_name = model.prevemploy2.employers_name;
                preempd2.designation = model.prevemploy2.designation;
                preempd2.periodworked_from = model.prevemploy2.periodworked_from;
                preempd2.periodworked_to = model.prevemploy2.periodworked_to;
                preempd2.reason_of_leaving = model.prevemploy2.reason_of_leaving;

                var preempd3 = entity.prev_employ_1.SingleOrDefault(pmd3 => pmd3.employee_id == updateid && pmd3.employment_ref == "3");
                preempd3.employers_name = model.prevemploy3.employers_name;
                preempd3.designation = model.prevemploy3.designation;
                preempd3.periodworked_from = model.prevemploy3.periodworked_from;
                preempd3.periodworked_to = model.prevemploy3.periodworked_to;
                preempd3.reason_of_leaving = model.prevemploy3.reason_of_leaving;

                var preempd4 = entity.prev_employ_1.SingleOrDefault(pmd4 => pmd4.employee_id == updateid && pmd4.employment_ref == "4");
                preempd4.employers_name = model.prevemploy4.employers_name;
                preempd4.designation = model.prevemploy4.designation;
                preempd4.periodworked_from = model.prevemploy4.periodworked_from;
                preempd4.periodworked_to = model.prevemploy4.periodworked_to;
                preempd4.reason_of_leaving = model.prevemploy4.reason_of_leaving;

                var preempd5 = entity.prev_employ_1.SingleOrDefault(pmd5 => pmd5.employee_id == updateid && pmd5.employment_ref == "5");
                preempd5.employers_name = model.prevemploy5.employers_name;
                preempd5.designation = model.prevemploy5.designation;
                preempd5.periodworked_from = model.prevemploy5.periodworked_from;
                preempd5.periodworked_to = model.prevemploy5.periodworked_to;
                preempd5.reason_of_leaving = model.prevemploy5.reason_of_leaving;

                //ADDITIONAL INFORMATION
                var adi = entity.additional_information.SingleOrDefault(ad => ad.employee_id == updateid);
                adi.known_to_presentemployee = model.additionalinformation.known_to_presentemployee;
                adi.name_of_knownemployee = model.additionalinformation.name_of_knownemployee;
                adi.relationship_with_knownemployee = model.additionalinformation.relationship_with_knownemployee;

                //REFERENCES
                var ref1 = entity.references.SingleOrDefault(rf1 => rf1.employee_id == updateid && rf1.ref_type == "1");
                ref1.name = model.reference1.name;
                ref1.address = model.reference1.address;
                ref1.designation = model.reference1.designation;

                var ref2 = entity.references.SingleOrDefault(rf2 => rf2.employee_id == updateid && rf2.ref_type == "2");
                ref2.name = model.reference2.name;
                ref2.address = model.reference2.address;
                ref2.designation = model.reference2.designation;

                //FEEDBACK 
                var fb = entity.feedback.SingleOrDefault(fdb => fdb.employee_id == updateid);
                fb.hr_manual = model.feedback.hr_manual;
                fb.cims_idpassword = model.feedback.cims_idpassword;
                fb.books = model.feedback.books;
                fb.library_card = model.feedback.library_card;
                fb.hr_anyother = model.feedback.hr_anyother;

                fb.identitycard = model.feedback.identitycard;
                fb.bank_account = model.feedback.bank_account;
                fb.notepad = model.feedback.notepad;
                fb.pen = model.feedback.pen;
                fb.employee_card = model.feedback.employee_card;
                fb.admin_anyother = model.feedback.admin_anyother;

                fb.computer_system = model.feedback.computer_system;
                fb.headphones = model.feedback.headphones;
                fb.emailid_password = model.feedback.emailid_password;
                fb.network_ip = model.feedback.network_ip;
                fb.firewall_id = model.feedback.firewall_id;
                fb.domain_usernamepassword = model.feedback.domain_usernamepassword;
                fb.messengers_access = model.feedback.messengers_access;
                fb.systemadmin_anyother = model.feedback.systemadmin_anyother;

                fb.hrmanual_and_responsibilities = model.feedback.hrmanual_and_responsibilities;


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
            return Content("<script type=text/javascript>alert('Student Added Successfully');window.location.href='/Edit/EditIndex2'</script>");
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
