using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class ReferencesService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public ReferencesService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        
        public void References(MainModel mainModel)
        {
            var references = Mapper.ConvertTo(mainModel.Reference1);
            var references2 = Mapper.ConvertTo(mainModel.Reference2);


            _hrinnova_dbEntities.references.Add(references);
            _hrinnova_dbEntities.references.Add(references2);
            _hrinnova_dbEntities.SaveChanges();

        }
        public MainModel EditGet(int id)
        {
            //var family_details = _hrinnova_dbEntities.employee_details.Find(id);
            var references = _hrinnova_dbEntities.employee_details.Find(id);

            var reference1 = references.references.Where(x => x.ref_type== "1");
            var reference2 = references.references.Where(x => x.ref_type== "2");
            

            List<references> family_details = new List<references>();
            family_details.AddRange(reference1);
            family_details.AddRange(reference2);
            
            var listofreferences = new List<referencesModel>();
            foreach (var item in family_details)
            {

                listofreferences.Add(Mapper.ConvertFrom(item));
            }

            //var familydetailsmodel = Mapper.ConvertFrom(family);

            var mainmodel = new MainModel()
            {
                References = listofreferences
            };


            return mainmodel;
        }
        public void EditPost(referencesModel ReferencesModel, references entity)
        {
            entity.name = ReferencesModel.name;
            entity.address = ReferencesModel.address;
            entity.designation = ReferencesModel.designation;
        }
    }
}
