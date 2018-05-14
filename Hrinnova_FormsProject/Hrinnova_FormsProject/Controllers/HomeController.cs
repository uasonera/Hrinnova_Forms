using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.Mvc;
using Cygnet.ProjMan.EFData.ViewModels;
using Cygnet.ProjMan.EFData.Service;
using Cygnet.ProjMan.EFData.DataSource;

namespace Hrinnova_FormsProject.Controllers
{
    public class HomeController : Controller
    {
        EmployeeDetailsService _employeeDetailsService= new EmployeeDetailsService(); 
        AdditionalInformationService _additionalInformationService= new AdditionalInformationService();
        EducationalQualificationsService _educationalQualificationsService= new EducationalQualificationsService();
        EpfoDetailsService _epfoDetailsService= new EpfoDetailsService();
        EsicDetailsService _esicDetailsService= new EsicDetailsService();
        FamilyDetailsService _familyDetailsService= new FamilyDetailsService();
        FeedbackService _feedbackService = new FeedbackService();
        OtherDetailsService _otherDetailsService = new OtherDetailsService();
        PreviousEmploymentService _previousEmploymentService = new PreviousEmploymentService();
        PreviousCompanyDetailsService _previousCompanyDetailsService = new PreviousCompanyDetailsService();
        ReferencesService _referencesService = new ReferencesService();
        CertificationsService _certificationsService = new CertificationsService();
        [HandleError]
        public ActionResult Index()
        {
            hrinnova_dbEntities _hrinnova_dbEntities = new hrinnova_dbEntities();
            MainModel MainModel = new MainModel();
            
            MainModel.Designations = _hrinnova_dbEntities.role.ToList();
            MainModel.Departments = _hrinnova_dbEntities.department.ToList();
            MainModel.Maritalstatus= new List<Maritalstatus>()
            {
                new Maritalstatus { Id=1,Status="Married"},
                new Maritalstatus { Id=2,Status="Unmarried"},
                new Maritalstatus { Id=3,Status="Widow"},
                new Maritalstatus { Id=4,Status="Widower"},
                new Maritalstatus { Id=5,Status="Divorcee"}
            };
            MainModel.Bloodgroups = new List<Bloodgroups>()
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
            return View(MainModel);
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
        [HandleError]
        public ActionResult CreatePost(MainModel form1)
        {

            try
            {
                if (!ModelState.IsValid)
                    return RedirectToAction(nameof(Index));

                //Your code...
                //Could also be before try if you know the exception occurs in SaveChanges
                _employeeDetailsService.Create(form1);
                _additionalInformationService.Create(form1);
                _educationalQualificationsService.EducationalQualifications(form1);
                _certificationsService.Create(form1);
                _epfoDetailsService.EpfoDetails(form1);
                _esicDetailsService.EsicDetails(form1);
                _feedbackService.Feedback(form1);
                _otherDetailsService.OtherDetails(form1);
                _previousCompanyDetailsService.PreviousCompanyDetails(form1);
                _previousEmploymentService.Create(form1);
                _referencesService.References(form1);
                _familyDetailsService.Create(form1);
           
            }

            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);
                return View(exceptionMessage);
            }

            //return RedirectToAction("Index");
            return Content("<script type=text/javascript>alert('Employee Details Added');window.location.href='/Home/Index'</script>");
        }
        [HandleError]
        public ActionResult sss()
        {
            return View();
        }


        public void  con(employee_detailsModel employee_detailsModel)
        {
           var c =  Mapper.ConvertTo(employee_detailsModel);
        }

    }
}
//}
