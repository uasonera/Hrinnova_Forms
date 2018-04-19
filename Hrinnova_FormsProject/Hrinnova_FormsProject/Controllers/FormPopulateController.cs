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
            modelobject.sisterdetails = entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.childrendetails = entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
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
            modelobject.sisterdetails = entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.childrendetails = entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
            modelobject.otherdetails = entity.other_details.FirstOrDefault(oid => oid.employee_id == id);
            modelobject.educationalqualifications = entity.educational_qualifications.FirstOrDefault(eq => eq.employee_id == id);
            modelobject.certification1 = entity.certifications.FirstOrDefault(c1 => c1.employee_id == id && c1.cert_type == "1");
            modelobject.certification2 = entity.certifications.FirstOrDefault(c2 => c2.employee_id == id && c2.cert_type == "2");
            modelobject.certification3 = entity.certifications.FirstOrDefault(c3 => c3.employee_id == id && c3.cert_type == "3");
            modelobject.certification4 = entity.certifications.FirstOrDefault(c4 => c4.employee_id == id && c4.cert_type == "4");
            modelobject.previouscompanydetails = entity.previous_company_details.FirstOrDefault(pcd => pcd.employee_id == id);
            modelobject.prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            modelobject.prevemploy2 = entity.prev_employ_1.FirstOrDefault(pe2 => pe2.employee_id == id && pe2.employment_ref == "2");
            modelobject.prevemploy3 = entity.prev_employ_1.FirstOrDefault(pe3 => pe3.employee_id == id && pe3.employment_ref == "3");
            modelobject.prevemploy4 = entity.prev_employ_1.FirstOrDefault(pe4 => pe4.employee_id == id && pe4.employment_ref == "4");
            modelobject.prevemploy5 = entity.prev_employ_1.FirstOrDefault(pe5 => pe5.employee_id == id && pe5.employment_ref == "5");
            modelobject.additionalinformation = entity.additional_information.FirstOrDefault(ai => ai.employee_id == id);
            modelobject.reference1 = entity.references.FirstOrDefault(re1 => re1.employee_id == id);
            modelobject.reference2 = entity.references.FirstOrDefault(re2 => re2.employee_id == id);

            return View(modelobject);
        }
        public ActionResult Esicform(int id)
        {
            Session["id"] = id;
            modelobject.esicdetails = entity.esic_details.FirstOrDefault(ms => ms.employee_id == id);
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(nid => nid.employee_id == id);
            modelobject.fatherdetails = entity.family_details.FirstOrDefault(fid => fid.employee_id == id && fid.member == "father");
            modelobject.motherdetails = entity.family_details.FirstOrDefault(mid => mid.employee_id == id && mid.member == "mother");
            modelobject.brotherdetails = entity.family_details.FirstOrDefault(bid => bid.employee_id == id && bid.member == "brother");
            modelobject.spousedetails = entity.family_details.FirstOrDefault(sid => sid.employee_id == id && sid.member == "spouse");
            modelobject.sisterdetails = entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.childrendetails = entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
            var employernameaddress = System.Configuration.ConfigurationManager.AppSettings["employernameaddress"].ToString();
            return View(modelobject);
        }

        public ActionResult Epfoform(int id)
        {
            Session["id"] = id;
            modelobject.epfodetails = entity.epfo_details.FirstOrDefault(epfid => epfid.employee_id == id);
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(nid => nid.employee_id == id);
            modelobject.prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            return View(modelobject);
        }

        public ActionResult SUMSEmployeeVerification(int id)
        {
            Session["id"] = id;
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            modelobject.prevemploy2 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "2");
            modelobject.prevemploy3 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "3");
            return View(modelobject);
        }
        public ActionResult PFTransferForm(int id)
        {

            Session["id"] = id;
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.epfodetails = entity.epfo_details.FirstOrDefault(epfid => epfid.employee_id == id);
            modelobject.prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            return View(modelobject);
        }

        public ActionResult EmployeeReferenceCheck(int id)
        {
            Session["id"] = id;
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            return View(modelobject);
        }



        public ActionResult FeedbackForm(int id)
        {

            Session["id"] = id;
            modelobject.employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.feedback = entity.feedback.FirstOrDefault(fid => fid.employee_id == id);
            return View(modelobject);
        }
    }
}