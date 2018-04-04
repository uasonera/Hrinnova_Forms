using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Hrinnova_FormsProject.DatabaseModel;
using Hrinnova_FormsProject.Models;

namespace Hrinnova_FormsProject.Controllers
{
    public class FormPopulateController : Controller
    {
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        Model2 modelobject = new Model2();
        // GET: FormPopulate
        public ActionResult EmployeeDetails(int id)
        {
            Session["id"] = id;
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(edid => edid.employee_id == id);
            modelobject.fatherdetails = entity.family_details.FirstOrDefault(iid => iid.employee_id == id && iid.member == "father");
            return View(modelobject);
        }
    }
}