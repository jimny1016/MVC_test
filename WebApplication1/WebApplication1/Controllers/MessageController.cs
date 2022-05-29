using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    public class MessageController : Controller
    {
        messageDBService data = new messageDBService();

        // GET: Message
        public ActionResult Index()
        {
            return View(data.GetData());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(string Article_title, string Content) {
            data.DBCreate(Article_title, Content);
            return RedirectToAction("Index");
        }
    }
}