using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class streetguessfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_Users_userId",
                table: "orders");

            migrationBuilder.AlterColumn<Guid>(
                name: "userId",
                table: "orders",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "guess",
                table: "orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "street",
                table: "orders",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"),
                column: "ConcurrencyStamp",
                value: "ede4e927-74c7-411b-a5b2-d39587146165");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"),
                column: "ConcurrencyStamp",
                value: "f7a132a4-5c89-4a4d-a0cb-3aa99c7990ff");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "986a221b-6f50-4827-8de2-91bfb3fcfab6", "AQAAAAEAACcQAAAAEBjXKQ06XFXZVvMnWHhDRGLIRHodSyZXGD1tMpsEQy4PhCgIc1yab/hMy1FPMec3Zg==" });

            migrationBuilder.AddForeignKey(
                name: "FK_orders_Users_userId",
                table: "orders",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_Users_userId",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "guess",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "street",
                table: "orders");

            migrationBuilder.AlterColumn<Guid>(
                name: "userId",
                table: "orders",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_orders_Users_userId",
                table: "orders",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
