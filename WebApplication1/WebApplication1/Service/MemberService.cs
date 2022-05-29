using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class MemberService : DBService
    {
        public APIResponse<Member> Register(Member source)
        {
            if (db.Member.Where(x => x.Account.ToLower() == source.Account.ToLower()).Count() > 0)
            {
                return new APIResponse<Member>() { Document = "此email已註冊。", Success = false};
            }

            Member NewData = new Member
            {
                Account = source.Account,
                Password = source.Password,
                Name = source.Name,
                CreateTime = DateTime.Now
            };

            db.Member.Add(NewData);
            db.SaveChanges();

            return new APIResponse<Member>() { Result = new List<Member>() { NewData }, Document = "註冊成功。", Success = true };
        }
        public APIResponse<Member> Login(Member source)
        {
            var loginMember = db.Member.Where(x => x.Account == source.Account && x.Password == source.Password);
            if (loginMember.Count() > 0)
            {
                return new APIResponse<Member>() { Result = loginMember.ToList(), Document = "登入成功。", Success = true };
            }

            return new APIResponse<Member>() { Document = "帳號或密碼錯誤。", Success = false };
        }
    }
}