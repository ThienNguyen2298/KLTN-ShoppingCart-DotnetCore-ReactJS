using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class add2fieldforproduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "amount",
                table: "products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "viewCount",
                table: "products",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "amount",
                table: "products");

            migrationBuilder.DropColumn(
                name: "viewCount",
                table: "products");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "f4e1f4df-2213-45e2-abaa-958037cd47b8");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "04ef2168-228e-4b8d-97c4-b3c4bd5e7248");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0b9b6c41-507d-4f8f-b8b2-d0dd6ce8ed5f", "AQAAAAEAACcQAAAAEKkjcGZnfFH3aiPQkUmg0G4VQTEmqymx7R4aNyvn6GuM093+yvPSuSctV/ZYIbLKBA==" });
        }
    }
}
