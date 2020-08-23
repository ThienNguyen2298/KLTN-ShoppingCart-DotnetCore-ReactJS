# KLTN-ShoppingCart-DotnetCore-ReactJS
KHÓA LUẬN TỐT NGHIỆP: WEBSITE BÁN HÀNG (Quần áo + chat) sử dụng .NET CORE WEB API & REACT JS & SIGNALR

Sinh viên thực hiện:          

                              Nguyễn Hữu Thiện          -     16110472
                              
                              Võ Văn Thiên              -     16110469
1. Cài đặt source code:
- Server: .NET Core (port: 5001)

      - Xóa toàn bộ các file migrations trong folder Migrations để tạo Database mới.
      
      - Vào appsetting để sửa lại đường dẫn kết nối (đường dẫn, tên database, ...) : connection string.
      
      - cmd project: chạy lệnh code first Migrations: dotnet ef migrations add initdatabase
      
      - lúc này bên folder Migration sẽ tạo ra 1 file initdatabase để mô tả các thành phần của database.
      
      - trong file này: ở table Reply - ta sửa ở Delete - onCascade thành NoAction.
      
      - tiếp theo: ta quay lại cmd và chạy lệnh: dotnet ef database update.
      
 - Client Trang chủ: React JS (port 3000)
 
      - run: npm start.
      
 - Client Trang Quản Lý: React JS (port 8000)
 
      - run: npm start. (ở server khi tạo database đã seed data: tạo 1 tài khoản admin)
      
                        - username: admin
                        - password: Thiendeptrai@1998
 
