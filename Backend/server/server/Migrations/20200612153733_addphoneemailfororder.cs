using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class addphoneemailfororder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "phone",
                table: "orders",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "9cf62207-419e-4eff-98e4-8d303b588b3c");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "d7d8e943-2eff-4dbc-9c84-60433e164df7");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "2b6c9667-2a79-4e5d-8e41-61e9276afc94", "AQAAAAEAACcQAAAAEKW526mPknLJCotac7iKgdwEi1OSYvCl/7X5zwgl5r6W+1SytpRqQcSIka2/Bi/hxA==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "phone",
                table: "orders");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "7ba01b4a-0b03-4cba-8c9f-0b909dbdf8ba");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "2b124055-5737-42ce-9c58-557f22bbc089");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d5185c9e-cf98-40f1-ba2e-5506d0a57594", "AQAAAAEAACcQAAAAEArEZjHRdHSROLIYiBPmB/9bKGQx82xkeJ+GQqlVQ/Ox2XzkjHE+mna7XbLefEif2Q==" });
        }
    }
}
