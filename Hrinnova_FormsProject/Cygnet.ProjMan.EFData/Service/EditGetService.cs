using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{


    public class EditGetService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        
        public employee_detailsModel EditGetforEmployeeDetails(int id)
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();

            var employee_details = _hrinnova_dbEntities.employee_details.Where(x => x.employee_id == id).FirstOrDefault();
            var employee_detailsModel = Mapper.ConvertFrom(employee_details);


            return employee_detailsModel;
        }
        public additional_informationModel EditGetforAdditionalInformation(int employee_id)
        {
            var additionalinformation = _hrinnova_dbEntities.additional_information.Where(x => x.employee_id == employee_id).FirstOrDefault();
            var additional_informationModel = Mapper.ConvertFrom(additionalinformation);

            return additional_informationModel;
        }
        public MainModel EditGetforCertifications(int id)
        {

            List<certifications> cert = _hrinnova_dbEntities.employee_details.Find(id).certifications.ToList();

            var listofcertifications = new List<certificationsModel>();
            foreach (var item in cert)
            {

                listofcertifications.Add(Mapper.ConvertFrom(item));
            }

            //var familydetailsmodel = Mapper.ConvertFrom(family);

            var mainmodel = new MainModel()
            {
                Certification1 = listofcertifications.SingleOrDefault(c => c.cert_type == "1"),
                Certification2 = listofcertifications.SingleOrDefault(c => c.cert_type == "2"),
                Certification3 = listofcertifications.SingleOrDefault(c => c.cert_type == "3"),
                Certification4 = listofcertifications.SingleOrDefault(c => c.cert_type == "4"),
            };


            return mainmodel;
        }
        public educational_qualificationsModel EditGetforEducationalQualifications(int id)
        {
            var educationalqualifications = _hrinnova_dbEntities.educational_qualifications.Where(x => x.employee_id == id).FirstOrDefault();
            var educational_qualificationsModel = Mapper.ConvertFrom(educationalqualifications);

            return educational_qualificationsModel;
        }
        public epfo_detailsModel EditGetforEpfoDetails(int id)
        {
            var epfodetails = _hrinnova_dbEntities.epfo_details.Where(x => x.employee_id == id).FirstOrDefault();
            var epfo_detailsModel = Mapper.ConvertFrom(epfodetails);

            return epfo_detailsModel;
        }
        public esic_detailsModel EditGetforEsicDetails(int id)
        {
            var esicdetails = _hrinnova_dbEntities.esic_details.Where(x => x.employee_id == id).FirstOrDefault();
            var esic_detailsModel = Mapper.ConvertFrom(esicdetails);

            return esic_detailsModel;
        }
        public MainModel EditGetforFamilyDetails(int id)
        {

            List<family_details> family_details = _hrinnova_dbEntities.employee_details.Find(id).family_details.ToList();

            var listofFamiliyDetailsModel = new List<family_detailsModel>();
            foreach (var item in family_details)
            {

                listofFamiliyDetailsModel.Add(Mapper.ConvertFrom(item));
            }

            var mainmodel = new MainModel()
            {
                Fatherdetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Father"),
                Motherdetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Mother"),
                Brotherdetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Brother"),
                Sisterdetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Sister"),
                Spousedetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Spouse"),
                Childrendetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Children")
            };

            return mainmodel;
        }
        public feedbackModel EditGetforFeedback(int id)
        {
            var feedback = _hrinnova_dbEntities.feedback.Where(x => x.employee_id == id).FirstOrDefault();
            var FeedbackModel = Mapper.ConvertFrom(feedback);

            return FeedbackModel;
        }
        public other_detailsModel EditGetforOtherDetails(int id)
        {
            var otherdetails = _hrinnova_dbEntities.other_details.Where(x => x.employee_id == id).FirstOrDefault();
            var Other_detailsModel = Mapper.ConvertFrom(otherdetails);

            return Other_detailsModel;
        }
        public previous_company_detailsModel EditGetforPreviousCompanyDetails(int id)
        {
            var previouscompanydetails = _hrinnova_dbEntities.previous_company_details.Where(x => x.employee_id == id).FirstOrDefault();
            var Previous_company_detailsModel = Mapper.ConvertFrom(previouscompanydetails);

            return Previous_company_detailsModel;
        }
        public MainModel EditGetforPreviousEmployment(int id)
        {
            //var family_details = _hrinnova_dbEntities.employee_details.Find(id);

            List<prev_employ_1> PreviousEmployment = _hrinnova_dbEntities.employee_details.Find(id).prev_employ_1.ToList();

            var ListofprevEmployment = new List<prev_employ_1Model>();
            foreach (var item in PreviousEmployment)
            {

                ListofprevEmployment.Add(Mapper.ConvertFrom(item));
            }

            //var familydetailsmodel = Mapper.ConvertFrom(family);

            var mainmodel = new MainModel()
            {
                Prevemploy1 = ListofprevEmployment.SingleOrDefault(pre => pre.employment_ref == "1"),
                Prevemploy2 = ListofprevEmployment.SingleOrDefault(pre => pre.employment_ref == "2"),
                Prevemploy3 = ListofprevEmployment.SingleOrDefault(pre => pre.employment_ref == "3"),
                Prevemploy4 = ListofprevEmployment.SingleOrDefault(pre => pre.employment_ref == "4"),
                Prevemploy5 = ListofprevEmployment.SingleOrDefault(pre => pre.employment_ref == "5"),
            };


            return mainmodel;
        }
        public MainModel EditGetforReferences(int id)
        {
            //var family_details = _hrinnova_dbEntities.employee_details.Find(id);

            List<references> family_details = _hrinnova_dbEntities.employee_details.Find(id).references.ToList();

            var listofreferences = new List<referencesModel>();
            foreach (var item in family_details)
            {

                listofreferences.Add(Mapper.ConvertFrom(item));
            }

            //var familydetailsmodel = Mapper.ConvertFrom(family);

            var mainmodel = new MainModel()
            {
                Reference1 = listofreferences.SingleOrDefault(refid => refid.ref_type == "1"),
                Reference2 = listofreferences.SingleOrDefault(refid => refid.ref_type == "2")
            };


            return mainmodel;
        }

    }
    public class EditGetAll
    {
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        MainModel mainModel = new MainModel();
        EditGetService _editGet = new EditGetService();
        Enums Enums = new Enums();
        public MainModel SetToModel(int id)
        {
            mainModel.Employeedetails = _editGet.EditGetforEmployeeDetails(id);
            mainModel.Fatherdetails = _editGet.EditGetforFamilyDetails(id).Fatherdetails;
            mainModel.Motherdetails = _editGet.EditGetforFamilyDetails(id).Motherdetails;
            mainModel.Brotherdetails = _editGet.EditGetforFamilyDetails(id).Brotherdetails;
            mainModel.Sisterdetails = _editGet.EditGetforFamilyDetails(id).Sisterdetails;
            mainModel.Spousedetails = _editGet.EditGetforFamilyDetails(id).Spousedetails;
            mainModel.Childrendetails = _editGet.EditGetforFamilyDetails(id).Childrendetails;
            mainModel.Additionalinformation = _editGet.EditGetforAdditionalInformation(id);
            mainModel.Educationalqualifications = _editGet.EditGetforEducationalQualifications(id);
            mainModel.Epfodetails = _editGet.EditGetforEpfoDetails(id);
            mainModel.Esicdetails = _editGet.EditGetforEsicDetails(id);
            mainModel.Otherdetails = _editGet.EditGetforOtherDetails(id);
            mainModel.Feedback = _editGet.EditGetforFeedback(id);
            mainModel.Previouscompanydetails = _editGet.EditGetforPreviousCompanyDetails(id);
            mainModel.Certification2 = _editGet.EditGetforCertifications(id).Certification1;
            mainModel.Certification1 = _editGet.EditGetforCertifications(id).Certification2;
            mainModel.Certification3 = _editGet.EditGetforCertifications(id).Certification3;
            mainModel.Certification4 = _editGet.EditGetforCertifications(id).Certification4;
            mainModel.Reference1 = _editGet.EditGetforReferences(id).Reference1;
            mainModel.Reference2 = _editGet.EditGetforReferences(id).Reference2;
            mainModel.Prevemploy1 = _editGet.EditGetforPreviousEmployment(id).Prevemploy1;
            mainModel.Prevemploy2 = _editGet.EditGetforPreviousEmployment(id).Prevemploy2;
            mainModel.Prevemploy3 = _editGet.EditGetforPreviousEmployment(id).Prevemploy3;
            mainModel.Prevemploy4 = _editGet.EditGetforPreviousEmployment(id).Prevemploy4;
            mainModel.Prevemploy5 = _editGet.EditGetforPreviousEmployment(id).Prevemploy5;
            mainModel.Designations = entity.role.ToList();
            mainModel.Departments = entity.department.ToList();
            mainModel.Maritalstatus = Enums.MaritalStatuses().ToList();
            mainModel.Bloodgroups = Enums.BloodGroups().ToList();
            return mainModel;
        }
    }
}
