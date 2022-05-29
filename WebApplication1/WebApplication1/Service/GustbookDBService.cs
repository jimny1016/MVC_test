using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class GustbookDBService
    {
        public messageEntities6 db = new messageEntities6();

        public List<Guestbook> Get_list_GB()
        {
            List<Guestbook> list_GB = db.Guestbook.ToList();
            return list_GB;
        }

        public Guestbook Get_GB(int id)
        {
            Guestbook GB = db.Guestbook.Find(id);
            return GB;
        }

        public void Create(string name, string content)
        {
            Guestbook gb = new Guestbook();
            gb.name = name;
            gb.content = content;
            db.Guestbook.Add(gb);
            db.SaveChanges();
        }
        
        public void Create(Guestbook newData)
        {
            db.Guestbook.Add(newData);
            db.SaveChanges();
        }

        public bool Update(int id, string name, string content)
        {
            Guestbook gb = db.Guestbook.Find(id);

            if (gb != null)
            {
                gb.name = name;
                gb.content = content;

                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool Update(int id, Guestbook newGB)
        {
            Guestbook gb = db.Guestbook.Find(id);

            if (gb != null)
            {
                gb.name = newGB.name;
                gb.content = newGB.content;

                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool Delete(int id)
        {
            Guestbook gb = db.Guestbook.Find(id);

            if (gb != null)
            {
                db.Guestbook.Remove(gb);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}