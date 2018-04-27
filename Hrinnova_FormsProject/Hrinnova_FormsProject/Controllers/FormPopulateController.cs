using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
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
            modelobject.Maritalstatus = new List<Maritalstatus>()
            {
                new Maritalstatus { Id=1,Status="Married"},
                new Maritalstatus { Id=2,Status="Unmarried"},
                new Maritalstatus { Id=3,Status="Widow"},
                new Maritalstatus { Id=4,Status="Widower"},
                new Maritalstatus { Id=5,Status="Divorcee"}
            };

            Session["id"] = id;

            var queryforrole = (from e in entity.employee_details
                                join r in entity.role on e.roleID equals r.roleID
                                join gfsd in entity.department on e.DeptID equals gfsd.DeptID
                                where e.employee_id == id
                                select new { r.roleID, r.name, gfsd.DeptName, gfsd.DeptID });
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



            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(edid => edid.employee_id == id);
            modelobject.Employeedetails.role = rolesData;
            modelobject.Employeedetails.department1 = deptdata;
            modelobject.Fatherdetails = entity.family_details.FirstOrDefault(fid => fid.employee_id == id && fid.member == "father");
            modelobject.Motherdetails = entity.family_details.FirstOrDefault(mid => mid.employee_id == id && mid.member == "mother");
            modelobject.Brotherdetails = entity.family_details.FirstOrDefault(bid => bid.employee_id == id && bid.member == "brother");
            modelobject.Spousedetails = entity.family_details.FirstOrDefault(sid => sid.employee_id == id && sid.member == "spouse");
            modelobject.Sisterdetails = entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.Childrendetails = entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
            return View(modelobject);
        }

        public ActionResult EmploymentForm(int id)
        {
            var queryforrole = (from e in entity.employee_details
                                join r in entity.role on e.roleID equals r.roleID
                                join gfsd in entity.department on e.DeptID equals gfsd.DeptID
                                where e.employee_id == id
                                select new { r.roleID, r.name, gfsd.DeptName, gfsd.DeptID });
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
            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(nid => nid.employee_id == id);
            modelobject.Employeedetails.role = rolesData;
            modelobject.Employeedetails.department1 = deptdata;
            modelobject.Prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            modelobject.Fatherdetails = entity.family_details.FirstOrDefault(fid => fid.employee_id == id && fid.member == "father");
            modelobject.Motherdetails = entity.family_details.FirstOrDefault(mid => mid.employee_id == id && mid.member == "mother");
            modelobject.Brotherdetails = entity.family_details.FirstOrDefault(bid => bid.employee_id == id && bid.member == "brother");
            modelobject.Spousedetails = entity.family_details.FirstOrDefault(sid => sid.employee_id == id && sid.member == "spouse");
            modelobject.Sisterdetails = entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.Childrendetails = entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
            modelobject.Otherdetails = entity.other_details.FirstOrDefault(oid => oid.employee_id == id);
            modelobject.Educationalqualifications = entity.educational_qualifications.FirstOrDefault(eq => eq.employee_id == id);
            modelobject.Certification1 = entity.certifications.FirstOrDefault(c1 => c1.employee_id == id && c1.cert_type == "1");
            modelobject.Certification2 = entity.certifications.FirstOrDefault(c2 => c2.employee_id == id && c2.cert_type == "2");
            modelobject.Certification3 = entity.certifications.FirstOrDefault(c3 => c3.employee_id == id && c3.cert_type == "3");
            modelobject.Certification4 = entity.certifications.FirstOrDefault(c4 => c4.employee_id == id && c4.cert_type == "4");
            modelobject.Previouscompanydetails = entity.previous_company_details.FirstOrDefault(pcd => pcd.employee_id == id);
            modelobject.Prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            modelobject.Prevemploy2 = entity.prev_employ_1.FirstOrDefault(pe2 => pe2.employee_id == id && pe2.employment_ref == "2");
            modelobject.Prevemploy3 = entity.prev_employ_1.FirstOrDefault(pe3 => pe3.employee_id == id && pe3.employment_ref == "3");
            modelobject.Prevemploy4 = entity.prev_employ_1.FirstOrDefault(pe4 => pe4.employee_id == id && pe4.employment_ref == "4");
            modelobject.Prevemploy5 = entity.prev_employ_1.FirstOrDefault(pe5 => pe5.employee_id == id && pe5.employment_ref == "5");
            modelobject.Additionalinformation = entity.additional_information.FirstOrDefault(ai => ai.employee_id == id);
            modelobject.Reference1 = entity.references.FirstOrDefault(re1 => re1.employee_id == id);
            modelobject.Reference2 = entity.references.FirstOrDefault(re2 => re2.employee_id == id);

            return View(modelobject);
        }
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
            modelobject.Esicdetails = entity.esic_details.FirstOrDefault(md => md.employee_id == id);
            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(nid => nid.employee_id == id);
            modelobject.Fatherdetails = entity.family_details.FirstOrDefault(fid => fid.employee_id == id && fid.member == "father");
            modelobject.Motherdetails = entity.family_details.FirstOrDefault(mid => mid.employee_id == id && mid.member == "mother");
            modelobject.Brotherdetails = entity.family_details.FirstOrDefault(bid => bid.employee_id == id && bid.member == "brother");
            modelobject.Spousedetails = entity.family_details.FirstOrDefault(sid => sid.employee_id == id && sid.member == "spouse");
            modelobject.Sisterdetails = entity.family_details.FirstOrDefault(sisid => sisid.employee_id == id && sisid.member == "brother");
            modelobject.Childrendetails = entity.family_details.FirstOrDefault(cid => cid.employee_id == id && cid.member == "children");
            var employernameaddress = System.Configuration.ConfigurationManager.AppSettings["employernameaddress"].ToString();
            return View(modelobject);
        }

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
            modelobject.Epfodetails = entity.epfo_details.FirstOrDefault(epfid => epfid.employee_id == id);
            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(nid => nid.employee_id == id);
            modelobject.Prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            return View(modelobject);
        }

        public ActionResult SUMSEmployeeVerification(int id)
        {
            Session["id"] = id;
            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.Prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            modelobject.Prevemploy2 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "2");
            modelobject.Prevemploy3 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "3");
            return View(modelobject);
        }
        public ActionResult PFTransferForm(int id)
        {

            Session["id"] = id;
            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.Epfodetails = entity.epfo_details.FirstOrDefault(epfid => epfid.employee_id == id);
            modelobject.Prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            return View(modelobject);
        }

        public ActionResult EmployeeReferenceCheck(int id)
        {
            Session["id"] = id;
            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.Prevemploy1 = entity.prev_employ_1.FirstOrDefault(pe1 => pe1.employee_id == id && pe1.employment_ref == "1");
            return View(modelobject);
        }



        public ActionResult FeedbackForm(int id)
        {

            Session["id"] = id;
            modelobject.Employeedetails = entity.employee_details.FirstOrDefault(eid => eid.employee_id == id);
            modelobject.Feedback = entity.feedback.FirstOrDefault(fid => fid.employee_id == id);
            return View(modelobject);
        }
    }
}