using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Cygnet.ProjMan.EFData.Service
{
    /// <summary>
    /// Class EmployeeDetailsService.
    /// </summary>
    public class EmployeeDetailsService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        AdditionalInformationService _additionalInformationService = new AdditionalInformationService();
        /// <summary>
        /// The educational qualifications service
        /// </summary>
        EducationalQualificationsService _educationalQualificationsService = new EducationalQualificationsService();
        /// <summary>
        /// The epfo details service
        /// </summary>
        EpfoDetailsService _epfoDetailsService = new EpfoDetailsService();
        /// <summary>
        /// The esic details service
        /// </summary>
        EsicDetailsService _esicDetailsService = new EsicDetailsService();
        /// <summary>
        /// The family details service
        /// </summary>
        FamilyDetailsService _familyDetailsService = new FamilyDetailsService();
        /// <summary>
        /// The feedback service
        /// </summary>
        FeedbackService _feedbackService = new FeedbackService();
        /// <summary>
        /// The other details service
        /// </summary>
        OtherDetailsService _otherDetailsService = new OtherDetailsService();
        /// <summary>
        /// The previous employment service
        /// </summary>
        PreviousEmploymentService _previousEmploymentService = new PreviousEmploymentService();
        /// <summary>
        /// The previous company details service
        /// </summary>
        PreviousCompanyDetailsService _previousCompanyDetailsService = new PreviousCompanyDetailsService();
        /// <summary>
        /// The references service
        /// </summary>
        ReferencesService _referencesService = new ReferencesService();
        /// <summary>
        /// The certifications service
        /// </summary>
        CertificationsService _certificationsService = new CertificationsService();
        /// <summary>
        /// Initializes a new instance of the <see cref="EmployeeDetailsService"/> class.
        /// </summary>
        public EmployeeDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        #region Create Method
        /// <summary>
        /// Creates the specified main model.
        /// </summary>
        /// <param name="mainModel">The main model.</param>
        public void Create(MainModel mainModel)
        {
            var EDetails = Mapper.ConvertTo(mainModel.Employeedetails);
            var AInformation = Mapper.ConvertTo(mainModel.Additionalinformation);
            var certifications = Mapper.ConvertTo(mainModel.Certification1);
            var certifications2 = Mapper.ConvertTo(mainModel.Certification2);
            var certifications3 = Mapper.ConvertTo(mainModel.Certification3);
            var certifications4 = Mapper.ConvertTo(mainModel.Certification4);
            var EQualifications = Mapper.ConvertTo(mainModel.Educationalqualifications);
            var epfodetails = Mapper.ConvertTo(mainModel.Epfodetails);
            var esicdetails = Mapper.ConvertTo(mainModel.Esicdetails);
            var Father = Mapper.ConvertTo(mainModel.Fatherdetails);
            var Mother = Mapper.ConvertTo(mainModel.Motherdetails);
            var Sister = Mapper.ConvertTo(mainModel.Sisterdetails);
            var Brother = Mapper.ConvertTo(mainModel.Brotherdetails);
            var Spouse = Mapper.ConvertTo(mainModel.Spousedetails);
            var Children = Mapper.ConvertTo(mainModel.Childrendetails);
            var feedback = Mapper.ConvertTo(mainModel.Feedback);
            var otherdetails = Mapper.ConvertTo(mainModel.Otherdetails);
            var previouscompanydetails = Mapper.ConvertTo(mainModel.Previouscompanydetails);
            var prevemployment = Mapper.ConvertTo(mainModel.Prevemploy1);
            var prevemployment2 = Mapper.ConvertTo(mainModel.Prevemploy2);
            var prevemployment3 = Mapper.ConvertTo(mainModel.Prevemploy3);
            var prevemployment4 = Mapper.ConvertTo(mainModel.Prevemploy4);
            var prevemployment5 = Mapper.ConvertTo(mainModel.Prevemploy5);
            var references = Mapper.ConvertTo(mainModel.Reference1);
            var references2 = Mapper.ConvertTo(mainModel.Reference2);

            _hrinnova_dbEntities.employee_details.Add(EDetails);
            _hrinnova_dbEntities.references.Add(references);
            _hrinnova_dbEntities.references.Add(references2);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment2);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment3);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment4);
            _hrinnova_dbEntities.prev_employ_1.Add(prevemployment5);
            _hrinnova_dbEntities.previous_company_details.Add(previouscompanydetails);
            _hrinnova_dbEntities.other_details.Add(otherdetails);
            _hrinnova_dbEntities.feedback.Add(feedback);
            _hrinnova_dbEntities.family_details.Add(Father);
            _hrinnova_dbEntities.family_details.Add(Mother);
            _hrinnova_dbEntities.family_details.Add(Brother);
            _hrinnova_dbEntities.family_details.Add(Sister);
            _hrinnova_dbEntities.family_details.Add(Spouse);
            _hrinnova_dbEntities.family_details.Add(Children);
            _hrinnova_dbEntities.esic_details.Add(esicdetails);
            _hrinnova_dbEntities.epfo_details.Add(epfodetails);
            _hrinnova_dbEntities.educational_qualifications.Add(EQualifications);
            _hrinnova_dbEntities.certifications.Add(certifications);
            _hrinnova_dbEntities.certifications.Add(certifications2);
            _hrinnova_dbEntities.certifications.Add(certifications3);
            _hrinnova_dbEntities.certifications.Add(certifications4);
            _hrinnova_dbEntities.additional_information.Add(AInformation);
           
            _hrinnova_dbEntities.SaveChanges();

        }
        #endregion

        #region Edit Get Method
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>employee_detailsModel.</returns>
        public employee_detailsModel EditGet(int id)
        {
            var employee_details = _hrinnova_dbEntities.employee_details.Where(x => x.employee_id == id).FirstOrDefault();
            var employee_detailsModel = Mapper.ConvertFrom(employee_details);

            return employee_detailsModel;
        }
        #endregion

        #region Edit Post Method

        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="Employee_detailsModel">The employee details model.</param>
        /// <param name="entity">The entity.</param>
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
