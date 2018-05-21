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
    /// Class EpfoDetailsService.
    /// </summary>
    public class EpfoDetailsService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        /// <summary>
        /// Initializes a new instance of the <see cref="EpfoDetailsService"/> class.
        /// </summary>
        public EpfoDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        

        #region Edit Get Method
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>epfo_detailsModel.</returns>
        public epfo_detailsModel EditGet(int id)
        {
            var epfodetails = _hrinnova_dbEntities.epfo_details.Where(x => x.employee_id == id).FirstOrDefault();
            var epfo_detailsModel = Mapper.ConvertFrom(epfodetails);

            return epfo_detailsModel;
        }
        #endregion

        #region Edit Post Method
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="Epfo_detailsModel">The epfo details model.</param>
        /// <param name="entity">The entity.</param>
        public void EditPost(epfo_detailsModel Epfo_detailsModel, epfo_details entity)
        {
            entity.presentcompany_pfnumber = Epfo_detailsModel.presentcompany_pfnumber;
            entity.member_of_epfoscheme = Epfo_detailsModel.member_of_epfoscheme;
            entity.member_of_epsscheme = Epfo_detailsModel.member_of_epsscheme;
            entity.universal_account_number = Epfo_detailsModel.universal_account_number;
            entity.prev_pf_acc_number = Epfo_detailsModel.prev_pf_acc_number;
            entity.scheme_certificate_number = Epfo_detailsModel.scheme_certificate_number;
            entity.ppo_number = Epfo_detailsModel.ppo_number;
            entity.international_worker = Epfo_detailsModel.international_worker;
            entity.country_of_origin = Epfo_detailsModel.country_of_origin;
        }
        #endregion
    }
}
