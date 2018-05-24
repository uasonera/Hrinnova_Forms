using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Validation;
using Cygnet.ProjMan.EFData.ViewModels;
using Cygnet.ProjMan.EFData.DataSource;
using Hrinnova_FormsProject.Models;
using Cygnet.ProjMan.EFData.Service;
using System.Data.Entity;

namespace Hrinnova_FormsProject.Controllers
{
    /// <summary>
    /// Class EditController.
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    public class EditController : Controller
    {
        #region Service and Entity objects
        /// <summary>
        /// The entity
        /// </summary>
        hrinnova_dbEntities entity = new hrinnova_dbEntities();
        // GET: Edit
        /// <summary>
        /// The edit get service
        /// </summary>
        EditGetService _editGetService = new EditGetService();
        /// <summary>
        /// The edit post service
        /// </summary>
        EditPostService _editPostService = new EditPostService();
        /// <summary>
        /// The eim
        /// </summary>
        EditIndexModel eim = new EditIndexModel();
        /// <summary>
        /// The employee details service
        /// </summary>
        CreateService _employeeDetailsService = new CreateService();
        #endregion

        //Get method to show index of employees
        #region MEthod for Edit Index View
        /// <summary>
        /// Edits the index2.
        /// </summary>
        /// <param name="searchstring">The searchstring.</param>
        /// <returns>ActionResult.</returns>

        public ActionResult EditIndex2(string searchstring)

        {
            eim.Employeedetails = entity.employee_details.Take(10000).ToList();
            return View(eim);
        }

        #endregion


        // GET: Edit/Edit/5  
        #region Method to Get Details for Editing 
        /// <summary>
        /// Edits the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>

        public ActionResult Edit(int id)
        {
            Session["id"] = id;
            Enums Enums = new Enums();
            MainModel modelObject = new MainModel();
            EditGetAll _editGetMain = new EditGetAll();

            modelObject = _editGetMain.SetToModel(id);
     
            return View(modelObject);
        }
        #endregion


        // POST: Edit/Edit/5
        #region Method to Post Details after Editing 
        /// <summary>
        /// Editdatas the specified model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>ActionResult.</returns>
        /// <exception cref="DbEntityValidationException"></exception>

        [HttpPost]
        public ActionResult Editdata(MainModel model)
        {
            EditPostAll _editPostAll = new EditPostAll();

            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Select(x => x.Value.Errors).Where(y => y.Count > 0).ToList();
                    model.Errors = new List<string>();
                    foreach (var item in errors)
                    {
                        model.Errors.Add(item.FirstOrDefault().ErrorMessage);
                    }
                    return PartialView("_ErrorView", model);
                }

                int updateid = Convert.ToInt32(Session["id"].ToString());
                _editPostAll.SetToEntity(updateid, model);

            }
            catch (DbEntityValidationException ex)
            {
                var errorMessages = ex.EntityValidationErrors
                     .SelectMany(x => x.ValidationErrors)
                     .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
            return Content("<script type=text/javascript>alert('Employee Details Updated');window.location.href='/Edit/EditIndex2'</script>");
        }
        #endregion
       
    }
}
