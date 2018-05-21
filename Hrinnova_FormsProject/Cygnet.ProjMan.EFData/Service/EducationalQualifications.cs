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
    /// Class EducationalQualificationsService.
    /// </summary>
    public class EducationalQualificationsService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        /// <summary>
        /// Initializes a new instance of the <see cref="EducationalQualificationsService"/> class.
        /// </summary>
        public EducationalQualificationsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        

        #region Edit Get Method
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>educational_qualificationsModel.</returns>
        public educational_qualificationsModel EditGet(int id)
        {
            var educationalqualifications = _hrinnova_dbEntities.educational_qualifications.Where(x => x.employee_id == id).FirstOrDefault();
            var educational_qualificationsModel = Mapper.ConvertFrom(educationalqualifications);

            return educational_qualificationsModel;
        }
        #endregion

        #region Edit Post Method
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="Educational_qualificationsModel">The educational qualifications model.</param>
        /// <param name="entity">The entity.</param>
        public void EditPost(educational_qualificationsModel Educational_qualificationsModel, educational_qualifications entity)
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
        #endregion
    }
}
