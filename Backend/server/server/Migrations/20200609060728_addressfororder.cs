using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class addressfororder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "orders",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "25f18fe7-5dda-4741-a1f8-a8face724f38");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "0c4321fc-8ce5-41d3-818e-41fdaef8f662");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7e466bec-6862-4611-822c-5d2ca45e2170", "AQAAAAEAACcQAAAAEGzb8XZQ00uOGgmT38wMMbuyJ97tHl+r3iiukn0/7WMwF73Vq7zV1OWENsaR/QFm8g==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "address",
                table: "orders");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "a1112b38-504f-4e4c-81bf-01f9975ca25e");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "a26949f5-b995-4314-b4b0-42eb86982ce9");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ddf713e7-516e-451f-beb2-d4e5e5c114fe", "AQAAAAEAACcQAAAAEAFaR01Ghfb1bLUoGypSIV2lpFCRgQ7bACwuPDAGNWd6fmDJUeepCfwJuOFzWABhhw==" });
        }
    }
}
