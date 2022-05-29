using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class messageDBService
    {
        public messageEntities6 db = new messageEntities6();
        public List<Article> GetData()
        {
            return db.Article.ToList();
        }
        public void DBCreate(string Article_title, string Content)
        {
            Article NewData = new Article();
            NewData.Title = Article_title;
            NewData.Content = Content;
            NewData.time = DateTime.Now;

            db.Article.Add(NewData);
            db.SaveChanges();
        }
    }
}