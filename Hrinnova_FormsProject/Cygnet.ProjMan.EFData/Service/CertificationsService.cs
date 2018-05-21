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
    /// Class CertificationsService.
    /// </summary>
    public class CertificationsService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        /// <summary>
        /// Initializes a new instance of the <see cref="CertificationsService"/> class.
        /// </summary>
        public CertificationsService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }
       
        #region Edit Get Method
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>MainModel.</returns>
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
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="CertificationsModel">The certifications model.</param>
        /// <param name="entity">The entity.</param>
        public void EditPost(certificationsModel CertificationsModel, certifications entity)
        {
            
            entity.certification_name = CertificationsModel.certification_name;
        }
        #endregion
    }
}
