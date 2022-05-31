using System.Net;
using System.Net.Mail;

namespace WebApplication1.Service
{
    public class SMTPService
    {
        public void SendEmail(string mailTo, string mailSubject,string mailContent) 
        {
            SmtpClient client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("esonlee94@gmail.com", "zrhzaydcgrorgyxt")
            };

            MailMessage message = new MailMessage
            {
                From = new MailAddress("esonlee94@gmail.com"),
                IsBodyHtml = true,
                Subject = mailSubject,
                Body = mailContent
            };
            message.To.Add(new MailAddress(mailTo));

            client.Send(message);
            message.Dispose();
        }
    }
}