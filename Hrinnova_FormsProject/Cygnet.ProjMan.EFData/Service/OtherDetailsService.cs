using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class OtherDetailsService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public OtherDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }

        public void OtherDetails(MainModel mainModel)
        {
            var otherdetails = Mapper.ConvertTo(mainModel.Otherdetails);

            _hrinnova_dbEntities.other_details.Add(otherdetails);
            _hrinnova_dbEntities.SaveChanges();

        }
        public other_detailsModel EditGet(int id)
        {
            var otherdetails = _hrinnova_dbEntities.other_details.Where(x => x.employee_id == id).FirstOrDefault();
            var Other_detailsModel = Mapper.ConvertFrom(otherdetails);

            return Other_detailsModel;
        }
        public void EditPost(other_detailsModel Other_detailsModel, other_details entity)
        {
            entity.propertyowner_name = Other_detailsModel.propertyowner_name;
            entity.propertyowner_contact = Other_detailsModel.propertyowner_contact;
            entity.propertyowner_address = Other_detailsModel.propertyowner_address;
            entity.propertyowner_occupation = Other_detailsModel.propertyowner_occupation;
            entity.neighbour1_name = Other_detailsModel.neighbour1_name;
            entity.neighbour1_contact = Other_detailsModel.neighbour1_contact;
            entity.neighbour1_address = Other_detailsModel.neighbour1_address;
            entity.neighbour1_occupation = Other_detailsModel.neighbour1_occupation;
            entity.neighbour2_name = Other_detailsModel.neighbour2_name;
            entity.neighbour2_contact = Other_detailsModel.neighbour2_contact;
            entity.neighbour2_address = Other_detailsModel.neighbour2_address;
            entity.neighbour2_occupation = Other_detailsModel.neighbour2_occupation;
        }
    }
}
