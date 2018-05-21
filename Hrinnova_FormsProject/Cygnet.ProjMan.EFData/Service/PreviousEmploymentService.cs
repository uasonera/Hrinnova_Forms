using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    /// <summary>
    /// Class PreviousEmploymentService.
    /// </summary>
    public class PreviousEmploymentService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        #region Constructors
        /// <summary>
        /// Initializes a new instance of the <see cref="PreviousEmploymentService"/> class.
        /// </summary>
        public PreviousEmploymentService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        #endregion

        

        #region Edit Get Method
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>MainModel.</returns>
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
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="Prev_employ_1Model">The previous employ 1 model.</param>
        /// <param name="entity">The entity.</param>
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
