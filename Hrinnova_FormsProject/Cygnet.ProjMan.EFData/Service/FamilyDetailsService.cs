using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class FamilyDetailsService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public FamilyDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        public void Create(MainModel mainmodel)
        {
            var Father = Mapper.ConvertTo(mainmodel.Fatherdetails);
            var Mother = Mapper.ConvertTo(mainmodel.Motherdetails);
            var Sister = Mapper.ConvertTo(mainmodel.Sisterdetails);
            var Brother = Mapper.ConvertTo(mainmodel.Brotherdetails);
            var Spouse = Mapper.ConvertTo(mainmodel.Spousedetails);
            var Children = Mapper.ConvertTo(mainmodel.Childrendetails);

            _hrinnova_dbEntities.family_details.Add(Father);
            _hrinnova_dbEntities.family_details.Add(Mother);
            _hrinnova_dbEntities.family_details.Add(Brother);
            _hrinnova_dbEntities.family_details.Add(Sister);
            _hrinnova_dbEntities.family_details.Add(Spouse);
            _hrinnova_dbEntities.family_details.Add(Children);

            _hrinnova_dbEntities.SaveChanges();
        }
        public MainModel EditGet(int id)
        {
            //var family_details = _hrinnova_dbEntities.employee_details.Find(id);
            var family = _hrinnova_dbEntities.employee_details.Find(id);

            var father = family.family_details.Where(x => x.member == "Father");
            var mother = family.family_details.Where(x => x.member == "Mother");
            var brother = family.family_details.Where(x => x.member == "Brother");
            var sister = family.family_details.Where(x => x.member == "Sister");
            var spouse = family.family_details.Where(x => x.member == "Spouse");
            var children = family.family_details.Where(x => x.member == "Children");

            List<family_details> family_details = new List<family_details>();
            family_details.AddRange(children);
            family_details.AddRange(spouse);
            family_details.AddRange(sister);
            family_details.AddRange(brother);
            family_details.AddRange(mother);
            family_details.AddRange(father);
            var listofFamiliyDetailsModel = new List<family_detailsModel>();
            foreach (var item in family_details)
            {

                listofFamiliyDetailsModel.Add(Mapper.ConvertFrom(item));
            }

            //var familydetailsmodel = Mapper.ConvertFrom(family);

            var mainmodel = new MainModel()
            {
                FamilyDetails = listofFamiliyDetailsModel
            };


            return mainmodel;
        }
        public void EditPost(family_detailsModel Family_detailsModel, family_details entity)
        {
            entity.fname = Family_detailsModel.fname;
            entity.fdateofbirth = Family_detailsModel.fdateofbirth;
            entity.faadhar = Family_detailsModel.faadhar;
            entity.fcontact = Family_detailsModel.fcontact;
            entity.foccupation = Family_detailsModel.foccupation;
            entity.freside = Family_detailsModel.freside;
            entity.ftown = Family_detailsModel.ftown;
            entity.fstate = Family_detailsModel.fstate;
        }

    }
}
