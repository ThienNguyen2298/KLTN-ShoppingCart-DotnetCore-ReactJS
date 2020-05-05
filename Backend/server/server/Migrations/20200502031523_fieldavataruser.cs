using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class fieldavataruser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "avatar",
                table: "Users",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "avatar",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "fafc6dfa-b264-42cf-b7f0-3d9026ad28fe");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "02e4a05f-32e6-4123-a967-0610ea4a14d1");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "cf5b27b4-59dd-4d62-a2c6-d7a9d026cbc4", "AQAAAAEAACcQAAAAEPp/5g+vlRWvw4wFbmxLHt9KK7xOp06A1USxI3lxLLtaPgFUwxIgyacO6C09n/lapw==" });
        }
    }
}
