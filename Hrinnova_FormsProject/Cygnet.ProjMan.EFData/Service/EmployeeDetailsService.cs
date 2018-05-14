using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Cygnet.ProjMan.EFData.Service
{
    public class EmployeeDetailsService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public EmployeeDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        #region Create Method
        public void Create(MainModel mainModel)
        {
            var EDetails = Mapper.ConvertTo(mainModel.Employeedetails);

            _hrinnova_dbEntities.employee_details.Add(EDetails);
            _hrinnova_dbEntities.SaveChanges();

        }
        #endregion

        #region Edit Get Method
        public employee_detailsModel EditGet(int id)
        {
            var employee_details = _hrinnova_dbEntities.employee_details.Where(x => x.employee_id == id).FirstOrDefault();
            var employee_detailsModel = Mapper.ConvertFrom(employee_details);

            return employee_detailsModel;
        }
        #endregion

        #region Edit Post Method

        public void EditPost(employee_detailsModel Employee_detailsModel, employee_details entity)
        {
            entity.employee_code = Employee_detailsModel.employee_code;
            entity.designation = Employee_detailsModel.designation;
            entity.department = Employee_detailsModel.department;
            entity.firstname = Employee_detailsModel.firstname;
            entity.middlename = Employee_detailsModel.middlename;
            entity.surname = Employee_detailsModel.surname;
            entity.gender = Employee_detailsModel.gender;
            entity.date_of_birth = Employee_detailsModel.date_of_birth;
            entity.date_of_joining = Employee_detailsModel.date_of_joining;
            entity.marital_status = Employee_detailsModel.marital_status;
            entity.marriage_anniversary = Employee_detailsModel.marriage_anniversary;
            entity.blood_group = Employee_detailsModel.blood_group;
            entity.mobile_number = Employee_detailsModel.mobile_number;
            entity.home_number = Employee_detailsModel.home_number;
            entity.alternate_number = Employee_detailsModel.alternate_number;
            entity.emergency_number = Employee_detailsModel.emergency_number;
            entity.email_id = Employee_detailsModel.email_id;
            entity.permanent_address = Employee_detailsModel.permanent_address;
            entity.temporary_address = Employee_detailsModel.temporary_address;
            entity.aadhar_card = Employee_detailsModel.aadhar_card;
            entity.pan_card = Employee_detailsModel.pan_card;
            entity.passport_number = Employee_detailsModel.passport_number;
            entity.passport_validity = Employee_detailsModel.passport_validity;
            entity.election_card = Employee_detailsModel.election_card;
            entity.vehicle_number = Employee_detailsModel.vehicle_number;
            entity.single_bank_account = Employee_detailsModel.single_bank_account;
            entity.ifs_code = Employee_detailsModel.ifs_code;
            entity.allergies = Employee_detailsModel.allergies;
            entity.known_ailments = Employee_detailsModel.known_ailments;
            entity.roleID = Employee_detailsModel.roleID;
            entity.DeptID = Employee_detailsModel.DeptID;
        }
        #endregion
    }
}
