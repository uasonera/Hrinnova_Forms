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
    /// Class FamilyDetailsService.
    /// </summary>
    public class FamilyDetailsService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        /// <summary>
        /// Initializes a new instance of the <see cref="FamilyDetailsService"/> class.
        /// </summary>
        public FamilyDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>MainModel.</returns>
        public MainModel EditGet(int id)
        {
          
            List<family_details> family_details = _hrinnova_dbEntities.employee_details.Find(id).family_details.ToList();
            
            var listofFamiliyDetailsModel = new List<family_detailsModel>();
            foreach (var item in family_details)
            {

                listofFamiliyDetailsModel.Add(Mapper.ConvertFrom(item));
            }
            
            var mainmodel = new MainModel()
            {
                Fatherdetails = listofFamiliyDetailsModel.SingleOrDefault(x=>x.member=="Father"),
                Motherdetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Mother"),
                Brotherdetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Brother"),
                Sisterdetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Sister"),
                Spousedetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Spouse"),
                Childrendetails = listofFamiliyDetailsModel.SingleOrDefault(x => x.member == "Children")
            };
            
            return mainmodel;
        }
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="Family_detailsModel">The family details model.</param>
        /// <param name="entity">The entity.</param>
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
