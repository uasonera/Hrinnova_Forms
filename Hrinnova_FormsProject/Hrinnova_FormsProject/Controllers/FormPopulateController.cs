using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Web;
using System.Web.Mvc;

using Cygnet.ProjMan.EFData.DataSource;
using Hrinnova_FormsProject.Models;
using Cygnet.ProjMan.EFData.ViewModels;
using Cygnet.ProjMan.EFData.Service;

namespace Hrinnova_FormsProject.Controllers
{

    /// <summary>
    /// Class FormPopulateController.
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    public class FormPopulateController : Controller
    {
        #region Declarations
        /// <summary>
        /// The entity
        /// </summary>
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        /// <summary>
        /// The modelobject
        /// </summary>
        MainModel modelobject = new MainModel();
        /// <summary>
        /// The edit get service
        /// </summary>
        EditGetService _editGetService = new EditGetService();
        /// <summary>
        /// The employee details service
        /// </summary>
        CreateService _employeeDetailsService = new CreateService();
        /// <summary>
        /// Employees the details.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult EmployeeDetails(int id)
        {
            modelobject.Maritalstatus = new List<Maritalstatus>()
            {
                new Maritalstatus { Id=1,Status="Married"},
                new Maritalstatus { Id=2,Status="Unmarried"},
                new Maritalstatus { Id=3,Status="Widow"},
                new Maritalstatus { Id=4,Status="Widower"},
                new Maritalstatus { Id=5,Status="Divorcee"}
            };

            Session["id"] = id;

            var queryforrole = (from employeedetails in entity.employee_details
                                join roles in entity.role on employeedetails.roleID equals roles.roleID
                                join departments in entity.department on employeedetails.DeptID equals departments.DeptID
                                where employeedetails.employee_id == id
                                select new { roles.roleID, roles.name, departments.DeptName, departments.DeptID });
            var rolesData = new role()
            {
                name = queryforrole.FirstOrDefault().name,
                roleID = queryforrole.FirstOrDefault().roleID,

            };
           
            var ms = new Maritalstatus()
            {
                Id = entity.employee_details.FirstOrDefault().marital_status ?? 0 ,
                Status = modelobject.Maritalstatus.FirstOrDefault().Status,
            };
            var deptdata = new department()
            {
                DeptName = queryforrole.FirstOrDefault().DeptName,
                DeptID = queryforrole.FirstOrDefault().DeptID,
            };

            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
           
            modelobject.Employeedetails.role = rolesData;
            modelobject.Employeedetails.department1 = deptdata;
            modelobject.Fatherdetails = _editGetService.EditGetforFamilyDetails(id).Fatherdetails;
            modelobject.Motherdetails = _editGetService.EditGetforFamilyDetails(id).Motherdetails;
            modelobject.Brotherdetails = _editGetService.EditGetforFamilyDetails(id).Brotherdetails;
            modelobject.Sisterdetails = _editGetService.EditGetforFamilyDetails(id).Sisterdetails;
            modelobject.Spousedetails = _editGetService.EditGetforFamilyDetails(id).Spousedetails;
            modelobject.Childrendetails = _editGetService.EditGetforFamilyDetails(id).Childrendetails;

            return View(modelobject);
        }
        #endregion

        #region EmploymentForm
        /// <summary>
        /// Employments the form.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult EmploymentForm(int id)
        {
            var queryforrole = (from employeedetails in entity.employee_details
                                join roles in entity.role on employeedetails.roleID equals roles.roleID
                                join departments in entity.department on employeedetails.DeptID equals departments.DeptID
                                where employeedetails.employee_id == id
                                select new { roles.roleID, roles.name, departments.DeptName, departments.DeptID });
            var rolesData = new role()
            {
                name = queryforrole.FirstOrDefault().name,
                roleID = queryforrole.FirstOrDefault().roleID,

            };
            
            var deptdata = new department()
            {
                DeptName = queryforrole.FirstOrDefault().DeptName,
                DeptID = queryforrole.FirstOrDefault().DeptID,
            };
            Session["id"] = id;

            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);

            modelobject.Employeedetails.role = rolesData;
            modelobject.Employeedetails.department1 = deptdata;
            modelobject.Fatherdetails = _editGetService.EditGetforFamilyDetails(id).Fatherdetails;
            modelobject.Motherdetails = _editGetService.EditGetforFamilyDetails(id).Motherdetails;
            modelobject.Brotherdetails = _editGetService.EditGetforFamilyDetails(id).Brotherdetails;
            modelobject.Sisterdetails = _editGetService.EditGetforFamilyDetails(id).Sisterdetails;
            modelobject.Spousedetails = _editGetService.EditGetforFamilyDetails(id).Spousedetails;
            modelobject.Childrendetails = _editGetService.EditGetforFamilyDetails(id).Childrendetails;

            modelobject.Additionalinformation = _editGetService.EditGetforAdditionalInformation(id);
            modelobject.Educationalqualifications = _editGetService.EditGetforEducationalQualifications(id);
            modelobject.Epfodetails = _editGetService.EditGetforEpfoDetails(id);
            modelobject.Esicdetails = _editGetService.EditGetforEsicDetails(id);
            modelobject.Otherdetails = _editGetService.EditGetforOtherDetails(id);
            modelobject.Feedback = _editGetService.EditGetforFeedback(id);
            modelobject.Previouscompanydetails = _editGetService.EditGetforPreviousCompanyDetails(id);
            modelobject.Certification2 = _editGetService.EditGetforCertifications(id).Certification1;
            modelobject.Certification1 = _editGetService.EditGetforCertifications(id).Certification2;
            modelobject.Certification3 = _editGetService.EditGetforCertifications(id).Certification3;
            modelobject.Certification4 = _editGetService.EditGetforCertifications(id).Certification4;
            modelobject.Reference1 = _editGetService.EditGetforReferences(id).Reference1;
            modelobject.Reference2 = _editGetService.EditGetforReferences(id).Reference2;
            modelobject.Prevemploy1 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy1;
            modelobject.Prevemploy2 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy2;
            modelobject.Prevemploy3 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy3;
            modelobject.Prevemploy4 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy4;
            modelobject.Prevemploy5 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy5;

            return View(modelobject);
        }
        #endregion

