using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRoleClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserLogins",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: true),
                    ProviderKey = table.Column<string>(nullable: true),
                    ProviderDisplayName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserLogins", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "AppUserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    RoleId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserRoles", x => new { x.RoleId, x.UserId });
                });

            migrationBuilder.CreateTable(
                name: "AppUserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserTokens", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    generalityName = table.Column<string>(nullable: false),
                    name = table.Column<string>(nullable: false),
                    status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "providers",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: false),
                    status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_providers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    NormalizedName = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    displayname = table.Column<string>(nullable: false),
                    phone = table.Column<string>(nullable: true),
                    gender = table.Column<bool>(nullable: false),
                    birthDay = table.Column<DateTime>(nullable: false),
                    status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    importPrice = table.Column<int>(nullable: false),
                    price = table.Column<int>(nullable: false),
                    sale = table.Column<int>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    rating = table.Column<int>(nullable: true),
                    status = table.Column<int>(nullable: false),
                    size = table.Column<int>(nullable: true),
                    color = table.Column<int>(nullable: true),
                    categoryId = table.Column<int>(nullable: true),
                    providerId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.id);
                    table.ForeignKey(
                        name: "FK_products_categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_products_providers_providerId",
                        column: x => x.providerId,
                        principalTable: "providers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    status = table.Column<int>(nullable: false),
                    total = table.Column<int>(nullable: false),
                    note = table.Column<string>(nullable: true),
                    createDate = table.Column<DateTime>(nullable: false),
                    userId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.id);
                    table.ForeignKey(
                        name: "FK_orders_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "evaluations",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rating = table.Column<int>(nullable: false),
                    title = table.Column<string>(nullable: true),
                    content = table.Column<string>(nullable: true),
                    status = table.Column<int>(nullable: false),
                    createDate = table.Column<DateTime>(nullable: false),
                    productId = table.Column<int>(nullable: false),
                    userId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_evaluations", x => x.id);
                    table.ForeignKey(
                        name: "FK_evaluations_products_productId",
                        column: x => x.productId,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_evaluations_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "images",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    urlImage = table.Column<string>(nullable: true),
                    status = table.Column<int>(nullable: false),
                    productId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_images", x => x.id);
                    table.ForeignKey(
                        name: "FK_images_products_productId",
                        column: x => x.productId,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "orderDetails",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    quantity = table.Column<int>(nullable: false),
                    unitPrice = table.Column<int>(nullable: false),
                    productId = table.Column<int>(nullable: false),
                    orderId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderDetails", x => x.id);
                    table.ForeignKey(
                        name: "FK_orderDetails_orders_orderId",
                        column: x => x.orderId,
                        principalTable: "orders",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_orderDetails_products_productId",
                        column: x => x.productId,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "replies",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    content = table.Column<string>(nullable: true),
                    status = table.Column<int>(nullable: false),
                    createDate = table.Column<DateTime>(nullable: false),
                    userId = table.Column<Guid>(nullable: false),
                    evaluationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_replies", x => x.id);
                    table.ForeignKey(
                        name: "FK_replies_evaluations_evaluationId",
                        column: x => x.evaluationId,
                        principalTable: "evaluations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_replies_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.InsertData(
                table: "AppUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"), new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49") });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "CreationDate", "Description", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("078269d8-1a12-4592-b92e-7ff1a876a5f2"), "fafc6dfa-b264-42cf-b7f0-3d9026ad28fe", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Administrator role", "Admin", "Admin" },
                    { new Guid("6d9186ba-2cd6-4b6c-b729-4e605de1019f"), "02e4a05f-32e6-4123-a967-0610ea4a14d1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "User role", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "birthDay", "displayname", "gender", "phone", "status" },
                values: new object[] { new Guid("4557893f-1f56-4b6f-bb3b-caefd62c8c49"), 0, "cf5b27b4-59dd-4d62-a2c6-d7a9d026cbc4", "16110472@student.hcmute.deu.vn", true, false, null, "some-admin-email@nonce.fake", "admin", "AQAAAAEAACcQAAAAEPp/5g+vlRWvw4wFbmxLHt9KK7xOp06A1USxI3lxLLtaPgFUwxIgyacO6C09n/lapw==", null, false, "", false, "admin", new DateTime(1998, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", false, null, 1 });

            migrationBuilder.InsertData(
                table: "categories",
                columns: new[] { "id", "generalityName", "name", "status" },
                values: new object[,]
                {
                    { 1, "Quần áo", "Áo sơ mi", 0 },
                    { 2, "Quần áo", "Quần tây", 0 },
                    { 3, "Quần áo", "Áo thun", 0 },
                    { 4, "Quần áo", "Quần kaki", 0 }
                });

            migrationBuilder.InsertData(
                table: "providers",
                columns: new[] { "id", "name", "status" },
                values: new object[,]
                {
                    { 1, "Việt Tiến", 0 },
                    { 2, "Cty May Sông Hồng", 0 },
                    { 3, "Cty May Nhà Bè", 0 },
                    { 4, "Cty Giditex", 0 },
                    { 5, "Cty Vinatex", 0 }
                });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "id", "categoryId", "color", "description", "importPrice", "name", "price", "providerId", "rating", "sale", "size", "status" },
                values: new object[,]
                {
                    { 1, 1, 6, "mô tả sản phẩm 1", 100000, "Áo sơ mi", 150000, 1, 5, 0, 2, 0 },
                    { 2, 1, 2, "mô tả sản phẩm 2", 80000, "Áo sơ mi tay ngắn", 120000, 2, 5, 0, 0, 0 },
                    { 3, 2, 6, "mô tả sản phẩm 3", 200000, "Quần tây", 250000, 3, 5, 0, 2, 0 },
                    { 4, 3, 1, "mô tả sản phẩm 4", 50000, "Áo thun", 75000, 4, 5, 0, 2, 0 },
                    { 5, 4, 7, "mô tả sản phẩm 5", 180000, "Quần kaki", 220000, 5, 5, 0, 2, 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_evaluations_productId",
                table: "evaluations",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_evaluations_userId",
                table: "evaluations",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_images_productId",
                table: "images",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_orderDetails_orderId",
                table: "orderDetails",
                column: "orderId");

            migrationBuilder.CreateIndex(
                name: "IX_orderDetails_productId",
                table: "orderDetails",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_orders_userId",
                table: "orders",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_products_categoryId",
                table: "products",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_products_providerId",
                table: "products",
                column: "providerId");

            migrationBuilder.CreateIndex(
                name: "IX_replies_evaluationId",
                table: "replies",
                column: "evaluationId");

            migrationBuilder.CreateIndex(
                name: "IX_replies_userId",
                table: "replies",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppRoleClaims");

            migrationBuilder.DropTable(
                name: "AppUserClaims");

            migrationBuilder.DropTable(
                name: "AppUserLogins");

            migrationBuilder.DropTable(
                name: "AppUserRoles");

            migrationBuilder.DropTable(
                name: "AppUserTokens");

            migrationBuilder.DropTable(
                name: "images");

            migrationBuilder.DropTable(
                name: "orderDetails");

            migrationBuilder.DropTable(
                name: "replies");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "evaluations");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "categories");

            migrationBuilder.DropTable(
                name: "providers");
        }
    }
}
