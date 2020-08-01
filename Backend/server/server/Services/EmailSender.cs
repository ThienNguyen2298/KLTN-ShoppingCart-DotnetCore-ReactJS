using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using server.Helper;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

namespace server.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfiguration;
        private const string title = "ONLINE SHOP - Hóa Đơn Khách Hàng";
        public EmailSender(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }
        public async Task<bool> SendMailOrderBill(Message message, List<OrderDetailViewModel> data, int total)
        {
            var emailMessage = CreateEmailMessage(message, data, total);
            return await Send(emailMessage);
        }
        private string FormatListOrderDetailToHtml(List<OrderDetailViewModel> data)
        {
            List<string> listString = new List<string>();
            foreach(var item in data)
            {
                var str = $"<tr><td style='padding: 10px; width: 25%'>{item.product[0].name}</td><td>{FormatCurrencyVND(item.unitPrice)}</td><td>{item.sale}</td><td>{item.quantity}</td></tr>";
                listString.Add(str);
            }
            return string.Join("", listString.ToArray());
        }
        private string FormatCurrencyVND(int money)
        {
            var info = System.Globalization.CultureInfo.GetCultureInfo("vi-VN");
            return string.Format(info, "{0:c}", money);
        }
        private MimeMessage CreateEmailMessage(Message message, List<OrderDetailViewModel> data, int total)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfiguration.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            if(data != null)
            {
                emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = string.Format("<div style='width: 600px;padding: 10px 20px; text-align: center'>" +
                "<div><h2 style='color: #1890ff'>Đơn hàng của bạn</h2><table style='width: 600px;border-collapse: collapse'>" +
                "<tr style='background: #1890ff; color: white'><th style='padding: 5px'>Sản phẩm</th><th>Đơn giá</th><th>Giảm giá (%)</th><th>Số lượng</th>" +
                "</tr>{0}</table><div><h4>Tổng hóa đơn: {1} (bao gồm phí ship)</h4></div></div></div>", FormatListOrderDetailToHtml(data), FormatCurrencyVND(total))
                };
            }
            else
            {
                emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
                {
                    Text = message.Content
                };
            }
            
            return emailMessage;
        }
        private async Task<bool> Send(MimeMessage mailMessage)
        {
            using(var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                    await client.AuthenticateAsync(_emailConfiguration.Username, _emailConfiguration.Password);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.SendAsync(mailMessage);
                    return true;
                }
                catch(Exception ex)
                {
                    return false;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
                
            }
        }

        
    }
}
