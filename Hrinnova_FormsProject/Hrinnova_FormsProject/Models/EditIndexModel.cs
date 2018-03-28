using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hrinnova_FormsProject.DatabaseModel;

namespace Hrinnova_FormsProject.Models
{
    public class EditIndexModel
    {
        public IEnumerable<employee_details> employeedetails { get; set; }
    }
}