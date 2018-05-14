using Cygnet.ProjMan.EFData.DataSource;
using Cygnet.ProjMan.EFData.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cygnet.ProjMan.EFData.Service
{
    public class CertificationsService
    {
        hrinnova_dbEntities _hrinnova_dbEntities;
        public CertificationsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
        #region Create Method 
        public void Create(MainModel mainModel)
        {
            var certifications = Mapper.ConvertTo(mainModel.Certification1);
            var certifications2 = Mapper.ConvertTo(mainModel.Certification2);
            var certifications3 = Mapper.ConvertTo(mainModel.Certification3);
            var certifications4 = Mapper.ConvertTo(mainModel.Certification4);

            _hrinnova_dbEntities.certifications.Add(certifications);
            _hrinnova_dbEntities.certifications.Add(certifications2);
            _hrinnova_dbEntities.certifications.Add(certifications3);
            _hrinnova_dbEntities.certifications.Add(certifications4);
            _hrinnova_dbEntities.SaveChanges();

        }
        #endregion
        #region Edit Get Method
        public MainModel EditGet(int id)
        {
            //var family_details = _hrinnova_dbEntities.employee_details.Find(id);
            var certifications = _hrinnova_dbEntities.employee_details.Find(id);

            var cert1 = certifications.certifications.Where(x => x.cert_type == "1");
            var cert2 = certifications.certifications.Where(x => x.cert_type == "2");
            var cert3 = certifications.certifications.Where(x => x.cert_type == "3");
            var cert4 = certifications.certifications.Where(x => x.cert_type == "4");

            List<certifications> cert = new List<certifications>();
            cert.AddRange(cert1);
            cert.AddRange(cert2);
            cert.AddRange(cert3);
            cert.AddRange(cert4);

            var listofcertifications = new List<certificationsModel>();
            foreach (var item in cert)
            {

                listofcertifications.Add(Mapper.ConvertFrom(item));
            }

            //var familydetailsmodel = Mapper.ConvertFrom(family);

            var mainmodel = new MainModel()
            {
                Certifications = listofcertifications
            };


            return mainmodel;
        }
        #endregion

        #region Edit Post Method
        public void EditPost(certificationsModel CertificationsModel, certifications entity)
        {
            entity.certification_name = CertificationsModel.certification_name;
        }
        #endregion
    }
}
