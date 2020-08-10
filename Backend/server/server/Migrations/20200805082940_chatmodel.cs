using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class chatmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "ef2b5977-d357-4749-8083-a4bbccc4c788");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "ff8a5ba7-4ebc-4815-8a74-53b6280ef9ac");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "cee6bbda-d106-4ae0-88d6-021b4bf13f49", "AQAAAAEAACcQAAAAEHZTIa/AhCMJBdFUMZF83UqW3hsFa/Guv46rjKzqyIxNSn+JDtfVXTHPXIdxEw79yA==" });
        }
    }
}
