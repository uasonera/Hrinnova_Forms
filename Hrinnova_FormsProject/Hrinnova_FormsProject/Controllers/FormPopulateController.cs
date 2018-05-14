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
    
    public class FormPopulateController : Controller
    {
        #region Declarations
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        MainModel modelobject = new MainModel();
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
        CertificationsService _certificationsService = new CertificationsService();
        #endregion
        
        #region EmployeeDetails
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

            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            var FamilyDetailsData = _familyDetailsService.EditGet(id);
           
            modelobject.Employeedetails.role = rolesData;
            modelobject.Employeedetails.department1 = deptdata;
            modelobject.Fatherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Father");
            modelobject.Motherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Mother");
            modelobject.Brotherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Brother");
            modelobject.Sisterdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Sister");
            modelobject.Spousedetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Spouse");
            modelobject.Childrendetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Children");
            
            return View(modelobject);
        }
        #endregion

        #region EmploymentForm
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
            
            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            
            modelobject.Employeedetails.role = rolesData;
            modelobject.Employeedetails.department1 = deptdata;
            var FamilyDetailsData = _familyDetailsService.EditGet(id);
            var CertificationsData = _certificationsService.EditGet(id);
            var AdditionalInformationData = _additionalInformationService.EditGet(id);
            var EducationalQualificationsData = _educationalQualificationsService.EditGet(id);
            var Referencesdata = _referencesService.EditGet(id);
            var PreviousEmploymentsData = _previousEmploymentService.EditGet(id);
            modelobject.Fatherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Father");
            modelobject.Motherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Mother");
            modelobject.Brotherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Brother");
            modelobject.Sisterdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Sister");
            modelobject.Spousedetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Spouse");
            modelobject.Childrendetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Children");
            modelobject.Additionalinformation = AdditionalInformationData;
            modelobject.Educationalqualifications = EducationalQualificationsData;
            modelobject.Epfodetails = _epfoDetailsService.EditGet(id);
            modelobject.Esicdetails = _esicDetailsService.EditEsicDetails(id);
            modelobject.Otherdetails = _otherDetailsService.EditGet(id);
            modelobject.Feedback = _feedbackService.EditGet(id);
            modelobject.Previouscompanydetails = _previousCompanyDetailsService.EditGet(id);
            modelobject.Certification1 = CertificationsData.Certifications.SingleOrDefault(x => x.cert_type == "1");
            modelobject.Certification2 = CertificationsData.Certifications.SingleOrDefault(x => x.cert_type == "2");
            modelobject.Certification3 = CertificationsData.Certifications.SingleOrDefault(x => x.cert_type == "3");
            modelobject.Certification4 = CertificationsData.Certifications.SingleOrDefault(x => x.cert_type == "4");
            modelobject.Reference1 = Referencesdata.References.SingleOrDefault(refr => refr.ref_type == "1");
            modelobject.Reference2 = Referencesdata.References.SingleOrDefault(refr => refr.ref_type == "2");
            modelobject.Prevemploy1 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "1");
            modelobject.Prevemploy2 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe2 => pe2.employment_ref == "2");
            modelobject.Prevemploy3 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe3 => pe3.employment_ref == "3");
            modelobject.Prevemploy4 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe4 => pe4.employment_ref == "4");
            modelobject.Prevemploy5 = PreviousEmploymentsData.PreviousEmployments.SingleOrDefault(pe5 => pe5.employment_ref == "5");

            return View(modelobject);
        }
        #endregion

        #region EsicForm
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
            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            modelobject.Esicdetails = _esicDetailsService.EditEsicDetails(id);
            var FamilyDetailsData = _familyDetailsService.EditGet(id);
            modelobject.Fatherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Father");
            modelobject.Motherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Mother");
            modelobject.Brotherdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Brother");
            modelobject.Sisterdetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Sister");
            modelobject.Spousedetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Spouse");
            modelobject.Childrendetails = FamilyDetailsData.FamilyDetails.SingleOrDefault(x => x.member == "Children");
            var employernameaddress = System.Configuration.ConfigurationManager.AppSettings["employernameaddress"].ToString();
            return View(modelobject);
        }
        #endregion

        #region EpfoForm
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
            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            modelobject.Epfodetails = _epfoDetailsService.EditGet(id);
            var PreviousEmploymentDetails = _previousEmploymentService.EditGet(id);
            modelobject.Prevemploy1 = PreviousEmploymentDetails.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "1");
            return View(modelobject);
        }
        #endregion

        #region SUMS EmployeeVerification
        public ActionResult SUMSEmployeeVerification(int id)
        {
            Session["id"] = id;
            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            var PreviousEmploymentDetails = _previousEmploymentService.EditGet(id);
            modelobject.Prevemploy1 = PreviousEmploymentDetails.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "1");
            modelobject.Prevemploy2 = PreviousEmploymentDetails.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "2");
            modelobject.Prevemploy3 = PreviousEmploymentDetails.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "3");
            return View(modelobject);
        }
        #endregion

        #region PF TransferForm
        public ActionResult PFTransferForm(int id)
        {

            Session["id"] = id;
            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            var PreviousEmploymentDetails = _previousEmploymentService.EditGet(id);
            modelobject.Epfodetails = _epfoDetailsService.EditGet(id);
            modelobject.Prevemploy1 = PreviousEmploymentDetails.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "1");
            return View(modelobject);
        }
        #endregion

        #region EmployeeReferenceCheck
        public ActionResult EmployeeReferenceCheck(int id)
        {
            Session["id"] = id;
            var PreviousEmploymentDetails = _previousEmploymentService.EditGet(id);
            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            modelobject.Prevemploy1 = PreviousEmploymentDetails.PreviousEmployments.SingleOrDefault(pe1 => pe1.employment_ref == "1");
            return View(modelobject);
        }
        #endregion

        #region FeedbackForm
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

            modelobject.Employeedetails = _employeeDetailsService.EditGet(id);
            modelobject.Employeedetails.role = rolesData;
            modelobject.Feedback = _feedbackService.EditGet(id);
            return View(modelobject);
        }
        #endregion
    }
}