        #region EsicForm
        /// <summary>
        /// Esicforms the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult Esicform(int id)
        {
            modelobject.Maritalstatus = new List<Maritalstatus>()
            {
                new Maritalstatus { Id=1,Status="Married"},
                new Maritalstatus { Id=2,Status="Unmarried"},
                new Maritalstatus { Id=3,Status="Widow"},
                new Maritalstatus { Id=4,Status="Widower"},
                new Maritalstatus { Id=5,Status="Divorcee"}
            };
            var ms = new Maritalstatus()
            {
                Id = entity.employee_details.FirstOrDefault().marital_status ?? 0,
                Status = modelobject.Maritalstatus.FirstOrDefault().Status,
            };
            Session["id"] = id;
            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
            modelobject.Esicdetails = _editGetService.EditGetforEsicDetails(id);

            modelobject.Fatherdetails = _editGetService.EditGetforFamilyDetails(id).Fatherdetails;
            modelobject.Motherdetails = _editGetService.EditGetforFamilyDetails(id).Motherdetails;
            modelobject.Brotherdetails = _editGetService.EditGetforFamilyDetails(id).Brotherdetails;
            modelobject.Sisterdetails = _editGetService.EditGetforFamilyDetails(id).Sisterdetails;
            modelobject.Spousedetails = _editGetService.EditGetforFamilyDetails(id).Spousedetails;
            modelobject.Childrendetails = _editGetService.EditGetforFamilyDetails(id).Childrendetails;
            var employernameaddress = System.Configuration.ConfigurationManager.AppSettings["employernameaddress"].ToString();
            return View(modelobject);
        }
        #endregion

        #region EpfoForm
        /// <summary>
        /// Epfoforms the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult Epfoform(int id)
        {
            modelobject.Maritalstatus = new List<Maritalstatus>()
            {
                new Maritalstatus { Id=1,Status="Married"},
                new Maritalstatus { Id=2,Status="Unmarried"},
                new Maritalstatus { Id=3,Status="Widow"},
                new Maritalstatus { Id=4,Status="Widower"},
                new Maritalstatus { Id=5,Status="Divorcee"}
            };
            var ms = new Maritalstatus()
            {
                Id = entity.employee_details.FirstOrDefault().marital_status ?? 0,
                Status = modelobject.Maritalstatus.FirstOrDefault().Status,
            };
            Session["id"] = id;
            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
            modelobject.Epfodetails = _editGetService.EditGetforEpfoDetails(id);

            modelobject.Prevemploy1 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy1;
            return View(modelobject);
        }
        #endregion

        #region SUMS EmployeeVerification
        /// <summary>
        /// Sumses the employee verification.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult SUMSEmployeeVerification(int id)
        {
            Session["id"] = id;
            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
            modelobject.Prevemploy1 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy1;
            modelobject.Prevemploy2 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy2;
            modelobject.Prevemploy3 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy3;
            return View(modelobject);
        }
        #endregion

        #region PF TransferForm
        /// <summary>
        /// Pfs the transfer form.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult PFTransferForm(int id)
        {

            Session["id"] = id;
            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
            modelobject.Epfodetails = _editGetService.EditGetforEpfoDetails(id);
            modelobject.Prevemploy1 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy1;
            return View(modelobject);
        }
        #endregion

        #region EmployeeReferenceCheck
        /// <summary>
        /// Employees the reference check.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult EmployeeReferenceCheck(int id)
        {
            Session["id"] = id;
            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
            modelobject.Epfodetails = _editGetService.EditGetforEpfoDetails(id);
            modelobject.Prevemploy1 = _editGetService.EditGetforPreviousEmployment(id).Prevemploy1;
            return View(modelobject);
        }
        #endregion

        #region FeedbackForm
        /// <summary>
        /// Feedbacks the form.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult FeedbackForm(int id)
        {

            Session["id"] = id;
            var queryforrole = (from employeedetails in entity.employee_details
                                join roles in entity.role on employeedetails.roleID equals roles.roleID
                                join departments in entity.department on employeedetails.DeptID equals departments.DeptID
                                where employeedetails.employee_id == id
                                select new { roles.roleID, roles.name, departments.DeptName, departments.DeptID });
            var rolesData = new role()
            {
                name = queryforrole.FirstOrDefault().name,
                roleID = queryforrole.FirstOrDefault().roleID,

            };

            modelobject.Employeedetails = _editGetService.EditGetforEmployeeDetails(id);
            modelobject.Employeedetails.role = rolesData;
            modelobject.Feedback = _editGetService.EditGetforFeedback(id);
            return View(modelobject);
        }
        #endregion
    }
}
