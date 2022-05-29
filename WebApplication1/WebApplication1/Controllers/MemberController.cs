using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    public class MemberController : Controller
    {
        readonly public MemberService _service = new MemberService();
        [HttpPost]
        public ActionResult Register(Member member) => Json(_service.Register(member));
        [HttpPost]
        public ActionResult Login(Member member) => Json(_service.Login(member));
    }
}