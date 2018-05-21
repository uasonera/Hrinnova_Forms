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
    /// Class EsicDetailsService.
    /// </summary>
    public class EsicDetailsService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        /// <summary>
        /// Initializes a new instance of the <see cref="EsicDetailsService"/> class.
        /// </summary>
        public EsicDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        

        #region Edit Get Method
        /// <summary>
        /// Edits the esic details.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>esic_detailsModel.</returns>
        public esic_detailsModel EditEsicDetails(int id)
        {
            var esicdetails = _hrinnova_dbEntities.esic_details.Where(x => x.employee_id == id).FirstOrDefault();
            var esic_detailsModel = Mapper.ConvertFrom(esicdetails);

            return esic_detailsModel;
        }
        #endregion

        #region Edit Post Method
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="Esic_detailsModel">The esic details model.</param>
        /// <param name="entity">The entity.</param>
        public void EditPost(esic_detailsModel Esic_detailsModel, esic_details entity)
        {
            entity.insurance_number = Esic_detailsModel.insurance_number;
            entity.branch_office = Esic_detailsModel.branch_office;
            entity.dispensary = Esic_detailsModel.dispensary;
            entity.employers_code = Esic_detailsModel.employers_code;
            entity.date_of_appointment = Esic_detailsModel.date_of_appointment;
            entity.employers_nameandaddress = Esic_detailsModel.employers_nameandaddress;
            entity.previous_insurance_number = Esic_detailsModel.previous_insurance_number;
            entity.name_of_nominee = Esic_detailsModel.name_of_nominee;
            entity.nominee_relationship = Esic_detailsModel.nominee_relationship;
            entity.nominee_address = Esic_detailsModel.nominee_address;
        }
        #endregion
    }
}
