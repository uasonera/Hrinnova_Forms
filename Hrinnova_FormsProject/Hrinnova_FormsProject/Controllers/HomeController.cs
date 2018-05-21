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
    /// <summary>
    /// Class HomeController.
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    public class HomeController : Controller
    {
        /// <summary>
        /// The employee details service
        /// </summary>
        CreateService _employeeDetailsService = new CreateService();
       
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
        /// <summary>
        /// Form1s this instance.
        /// </summary>
        /// <returns>PartialViewResult.</returns>
        public PartialViewResult Form1()
        {
            return PartialView("_Form1");
        }
        /// <summary>
        /// Form2s this instance.
        /// </summary>
        /// <returns>PartialViewResult.</returns>
        public PartialViewResult Form2()
        {
            return PartialView("_Form2");
        }
        /// <summary>
        /// Form3s this instance.
        /// </summary>
        /// <returns>PartialViewResult.</returns>
        public PartialViewResult Form3()
        {
            return PartialView("_Form3");
        }
        /// <summary>
        /// Form4s this instance.
        /// </summary>
        /// <returns>PartialViewResult.</returns>
        public PartialViewResult Form4()
        {
            return PartialView("_Form4");
        }
        /// <summary>
        /// Form5s this instance.
        /// </summary>
        /// <returns>PartialViewResult.</returns>
        public PartialViewResult Form5()
        {
            return PartialView("_Form5");
        }

        /// <summary>
        /// Creates the post.
        /// </summary>
        /// <param name="mainmodel">The mainmodel.</param>
        /// <returns>ActionResult.</returns>
        [HttpPost]
        [HandleError]
        public ActionResult CreatePost(MainModel mainmodel)
        {
            
            try
            //Try code for exception handling of Database Errors
            {
                
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Select(x => x.Value.Errors).Where(y => y.Count > 0).ToList();
                    mainmodel.Errors = new List<string>();
                    foreach (var item in errors)
                    {
                        mainmodel.Errors.Add(item.FirstOrDefault().ErrorMessage);
                    }
                    return PartialView("_ErrorView", mainmodel);
                }
                //Could also be before try if you know the exception occurs in SaveChanges
                _employeeDetailsService.Create(mainmodel);
           
            }

            //Catch code for exception handling of Database Errors
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(" The validation errors are: ", fullErrorMessage);
                mainmodel.Errors = new List<string>();
                
                    mainmodel.Errors.Add(exceptionMessage);

                //return View(exceptionMessage);
                return PartialView("_ErrorView", mainmodel);
            }
            

            //returns to Index page after saving data;
            return Content("<script type=text/javascript>alert('Employee Details Added');window.location.href='/Home/Index'</script>");
        }
        //public PartialViewResult ErrorPage() {
        //    return PartialView("Error");
        //}
        
    }
}
//}
