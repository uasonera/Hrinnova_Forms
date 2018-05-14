using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class PreviousCompanyDetailsService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public PreviousCompanyDetailsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }

        public void PreviousCompanyDetails(MainModel mainModel)
        {
            var previouscompanydetails = Mapper.ConvertTo(mainModel.Previouscompanydetails);

            _hrinnova_dbEntities.previous_company_details.Add(previouscompanydetails);
            _hrinnova_dbEntities.SaveChanges();

        }
        public previous_company_detailsModel EditGet(int id)
        {
            var previouscompanydetails = _hrinnova_dbEntities.previous_company_details.Where(x => x.employee_id == id).FirstOrDefault();
            var Previous_company_detailsModel = Mapper.ConvertFrom(previouscompanydetails);

            return Previous_company_detailsModel;
        }
        public void EditPost(previous_company_detailsModel Previous_company_detailsModel, previous_company_details entity)
        {
            entity.pf_account_number = Previous_company_detailsModel.pf_account_number;
            entity.fps_account_number = Previous_company_detailsModel.fps_account_number;
            entity.pf_employers_code_number = Previous_company_detailsModel.pf_employers_code_number;
            entity.life_insurance = Previous_company_detailsModel.life_insurance;
            entity.esi_employers_code_number = Previous_company_detailsModel.esi_employers_code_number;
            entity.esi_insurance_number = Previous_company_detailsModel.esi_insurance_number;
            entity.mediclaim = Previous_company_detailsModel.mediclaim;
        }
    }
}
