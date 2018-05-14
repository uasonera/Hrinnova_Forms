using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Validation;
using Cygnet.ProjMan.EFData.ViewModels;
using Cygnet.ProjMan.EFData.DataSource;
using Hrinnova_FormsProject.Models;
using Cygnet.ProjMan.EFData.Service;

namespace Hrinnova_FormsProject.Controllers
{
    public class EditController : Controller
    {
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        // GET: Edit


        EditIndexModel eim = new EditIndexModel();
        EmployeeDetailsService _employeeDetailsService = new EmployeeDetailsService();
        AdditionalInformationService _additionalInformationService = new AdditionalInformationService();
        EducationalQualificationsService _educationalQualificationsService = new EducationalQualificationsService();
        EpfoDetailsService _epfoDetailsService = new EpfoDetailsService();
        EsicDetailsService _esicDetailsService = new EsicDetailsService();
        FamilyDetailsService _familyDetailsService = new FamilyDetailsService();
        FeedbackService _feedbackService = new FeedbackService();
        OtherDetailsService _otherDetailsService = new OtherDetailsService();
        PreviousEmploymentService _previousEmploymentService = new PreviousEmploymentService();
        PreviousCompanyDetailsService _previousCompanyDetailsService = new PreviousCompanyDetailsService();
        ReferencesService _referencesService = new ReferencesService();
        CertificationsService _certificationsService= new CertificationsService();

        //Get method to show index of employees

        public ActionResult EditIndex2(string searchstring)

