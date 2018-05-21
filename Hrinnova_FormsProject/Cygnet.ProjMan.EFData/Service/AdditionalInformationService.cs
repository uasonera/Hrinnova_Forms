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
    /// Class AdditionalInformationService.
    /// </summary>
    public class AdditionalInformationService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        /// <summary>
        /// Initializes a new instance of the <see cref="AdditionalInformationService"/> class.
        /// </summary>
        public AdditionalInformationService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        #region Edit GEt Method
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="employee_id">The employee identifier.</param>
        /// <returns>additional_informationModel.</returns>
        public additional_informationModel EditGet(int employee_id)
        {
            var additionalinformation = _hrinnova_dbEntities.additional_information.Where(x => x.employee_id == employee_id).FirstOrDefault();
            var additional_informationModel = Mapper.ConvertFrom(additionalinformation);

            return additional_informationModel;
        }
        #endregion
        #region Edit Post Method
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="Additional_informationModel">The additional information model.</param>
        /// <param name="entity">The entity.</param>
        public void EditPost(additional_informationModel Additional_informationModel, additional_information entity)
        {
            entity.known_to_presentemployee = Additional_informationModel.known_to_presentemployee;
            entity.name_of_knownemployee = Additional_informationModel.name_of_knownemployee;
            entity.relationship_with_knownemployee = Additional_informationModel.relationship_with_knownemployee;
            entity.periodworked_from = Additional_informationModel.periodworked_from;
            entity.periodworked_to = Additional_informationModel.periodworked_to;
            entity.roleID = Additional_informationModel.roleID;
            entity.DeptID = Additional_informationModel.DeptID;
        }
        #endregion
    }
}
