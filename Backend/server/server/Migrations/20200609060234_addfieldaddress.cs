using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class addfieldaddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "Users",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "address",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "cac89798-327a-4d8a-9796-0cb01c2b0997");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "7433c5c2-ffe8-4feb-99fe-ee34138420c6");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a71f9d94-0e38-4f02-b523-a2d3391bcd75", "AQAAAAEAACcQAAAAEGnlJ9PhcqDALx9+MV1K/ir0pjQMjWDSX8p+61tA7xL7W9UpgYJ95RW9tONsvSfRiA==" });
        }
    }
}
