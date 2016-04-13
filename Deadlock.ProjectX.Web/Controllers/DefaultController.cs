using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Deadlock.ProjectX.Web.Controllers
{
    public class DefaultController : Controller
    {        
        public ActionResult Index()
        {
            return File("wwwroot/app.html", "text/html");
        }
    }
}