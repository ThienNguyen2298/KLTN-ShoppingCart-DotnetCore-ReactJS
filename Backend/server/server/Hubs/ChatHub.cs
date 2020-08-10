using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using server.Helper.chat;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace server.Hubs
{
    [Authorize]
    public class ChatHub: Hub
    {
        private Guid adminId = new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49");
        private readonly static ConnectionMapping<Guid> _connections = new ConnectionMapping<Guid>();
        private readonly IOrderService _orderService;

        private readonly UserManager<AppUser> _userManage;
        private readonly IChatService _chatService;
        public ChatHub(UserManager<AppUser> userManage, IChatService chatService, IOrderService orderService)
        {
            _userManage = userManage;
            _chatService = chatService;
            _orderService = orderService;
            
        }

        public string GetConnectionId() => Context.ConnectionId;
        
        /*public async Task UserOnlineList()
        {
            var userIdOnlineList = _connections.GetOnlineUsers();
            var userOnlineList = await _chatService.GetUserOnlines(userIdOnlineList);
            await Clients.Client(Context.ConnectionId).SendAsync("UserOnlineList", userOnlineList);
        }*/
        //
        //
        public async Task SendMessage(ChatCreateRequest _message)
        {
            var messageId = await _chatService.CreateMessage(_message);
            var message = await _chatService.GetMessageById(messageId);
            //Receive Message
            List<string> ReceiverConnectionids = _connections.GetConnections(message.receiverId).ToList<string>();
            if (ReceiverConnectionids.Count() > 0)
            {
                //Save-Receive-Message
                try
                {
                    var notify = new NotifyViewModel() {
                        notify = $"Bạn đã nhận tin nhắn từ {message.sender.displayname}",
                        link = null,
                        senderId = message.senderId,
                        receiverId = message.receiverId,
                        isViewed = false,
                        status = enums.NotifyStatus.chat,
                    };
                    List<string> connects = _connections.GetConnections(message.receiverId).ToList<string>();
                    await Clients.All.SendAsync("ReceiveNotify", notify);
                    //
                    ReceiverConnectionids.Add(_message.connectionId);
                    
                    await Clients.Clients(ReceiverConnectionids).SendAsync("ReceiveMessage", message);
                    
                }
                catch (Exception) { }
            }
            else
            {
                await Clients.Client(_message.connectionId).SendAsync("ReceiveMessage", message);
            }
        }

        public override async Task OnConnectedAsync()
        {
            
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                try
                {

                    //Add Logged User
                    var userId = httpContext.User.Claims.ToArray()[0].Value;
                    //var UserAgent = httpContext.Request.Headers["User-Agent"].FirstOrDefault().ToString();
                    var connId = Context.ConnectionId.ToString();
                    _connections.Add(new Guid(userId), connId);
                    //get user online list
                    var userIdOnlineList = _connections.GetOnlineUsers();
                    var userOnlineList = await _chatService.GetUserOnlines(userIdOnlineList);
                    //await Clients.Client(Context.ConnectionId).SendAsync("UserOnlineList", userOnlineList);
                    //get all connectionId of users online
                    var connectionIdsOnline = _connections.GetAllConnectionIdOnline();
                    await Clients.Clients(connectionIdsOnline).SendAsync("UserOnlineList", userOnlineList);

                    //Update Client
                    await Clients.All.SendAsync("UpdateUserList", connId);
                }
                catch (Exception) { }
            }
        }
        public async Task OfflineUser(Guid userId, string connectionId)
        {
            //
            _connections.Remove(userId, connectionId);
            //
            var connectionIdsOnline = _connections.GetAllConnectionIdOnline();
            var userIdOnlineList = _connections.GetOnlineUsers();
            var userOnlineList = await _chatService.GetUserOnlines(userIdOnlineList);
            //
            await Clients.Clients(connectionIdsOnline).SendAsync("UserOnlineList", userOnlineList);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                //Remove Logged User
                var userId = httpContext.User.Claims.ToArray()[0].Value;
                _connections.Remove(new Guid(userId), Context.ConnectionId);
                

                //Update Client
                await Clients.All.SendAsync("UpdateUserList", _connections);
            }

            //return base.OnDisconnectedAsync(exception);
        }
        

    }
}
