using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class OrderListService : DBService
    {
        public APIResponse<Room> FindRoom(OrderList source)
        {
            var hadPickRommIds = db.OrderList.Where(x => x.CheckingDate == source.CheckingDate).Select(y => y.RoomId);
            var result = db.Room.Where(x => !hadPickRommIds.Contains(x.Id)).ToList();
            return new APIResponse<Room>() { Result = result, Document = "查詢成功。", Success = true };
        }
        public APIResponse<RoomAndOrderListModel> FindUsersOrderList(OrderList source)
        {
            var result = new List<RoomAndOrderListModel>();
            var membersOrderLists = db.OrderList.Where(x => x.MemberId == source.MemberId);
            foreach (var cell in membersOrderLists)
            {
                result.Add(new RoomAndOrderListModel() {
                    OrderList = cell,
                    Room = db.Room.Where(x => x.Id == cell.RoomId).ToList()[0]
                });
            }
            return new APIResponse<RoomAndOrderListModel>() { Result = result, Document = "查詢成功。", Success = true };
        }        
        public APIResponse<object> CreatOrderList(OrderList source)
        {
            //尚未寄EMAIL
            source.CreateTime = DateTime.Now;
            db.OrderList.Add(source);
            db.SaveChanges();
            return new APIResponse<object>() { Document = "訂單建立成功。", Success = true };
        }
        public APIResponse<object> EditOrderList(OrderList source)
        {
            //尚未寄EMAIL
            var target = db.OrderList.Find(source.Id);
            if (db.OrderList.Where(x => x.RoomId == target.RoomId && x.CheckingDate == source.CheckingDate).Count() > 0)
            {
                return new APIResponse<object>() { Document = "此房間當日已客滿。", Success = false };
            }
            target.CheckingDate = source.CheckingDate;
            db.SaveChanges();
            return new APIResponse<object>() { Document = "訂單修改成功。", Success = true };
        }
        public APIResponse<object> DeleteOrderList(OrderList source)
        {
            //尚未寄EMAIL
            var target = db.OrderList.Find(source.Id);
            db.OrderList.Remove(target);
            db.SaveChanges();
            return new APIResponse<object>() {  Document = "訂單刪除成功。", Success = true };
        }
    }
}