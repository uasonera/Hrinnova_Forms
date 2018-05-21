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
    /// Class FeedbackService.
    /// </summary>
    public class FeedbackService
    {
        /// <summary>
        /// The hrinnova database entities
        /// </summary>
        hrinnova_dbEntities _hrinnova_dbEntities;
        /// <summary>
        /// Initializes a new instance of the <see cref="FeedbackService"/> class.
        /// </summary>
        public FeedbackService()
        {
            _hrinnova_dbEntities = new hrinnova_dbEntities();
        }

     
        /// <summary>
        /// Edits the get.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>feedbackModel.</returns>
        public feedbackModel EditGet(int id)
        {
            var feedback = _hrinnova_dbEntities.feedback.Where(x => x.employee_id == id).FirstOrDefault();
            var FeedbackModel = Mapper.ConvertFrom(feedback);

            return FeedbackModel;
        }
        /// <summary>
        /// Edits the post.
        /// </summary>
        /// <param name="FeedbackModel">The feedback model.</param>
        /// <param name="entity">The entity.</param>
        public void EditPost(feedbackModel FeedbackModel, feedback entity)
        {
            entity.hr_manual = FeedbackModel.hr_manual;
            entity.cims_idpassword = FeedbackModel.cims_idpassword;
            entity.books = FeedbackModel.books;
            entity.library_card = FeedbackModel.library_card;
            entity.hr_anyother = FeedbackModel.hr_anyother;
            entity.identitycard = FeedbackModel.identitycard;
            entity.bank_account = FeedbackModel.bank_account;
            entity.notepad = FeedbackModel.notepad;
            entity.pen = FeedbackModel.pen;
            entity.employee_card = FeedbackModel.employee_card;
            entity.admin_anyother = FeedbackModel.admin_anyother;
            entity.computer_system = FeedbackModel.computer_system;
            entity.headphones = FeedbackModel.headphones;
            entity.emailid_password = FeedbackModel.emailid_password;
            entity.network_ip = FeedbackModel.network_ip;
            entity.firewall_id = FeedbackModel.firewall_id;
            entity.domain_usernamepassword = FeedbackModel.domain_usernamepassword;
            entity.messengers_access = FeedbackModel.messengers_access;
            entity.systemadmin_anyother = FeedbackModel.systemadmin_anyother;
            entity.hrmanual_and_responsibilities = FeedbackModel.hrmanual_and_responsibilities;
        }
    }
}
