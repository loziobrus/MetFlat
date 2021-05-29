using Microsoft.EntityFrameworkCore.Migrations;

namespace MetFlat.DataAccess.Migrations
{
    public partial class AddedAddressAndPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Address_FlatId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Flat");

            migrationBuilder.AddColumn<int>(
                name: "Total",
                table: "Rental",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Flat",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Flat",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Address_FlatId",
                table: "Address",
                column: "FlatId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Address_FlatId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "Rental");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Flat");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Flat",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Address_FlatId",
                table: "Address",
                column: "FlatId",
                unique: true);
        }
    }
}
