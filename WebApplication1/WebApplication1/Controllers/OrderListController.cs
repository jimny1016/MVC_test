using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    public class OrderListController : Controller
    {
        readonly public OrderListService _service = new OrderListService();
        [HttpPost]
        public ActionResult FindRoom(OrderList source) => Json(_service.FindRoom(source));
        [HttpPost]
        public ActionResult FindUsersOrderList(OrderList source) => Json(_service.FindUsersOrderList(source));
        [HttpPost]
        public ActionResult CreatOrderList(OrderList source) => Json(_service.CreatOrderList(source));
        [HttpPost]
        public ActionResult EditOrderList(OrderList source) => Json(_service.EditOrderList(source));
        [HttpPost]
        public ActionResult DeleteOrderList(OrderList source) => Json(_service.DeleteOrderList(source));
    }
}