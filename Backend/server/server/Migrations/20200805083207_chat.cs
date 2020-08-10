using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class chat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "chats",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    createDate = table.Column<DateTime>(nullable: false),
                    content = table.Column<string>(nullable: true),
                    senderId = table.Column<Guid>(nullable: false),
                    receiverId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chats", x => x.id);
                    table.ForeignKey(
                        name: "FK_chats_Users_receiverId",
                        column: x => x.receiverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_chats_Users_senderId",
                        column: x => x.senderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "52fe2ac6-b077-4210-94ce-5bbdfdae7e12");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "f1a2f1ed-f19f-4d67-af95-5c52c7a07908");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d07007c5-f9ba-493a-87a9-0b98b10cca36", "AQAAAAEAACcQAAAAEOHiWkjUQ1IIadi3Xcgl8GnfXmmRkb6D4jUdAibRPrkBDDmah6YZUwTaWuJuCaR1WA==" });

            migrationBuilder.CreateIndex(
                name: "IX_chats_receiverId",
                table: "chats",
                column: "receiverId");

            migrationBuilder.CreateIndex(
                name: "IX_chats_senderId",
                table: "chats",
                column: "senderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chats");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "1feaf8a9-c65c-475f-9977-61577978a894");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "83060375-57f1-42d3-815c-b8b8fdf50f5f");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "082fa714-4723-4d8a-8be9-1e00b919893a", "AQAAAAEAACcQAAAAEEDa/aSvJ6d5P9BTQZ5dhBr5U/lMz30Mq6sj1GVvwz5YAP8D3owbl+EANy+Olk4EnA==" });
        }
    }
}
