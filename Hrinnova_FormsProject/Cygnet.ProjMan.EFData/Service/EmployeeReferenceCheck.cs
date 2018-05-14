using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class EmployeeReferenceCheckService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public EmployeeReferenceCheckService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        public void EmployeeReferenceCheck(MainModel mainModel)
        {
            var EReferenceCheck = Mapper.ConvertTo(mainModel.Employeerefcheck);

            _hrinnova_dbEntities.employee_refcheck.Add(EReferenceCheck);
            _hrinnova_dbEntities.SaveChanges();

        }
        public employee_refcheckModel EditEmployeeReferenceCheck(int id)
        {
            var employeereferencecheck = _hrinnova_dbEntities.employee_refcheck.Find(id);
            var employee_refcheckModel = Mapper.ConvertFrom(employeereferencecheck);

            return employee_refcheckModel;
        }
        public void EditPost(employee_refcheckModel Employee_refcheckModel, employee_refcheck entity)
        {
            entity.tenth_school = Educational_qualificationsModel.tenth_school;
            entity.tenth_board = Educational_qualificationsModel.tenth_board;
            entity.tenth_grade = Educational_qualificationsModel.tenth_grade;
            entity.tenth_yearofpassing = Educational_qualificationsModel.tenth_yearofpassing;

            entity.twelfth_school = Educational_qualificationsModel.twelfth_school;
            entity.twelfth_board = Educational_qualificationsModel.twelfth_board;
            entity.twelfth_grade = Educational_qualificationsModel.twelfth_grade;
            entity.twelfth_yearofpassing = Educational_qualificationsModel.twelfth_yearofpassing;

            entity.bachelors_college = Educational_qualificationsModel.bachelors_college;
            entity.bachelors_university = Educational_qualificationsModel.bachelors_university;
            entity.bachelors_grade = Educational_qualificationsModel.bachelors_grade;
            entity.bachelors_yearofpassing = Educational_qualificationsModel.bachelors_yearofpassing;

            entity.masters_college = Educational_qualificationsModel.masters_college;
            entity.masters_university = Educational_qualificationsModel.masters_university;
            entity.masters_grade = Educational_qualificationsModel.masters_grade;
            entity.masters_yearofpassing = Educational_qualificationsModel.masters_yearofpassing;

            entity.other_school = Educational_qualificationsModel.other_school;
            entity.other_board = Educational_qualificationsModel.other_board;
            entity.other_grade = Educational_qualificationsModel.other_grade;
            entity.other_yearofpassing = Educational_qualificationsModel.other_yearofpassing;
        }
    }
}
