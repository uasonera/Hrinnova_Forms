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
            modelobject.fatherdetails = entity.family_details.FirstOrDefault(fid => fid.employee_id == id && fid.member == "father");
            modelobject.motherdetails = entity.family_details.FirstOrDefault(mid => mid.employee_id == id && mid.member == "mother");
            modelobject.brotherdetails = entity.family_details.FirstOrDefault(bid => bid.employee_id == id && bid.member == "brother");
            modelobject.spousedetails = entity.family_details.FirstOrDefault(sid => sid.employee_id == id && sid.member == "spouse");
            modelobject.sisterdetails= entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.childrendetails= entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
            return View(modelobject);
        }

        public ActionResult EmploymentForm(int id)
        {
            Session["id"] = id;
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(nid => nid.employee_id == id);
            modelobject.prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            modelobject.fatherdetails = entity.family_details.FirstOrDefault(fid => fid.employee_id == id && fid.member == "father");
            modelobject.motherdetails = entity.family_details.FirstOrDefault(mid => mid.employee_id == id && mid.member == "mother");
            modelobject.brotherdetails = entity.family_details.FirstOrDefault(bid => bid.employee_id == id && bid.member == "brother");
            modelobject.spousedetails = entity.family_details.FirstOrDefault(sid => sid.employee_id == id && sid.member == "spouse");
            modelobject.sisterdetails= entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.childrendetails= entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
            return View(modelobject);
        }
    }
}