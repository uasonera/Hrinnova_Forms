using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class AdditionalInformationService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public AdditionalInformationService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        #region Create Method
        public void Create(MainModel mainModel)
        {
            var AInformation = Mapper.ConvertTo(mainModel.Additionalinformation);

            _hrinnova_dbEntities.additional_information.Add(AInformation);
            _hrinnova_dbEntities.SaveChanges();

        }
        #endregion
        #region Edit GEt Method
        public additional_informationModel EditGet(int employee_id)
        {
            var additionalinformation = _hrinnova_dbEntities.additional_information.Where(x => x.employee_id == employee_id).FirstOrDefault();
            var additional_informationModel = Mapper.ConvertFrom(additionalinformation);

            return additional_informationModel;
        }
        #endregion
        #region Edit Post Method
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
