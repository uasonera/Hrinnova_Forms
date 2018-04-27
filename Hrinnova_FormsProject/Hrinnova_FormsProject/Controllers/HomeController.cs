using Hrinnova_FormsProject.DatabaseModel;
using Hrinnova_FormsProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.Mvc;

namespace Hrinnova_FormsProject.Controllers
{
    public class HomeController : Controller
    {



        public ActionResult Index()
        {
            Model2 m = new Model2();
            hrinnova_dbEntities hrb = new hrinnova_dbEntities();
            m.Designations = hrb.role.ToList();
            m.Departments = hrb.department.ToList();
            m.Maritalstatus = new List<Maritalstatus>()
            {
                new Maritalstatus { Id=1,Status="Married"},
                new Maritalstatus { Id=2,Status="Unmarried"},
                new Maritalstatus { Id=3,Status="Widow"},
                new Maritalstatus { Id=4,Status="Widower"},
                new Maritalstatus { Id=5,Status="Divorcee"}
            };
            m.Bloodgroups = new List<Bloodgroups>()
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
            return View(m);
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
        public ActionResult CreatePost(Model2 form1)
        {


            hrinnova_dbEntities hd = new hrinnova_dbEntities();

            //try
            //{
            // Your code...
            // Could also be before try if you know the exception occurs in SaveChanges

            if (!ModelState.IsValid)
                return RedirectToAction(nameof(Index));

            employee_details ed = new employee_details();
            ed = form1.Employeedetails;
            hd.employee_details.Add(ed);

            // ESIC
            esic_details esicd = new esic_details();
            esicd = form1.Esicdetails;
            hd.esic_details.Add(esicd);

            //EPFO
            epfo_details epfod = new epfo_details();
            epfod = form1.Epfodetails;
            hd.epfo_details.Add(epfod);

            //Family Details
            //Father
            family_details fd = new family_details();
            fd = form1.Fatherdetails;
            hd.family_details.Add(fd);

            //Mother
            family_details f2d = new family_details();
            f2d = form1.Motherdetails;
            hd.family_details.Add(f2d);

            //Brother
            family_details f3d = new family_details();
            f3d = form1.Brotherdetails;
            hd.family_details.Add(f3d);

            //Sister
            family_details f4d = new family_details();
            f4d = form1.Sisterdetails;
            hd.family_details.Add(f4d);

            //Spouse
            family_details f5d = new family_details();
            f5d = form1.Spousedetails;
            hd.family_details.Add(f5d);

            //Children
            family_details f6d = new family_details();
            f6d = form1.Childrendetails;
            hd.family_details.Add(f6d);

            //OTHER DETAILS
            other_details od = new other_details();
            od = form1.Otherdetails;
            hd.other_details.Add(od);

            //EDUCATIONAL QUALIFICATIONS
            educational_qualifications eq = new educational_qualifications();
            eq = form1.Educationalqualifications;
            hd.educational_qualifications.Add(eq);

            //CERTIFICATION DETAILS
            certifications cf1 = new certifications();
            cf1 = form1.Certification1;
            hd.certifications.Add(cf1);

            certifications cf2 = new certifications();
            cf2 = form1.Certification2;
            hd.certifications.Add(cf2);

            certifications cf3 = new certifications();
            cf3 = form1.Certification3;
            hd.certifications.Add(cf3);

            certifications cf4 = new certifications();
            cf4 = form1.Certification4;
            hd.certifications.Add(cf4);

            //PREVIOUS EMPLOYMENT
            prev_employ_1 pe1 = new prev_employ_1();
            pe1 = form1.Prevemploy1;
            hd.prev_employ_1.Add(pe1);

            prev_employ_1 pe2 = new prev_employ_1();
            pe2 = form1.Prevemploy2;
            hd.prev_employ_1.Add(pe2);

            prev_employ_1 pe3 = new prev_employ_1();
            pe3 = form1.Prevemploy3;
            hd.prev_employ_1.Add(pe3);

            prev_employ_1 pe4 = new prev_employ_1();
            pe4 = form1.Prevemploy4;
            hd.prev_employ_1.Add(pe4);

            prev_employ_1 pe5 = new prev_employ_1();
            pe5 = form1.Prevemploy5;
            hd.prev_employ_1.Add(pe5);

            //PREVIOUS COMPANY DETAILS 
            previous_company_details pd = new previous_company_details();
            pd = form1.Previouscompanydetails;
            hd.previous_company_details.Add(pd);

            //ADDITIONAL INFORMATION
            additional_information ai = new additional_information();
            ai = form1.Additionalinformation;
            hd.additional_information.Add(ai);

            //REFERENCES
            references rf1 = new references();
            rf1 = form1.Reference1;
            hd.references.Add(rf1);

            references rf2 = new references();
            rf2 = form1.Reference2;
            hd.references.Add(rf2);

            //FEEDBACK
            //HR Department
            feedback fb = new feedback();
            fb = form1.Feedback;
            hd.feedback.Add(fb);

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
            //    return View(exceptionMessage);
            //}

            //return RedirectToAction("Index");
            return Content("<script type=text/javascript>alert('Employee Details Added');window.location.href='/Home/Index'</script>");
        }

    }
}
//}
