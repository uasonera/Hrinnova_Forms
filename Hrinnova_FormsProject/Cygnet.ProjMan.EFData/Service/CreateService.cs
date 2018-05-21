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
    public class CreateService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
       
        /// <summary>
        /// Initializes a new instance of the <see cref="CreateService"/> class.
        /// </summary>
        public CreateService()
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
        
    }
}
