using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class PreviousEmploymentService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        #region Constructors
        public PreviousEmploymentService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        #endregion

        #region Create Method
        public void Create(MainModel mainModel)
        {
            var prevemployment = Mapper.ConvertTo(mainModel.Prevemploy1);
            var prevemployment2 = Mapper.ConvertTo(mainModel.Prevemploy2);
            var prevemployment3 = Mapper.ConvertTo(mainModel.Prevemploy3);
            var prevemployment4 = Mapper.ConvertTo(mainModel.Prevemploy4);
            var prevemployment5 = Mapper.ConvertTo(mainModel.Prevemploy5);

            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment2);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment3);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment4);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment5);
            _hrinnova_dbEntities.SaveChanges();

        }
        #endregion

        #region Edit Get Method
        public MainModel EditGet(int id)
        {
            //var family_details = _hrinnova_dbEntities.employee_details.Find(id);
            var PreviousEmploymentss = _hrinnova_dbEntities.employee_details.Find(id);

            var prevEmp1 = PreviousEmploymentss.prev_employ_1.Where(pe1 => pe1.employment_ref== "1");
            var prevEmp2 = PreviousEmploymentss.prev_employ_1.Where(pe2 => pe2.employment_ref== "2");
            var prevEmp3 = PreviousEmploymentss.prev_employ_1.Where(pe3 => pe3.employment_ref== "3");
            var prevEmp4 = PreviousEmploymentss.prev_employ_1.Where(pe4 => pe4.employment_ref == "4");
            var prevEmp5 = PreviousEmploymentss.prev_employ_1.Where(pe5 => pe5.employment_ref == "5");

            List<prev_employ_1> PreviousEmployment = new List<prev_employ_1>();
            PreviousEmployment.AddRange(prevEmp1);
            PreviousEmployment.AddRange(prevEmp2);
            PreviousEmployment.AddRange(prevEmp3);
            PreviousEmployment.AddRange(prevEmp4);
            PreviousEmployment.AddRange(prevEmp5);

            var ListofprevEmployment = new List<prev_employ_1Model>();
            foreach (var item in PreviousEmployment)
            {

                ListofprevEmployment.Add(Mapper.ConvertFrom(item));
            }

            //var familydetailsmodel = Mapper.ConvertFrom(family);

            var mainmodel = new MainModel()
            {
                PreviousEmployments = ListofprevEmployment
            };


            return mainmodel;
        }
        #endregion

        #region Edit Post Method
        public void EditPost(prev_employ_1Model Prev_employ_1Model, prev_employ_1 entity)
        {
            entity.employers_name = Prev_employ_1Model.employers_name;
            entity.designation = Prev_employ_1Model.designation;
            entity.periodworked_from = Prev_employ_1Model.periodworked_from;
            entity.periodworked_to = Prev_employ_1Model.periodworked_to;
            entity.reason_of_leaving = Prev_employ_1Model.reason_of_leaving;
            entity.reporting_manager = Prev_employ_1Model.reporting_manager;
            entity.rm_designation = Prev_employ_1Model.rm_designation;
            entity.rm_contact = Prev_employ_1Model.rm_contact;
            entity.ctc = Prev_employ_1Model.ctc;
            entity.monthly_gross_salary = Prev_employ_1Model.monthly_gross_salary;
            entity.attendence = Prev_employ_1Model.attendence;
            entity.re_hire_status = Prev_employ_1Model.re_hire_status;
        }
        #endregion
    }
}