        {
            //eim.Employeedetails = from employee_details in entity.employee_details.Take(10000) select employee_details;
            eim.Employeedetails = entity.employee_details.Take(10000).ToList();
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
            Session["id"] = id;
            MainModel model = new MainModel();
            model.Designations = entity.role.ToList();
            model.Departments = entity.department.ToList();
            
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

            var FamilyDetailsData = _familyDetailsService.EditGet(id);
            var CertificationsData = _certificationsService.EditGet(id);
            var AdditionalInformationData = _additionalInformationService.EditGet(id);
            var EducationalQualificationsData = _educationalQualificationsService.EditGet(id);
            var Referencesdata = _referencesService.EditGet(id);
            var PreviousEmploymentsData = _previousEmploymentService.EditGet(id);
            model.Employeedetails = _employeeDetailsService.EditGet(id);
            model.Fatherdetails= FamilyDetailsData.FamilyDetails.SingleOrDefault(x=>x.member=="Father");
            model.Motherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Mother");
            model.Brotherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Brother");
            model.Sisterdetails= FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Sister");
            model.Spousedetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Spouse");
            model.Childrendetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Children");
            model.Additionalinformation = AdditionalInformationData;
            model.Educationalqualifications = EducationalQualificationsData;
            model.Epfodetails = _epfoDetailsService.EditGet(id);
            model.Esicdetails = _esicDetailsService.EditEsicDetails(id);
            model.Otherdetails = _otherDetailsService.EditGet(id);
            model.Feedback = _feedbackService.EditGet(id);
            model.Previouscompanydetails = _previousCompanyDetailsService.EditGet(id);
            model.Certification1 = CertificationsData.Certifications.SingleOrDefault(x=>x.cert_type=="1");
            model.Certification2 = CertificationsData.Certifications.SingleOrDefault(x => x.cert_type == "2");
            model.Certification3 = CertificationsData.Certifications.SingleOrDefault(x => x.cert_type == "3");
            model.Certification4 = CertificationsData.Certifications.SingleOrDefault(x => x.cert_type == "4");
            model.Reference1 = Referencesdata.References.SingleOrDefault(refr => refr.ref_type == "1" );
            model.Reference2 = Referencesdata.References.SingleOrDefault(refr => refr.ref_type == "2");
            model.Prevemploy1 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "1");
            model.Prevemploy2 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe2 => pe2.employment_ref == "2");
            model.Prevemploy3 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe3 => pe3.employment_ref == "3");
            model.Prevemploy4 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe4 => pe4.employment_ref == "4");
            model.Prevemploy5 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe5 => pe5.employment_ref == "5");

            return View(model);
        }

        // POST: Edit/Edit/5
        [HttpPost]
        public ActionResult Editdata(MainModel model)
        {

            try
            {
                if (ModelState.IsValid)
                {

                    int updateid = Convert.ToInt32(Session["id"].ToString());
                    var EmployeeDetails = entity.employee_details.SingleOrDefault(x => x.employee_id == updateid);
                    var AdditionalInformation = entity.additional_information.SingleOrDefault(AIid => AIid.employee_id == updateid);
                    var cf1 = entity.certifications.SingleOrDefault(ct => ct.employee_id == updateid && ct.cert_type == "1");
                    var cf2 = entity.certifications.SingleOrDefault(ct2 => ct2.employee_id == updateid && ct2.cert_type == "2");
                    var cf3 = entity.certifications.SingleOrDefault(ct3 => ct3.employee_id == updateid && ct3.cert_type == "3");
                    var cf4 = entity.certifications.SingleOrDefault(ct4 => ct4.employee_id == updateid && ct4.cert_type == "4");
                    var eq = entity.educational_qualifications.SingleOrDefault(eqf => eqf.employee_id == updateid);
                    var epfod = entity.epfo_details.SingleOrDefault(epf => epf.employee_id == updateid);
                    var esicd = entity.esic_details.SingleOrDefault(esi => esi.employee_id == updateid);
                    var fmd1 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "father");
                    var fmd2 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "mother");
                    var fmd3 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "brother");
                    var fmd4 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "sister");
                    var fmd5 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "spouse");
                    var fmd6 = entity.family_details.SingleOrDefault(fmd => fmd.employee_id == updateid && fmd.member == "children");
                    var fb = entity.feedback.SingleOrDefault(fdb => fdb.employee_id == updateid);
                    var otd = entity.other_details.SingleOrDefault(od => od.employee_id == updateid);
                    var pd = entity.previous_company_details.SingleOrDefault(pcd => pcd.employee_id == updateid);
                    var preempd1 = entity.prev_employ_1.SingleOrDefault(pmd1 => pmd1.employee_id == updateid && pmd1.employment_ref == "1");
                    var preempd2 = entity.prev_employ_1.SingleOrDefault(pmd2 => pmd2.employee_id == updateid && pmd2.employment_ref == "2");
                    var preempd3 = entity.prev_employ_1.SingleOrDefault(pmd3 => pmd3.employee_id == updateid && pmd3.employment_ref == "3");
                    var preempd4 = entity.prev_employ_1.SingleOrDefault(pmd4 => pmd4.employee_id == updateid && pmd4.employment_ref == "4");
                    var preempd5 = entity.prev_employ_1.SingleOrDefault(pmd5 => pmd5.employee_id == updateid && pmd5.employment_ref == "5");
                    var ref1 = entity.references.SingleOrDefault(rf1 => rf1.employee_id == updateid && rf1.ref_type == "1");
                    var ref2 = entity.references.SingleOrDefault(rf2 => rf2.employee_id == updateid && rf2.ref_type == "2");

                    _employeeDetailsService.EditPost(model.Employeedetails, EmployeeDetails);
                    _additionalInformationService.EditPost(model.Additionalinformation, AdditionalInformation);
                    _certificationsService.EditPost(model.Certification1, cf1);
                    _certificationsService.EditPost(model.Certification2, cf2);
                    _certificationsService.EditPost(model.Certification3, cf3);
                    _certificationsService.EditPost(model.Certification4, cf4);
                    _educationalQualificationsService.EditPost(model.Educationalqualifications, eq);
                    _epfoDetailsService.EditPost(model.Epfodetails, epfod);
                    _esicDetailsService.EditPost(model.Esicdetails, esicd);
                    _familyDetailsService.EditPost(model.Fatherdetails, fmd1);
                    _familyDetailsService.EditPost(model.Motherdetails, fmd2);
                    _familyDetailsService.EditPost(model.Brotherdetails, fmd3);
                    _familyDetailsService.EditPost(model.Sisterdetails, fmd4);
                    _familyDetailsService.EditPost(model.Spousedetails, fmd5);
                    _familyDetailsService.EditPost(model.Childrendetails, fmd6);
                    _feedbackService.EditPost(model.Feedback, fb);
                    _otherDetailsService.EditPost(model.Otherdetails, otd);
                    _previousCompanyDetailsService.EditPost(model.Previouscompanydetails, pd);
                    _previousEmploymentService.EditPost(model.Prevemploy1, preempd1);
                    _previousEmploymentService.EditPost(model.Prevemploy2, preempd2);
                    _previousEmploymentService.EditPost(model.Prevemploy3, preempd3);
                    _previousEmploymentService.EditPost(model.Prevemploy4, preempd4);
                    _previousEmploymentService.EditPost(model.Prevemploy5, preempd5);
                    _referencesService.EditPost(model.Reference1, ref1);
                    _referencesService.EditPost(model.Reference2, ref2);
                    entity.SaveChanges();
                }

            }
            catch (DbEntityValidationException ex)
            {
                var errorMessages = ex.EntityValidationErrors
                     .SelectMany(x => x.ValidationErrors)
                     .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
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
