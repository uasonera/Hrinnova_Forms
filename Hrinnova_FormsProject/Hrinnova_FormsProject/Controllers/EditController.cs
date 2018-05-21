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
using System.Data.Entity;

namespace Hrinnova_FormsProject.Controllers
{
    /// <summary>
    /// Class EditController.
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    public class EditController : Controller
    {
        #region Service and Entity objects
        /// <summary>
        /// The entity
        /// </summary>
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        // GET: Edit
        /// <summary>
        /// The edit get service
        /// </summary>
        EditGetService _editGetService = new EditGetService();
        /// <summary>
        /// The edit post service
        /// </summary>
        EditPostService _editPostService = new EditPostService();
        /// <summary>
        /// The eim
        /// </summary>
        EditIndexModel eim = new EditIndexModel();
        /// <summary>
        /// The employee details service
        /// </summary>
        CreateService _employeeDetailsService = new CreateService();
        #endregion

        //Get method to show index of employees
        #region MEthod for Edit Index View
        /// <summary>
        /// Edits the index2.
        /// </summary>
        /// <param name="searchstring">The searchstring.</param>
        /// <returns>ActionResult.</returns>

        public ActionResult EditIndex2(string searchstring)

        {
            eim.Employeedetails = entity.employee_details.Take(10000).ToList();
            return View(eim);
        }

        #endregion


        // GET: Edit/Edit/5  
        #region Method to Get Details for Editing 
        /// <summary>
        /// Edits the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>

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
            
            model.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
            model.Fatherdetails = _editGetService.EditGetforFamilyDetails(id).Fatherdetails;
            model.Motherdetails = _editGetService.EditGetforFamilyDetails(id).Motherdetails;
            model.Brotherdetails = _editGetService.EditGetforFamilyDetails(id).Brotherdetails;
            model.Sisterdetails= _editGetService.EditGetforFamilyDetails(id).Sisterdetails;
            model.Spousedetails = _editGetService.EditGetforFamilyDetails(id).Spousedetails;
            model.Childrendetails = _editGetService.EditGetforFamilyDetails(id).Childrendetails;
            model.Additionalinformation = _editGetService.EditGetforAdditionalInformation(id);
            model.Educationalqualifications = _editGetService.EditGetforEducationalQualifications(id);
            model.Epfodetails = _editGetService.EditGetforEpfoDetails(id);
            model.Esicdetails = _editGetService.EditGetforEsicDetails(id);
            model.Otherdetails = _editGetService.EditGetforOtherDetails(id);
            model.Feedback = _editGetService.EditGetforFeedback(id);
            model.Previouscompanydetails = _editGetService.EditGetforPreviousCompanyDetails(id);
            model.Certification2 = _editGetService.EditGetforCertifications(id).Certification1;
            model.Certification1 = _editGetService.EditGetforCertifications(id).Certification2;
            model.Certification3 = _editGetService.EditGetforCertifications(id).Certification3;
            model.Certification4 = _editGetService.EditGetforCertifications(id).Certification4;
            model.Reference1 = _editGetService.EditGetforReferences(id).Reference1;
            model.Reference2 = _editGetService.EditGetforReferences(id).Reference2;
            model.Prevemploy1 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy1;
            model.Prevemploy2 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy2;
            model.Prevemploy3 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy3;
            model.Prevemploy4 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy4;
            model.Prevemploy5 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy5;

            return View(model);
        }
        #endregion


        // POST: Edit/Edit/5
        #region Method to Post Details after Editing 
        /// <summary>
        /// Editdatas the specified model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>ActionResult.</returns>
        /// <exception cref="DbEntityValidationException"></exception>

        [HttpPost]
        public ActionResult Editdata(MainModel model)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Select(x => x.Value.Errors).Where(y => y.Count > 0).ToList();
                    model.Errors = new List<string>();
                    foreach (var item in errors)
                    {
                        model.Errors.Add(item.FirstOrDefault().ErrorMessage);
                    }
                    return PartialView("_ErrorView", model);
                }

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

                    _editPostService.EditPostforEmployeeDetails(model.Employeedetails, EmployeeDetails);
                    _editPostService.EditPostforAdditionalInformation(model.Additionalinformation, AdditionalInformation);
                    _editPostService.EditPostforCertifications(model.Certification1, cf1);
                    _editPostService.EditPostforCertifications(model.Certification2, cf2);
                    _editPostService.EditPostforCertifications(model.Certification3, cf3);
                    _editPostService.EditPostforCertifications(model.Certification4, cf4);
                    _editPostService.EditPostforEducationalQualifications(model.Educationalqualifications, eq);
                    _editPostService.EditPostforEpfoDetails(model.Epfodetails, epfod);
                    _editPostService.EditPostforEsicDetails(model.Esicdetails, esicd);
                    _editPostService.EditPostforFamilyDetails(model.Fatherdetails, fmd1);
                    _editPostService.EditPostforFamilyDetails(model.Motherdetails, fmd2);
                    _editPostService.EditPostforFamilyDetails(model.Brotherdetails, fmd3);
                    _editPostService.EditPostforFamilyDetails(model.Sisterdetails, fmd4);
                    _editPostService.EditPostforFamilyDetails(model.Spousedetails, fmd5);
                    _editPostService.EditPostforFamilyDetails(model.Childrendetails, fmd6);
                    _editPostService.EditPostforFeedback(model.Feedback, fb);
                    _editPostService.EditPostforOtherDetails(model.Otherdetails, otd);
                    _editPostService.EditPostforPreviousCompanyDetails(model.Previouscompanydetails, pd);
                    _editPostService.EditPostforPreviousEmployment(model.Prevemploy1, preempd1);
                    _editPostService.EditPostforPreviousEmployment(model.Prevemploy2, preempd2);
                    _editPostService.EditPostforPreviousEmployment(model.Prevemploy3, preempd3);
                    _editPostService.EditPostforPreviousEmployment(model.Prevemploy4, preempd4);
                    _editPostService.EditPostforPreviousEmployment(model.Prevemploy5, preempd5);
                    _editPostService.EditPostforReferences(model.Reference1, ref1);
                    _editPostService.EditPostforReferences(model.Reference2, ref2);


                    entity.SaveChanges();
                

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
        #endregion
       
    }
}
